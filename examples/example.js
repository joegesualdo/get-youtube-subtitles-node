var getYoutubeSubtitles = require('./../index.js');

// let id = 'vKosBJ1Uko0'
// let id = 'q_q61B-DyPk'
let id = '_WkM8K_G4lM'
getYoutubeSubtitles(id, {type: 'nonauto'})
.then(subtitles => {
  console.log(subtitles[15]);
})
.catch(err => {
  console.log(err)
})

