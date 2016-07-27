var getYoutubeSubtitles = require('./../index.js');

// let id = 'vKosBJ1Uko0'
let id = 'q_q61B-DyPk'
getYoutubeSubtitles(id)
.then(subtitles => {
  console.log(subtitles)
})
.catch(err => {
  console.log(err)
})

