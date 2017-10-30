const request = require('request'),
  fs = require('fs');

const SOUNDS_PATH = 'public/sounds';

function downloadSound(sound, url) {
  return new Promise(function(resolve, reject) {
    const soundPath = `${sound.voice}/${sound.text}.mp3`;
    const filePath = `${SOUNDS_PATH}/${soundPath}`;
    const fileStream = fs.createWriteStream(filePath);

    const requestOpts = {
      url: url,
      headers: { 'User-Agent': 'SoundOfTextBot (soundoftext.com)' }
    };

    request(requestOpts)
      .on('error', e => reject(e))
      .pipe(fileStream)
      .on('finish', () => resolve(soundPath))
      .on('error', e => reject(e));
  });
}

module.exports = {
  downloadSound: downloadSound
}
