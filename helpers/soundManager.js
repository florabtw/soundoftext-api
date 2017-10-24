const request = require('request'),
  fs = require('fs');

const SOUNDS_PATH = 'public/sounds/';

function downloadSound(sound, url) {
  return new Promise(function(resolve, reject) {
    createDirectory(sound.voice);

    const filePath = SOUNDS_PATH + `${sound.voice}/${sound.text}.mp3`
    const fileStream = fs.createWriteStream(filePath);

    const requestOpts = {
      url: url,
      headers: { 'User-Agent': 'SoundOfTextBot (soundoftext.com)' }
    };

    // TODO
    // Test these errors
    request(requestOpts)
      .on('error', e => { console.error(e); reject(e); })
      .pipe(fileStream)
      .on('finish', () => { resolve(filePath); })
      .on('error', e => { console.error(e); reject(e); });
  });
}

function createDirectory(voice) {
  fs.mkdirSync(SOUNDS_PATH + voice);
}

module.exports = {
  downloadSound: downloadSound
}
