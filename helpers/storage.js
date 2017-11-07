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

/**
 * Create Sound file from request.
 * Will not continue if request has already been fulfilled.
 *
 * Returns Null
 */
function createSound(soundRequest) {
  const fileName = `${soundRequest.id}.mp3`;

  lookupSound(soundRequest.id).then(location => {
    if (location) {
      return;
    }

    create(soundRequest);
  });
}

function create(soundRequest) {
  return download(soundRequest)
    .then(stream => {
      return upload(stream, soundRequest);
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

function upload(stream, soundRequest) {
  const key = `${soundRequest.id}.mp3`;
  const encodedText = encodeURIComponent(soundRequest.text);
  const fileName = `${encodedText}.mp3`;
  const contentDisposition = `attachment; filename*=UTF-8''${fileName}; filename=${fileName}`;

  return new Promise((resolve, reject) => {
    bucket.upload(
      {
        ACL: 'public-read',
        Body: stream,
        ContentDisposition: contentDisposition,
        Key: key
      },
      (err, data) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
}

/**
 * Find public URL for Sound if it exists.
 *
 * Returns Promise<String|Void>
 */
function lookupSound(soundId) {
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

        resolve(`https://${options.hostname}${options.path}`);
      })
      .on('error', error => resolve());
  });
}

module.exports = {
  createSound,
  lookupSound
};
