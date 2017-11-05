const tts = require('google-tts-api'),
  aws = require('aws-sdk'), // actually digitalocean spaces
  http = require('https'),
  SoundRequest = require('../models/soundRequest.js');

aws.config.update({
  accessKeyId: 'RE4WB5ESAVWBKBIS7O7E',
  secretAccessKey: 'AEJnxJpXhF8AKCfsDd/pKqvaI14EfU6iHTJetMaAWGo'
});

const endpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');

const bucket = new aws.S3({
  endpoint: endpoint,
  params: { Bucket: 'soundoftext' }
});

function create(soundRequest) {
  const fileName = `${soundRequest.id}.mp3`;

  return download(soundRequest)
    .then(stream => {
      return upload(stream, fileName);
    })
    .then(() => {
      soundRequest.set({ status: SoundRequest.DONE });
      return soundRequest.save();
    })
    .catch(error => {
      console.error(error);
      console.error('Request: ' + soundRequest);

      soundRequest.set({
        message: error.message,
        status: SoundRequest.ERROR
      });

      soundRequest.save();
    });
}

const downloadHeaders = { 'User-Agent': 'SoundOfTextBot (soundoftext.com)' };

/**
 * returns Promise<Stream>
 */
async function download(soundRequest) {
  const url = await tts(soundRequest.text, soundRequest.voice);
  const stream = await downloadFile(url);

  return stream;
}

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, res => {
        if (res.statusCode >= 300) {
          reject(new Error(`Status Code ${res.statusCode} retrieving ${url}`));
        }

        resolve(res);
      })
      .on('error', error => {
        reject(error);
      });
  });
}

function upload(stream, fileName) {
  return new Promise((resolve, reject) => {
    bucket.upload(
      { Key: fileName, Body: stream, ACL: 'public-read' },
      (err, data) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
}

function lookup(soundId) {
  const fileName = `${soundId}.mp3`;

  const options = {
    hostname: 'soundoftext.nyc3.digitaloceanspaces.com',
    method: 'HEAD',
    path: '/' + fileName
  };

  return new Promise((resolve, reject) => {
    http
      .get(options, res => {
        if (res.statusCode >= 300) {
          resolve();
        }

        resolve({ location: `https://${options.hostname}${options.path}` });
      })
      .on('error', error => resolve());
  });
}

module.exports = {
  create,
  lookup
};
