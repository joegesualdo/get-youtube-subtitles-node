"use strict"
var getYoutubeSubtitles = require('./../index.js');

// let id = 'vKosBJ1Uko0'
let id = 'q_q61B-DyPk'
// let id = '_WkM8K_G4lM'
// let id = '3gilXX1vmlA'
// let id = 'wHkK6mbFUTk'
// let id = 'l-5vD5YVLv8' 
// var id = 'EYlu3w2qgqA' -- does not have nonauto subtitles
//let id = 'TImPW-khOwwu'
// let id = '5IDQDoxXHm0'
// let autoWords = []
// let nonAutoWords = []
// getYoutubeSubtitles(id, {type: 'nonauto'})
// .then(nonAutoSubtitles => {
//   getYoutubeSubtitles(id, {type: 'auto'})
//   .then(autoSubtitles => {
//     // nonAutoSubtitles.forEach(section => {
//     //   var a = section.part.split(' ')
//     //   a.forEach(i => {
//     //     nonAutoWords.push(i)
//     //   })
//     // })
//     //
//     // autoSubtitles.forEach(section => {
//     //   var a = section.part.split(' ')
//     //   a.forEach(i => {
//     //     autoWords.push(i)
//     //   })
//     // })
//     autoSubtitles.forEach(autoSection => {
//       autoSection.words.forEach(autoWord => {
//         let a_id;
//         nonAutoSubtitles.forEach((section, id) => {
//           if(autoWord.time > section.start && autoWord.time < section.end) {
//             a_id = id
//           }
//         })
//         if (a_id) {
//           nonAutoSubtitles[a_id].words.forEach((word, i) => {
//             if (word.word == autoWord.word) {
//               nonAutoSubtitles[a_id].words[i].time = autoWord.time
//               // console.log(nonAutoSubtitles[a_id].words)
//             }
//           })
//           // console.log(nonAutoSubtitles[a_id])
//         }
//       })
//     })
//     // var w = autoSubtitles[autoSubtitles.length - 10].words[0]
//     // console.log(w)
//     // var b = nonAutoSubtitles.filter(section => {
//     //   return w.time > section.start && w.time < section.end
//     // })[0]
//     // console.log(b)
//     // console.log(nonAutoSubtitles[2])
//     // console.log(autoSubtitles[5])
//   })
//   .catch(err => {
//     // console.log(err)
//   })
// })
// .catch(err => {
//   // console.log(err)
// })

getYoutubeSubtitles(id, {type: 'auto'})
.then(nonAutoSubtitles => {
  // console.log(nonAutoSubtitles[2])
  let hasTime = 0;
  let doesNotHaveTime = 0;
  let lastOne = 0;
  // nonAutoSubtitles.forEach(section => {
  //   section.words.forEach((word, i, ws) => {
  //     if (i === (ws.length - 1)) {
  //       if (i > 0) {
  //         if (!word.time && ws[i - 1].time) {
  //           lastOne = lastOne + 1;
  //         } else {
  //           // console.log(ws)
  //         }
  //       }
  //     }
  //     if (word.time) {
  //       hasTime = hasTime + 1;
  //     } else {
  //       doesNotHaveTime = doesNotHaveTime + 1
  //     } 
  //   })
  // })
  // console.log(hasTime)
  // console.log(doesNotHaveTime)
  // console.log(lastOne)
  // console.log(((hasTime + lastOne)/(hasTime + doesNotHaveTime)) * 100, '%')
  var result = {};
  //  console.log(nonAutoSubtitles[40])
  // var un = 0;
  // var wordCount = 0
  // nonAutoSubtitles.forEach(sub => {
  //   sub.words.forEach(word => {
  //     wordCount = wordCount + 1
  //     if (!word.time) {
  //       un = un + 1
  //     }
  //   })
  // })
  // console.log(un)
  // console.log(wordCount)
  //
  var words = []
  var text = []
  nonAutoSubtitles.forEach(sub => {
    sub.words.forEach(word => {
      words.push(word)
      text.push(word.word)
    })
  })
  // var gone = 0
  // words.forEach((word, index) => {
  //   if (words[index] === undefined) {
  //     // console.log([words[index], words[index-1], words[index+1]])
  //     if (words[index - 1] === undefined) {
  //       if (words[index + 1] === undefined) {
  //         gone = gone + 1;
  //       }
  //     }
  //   }
  // })
  console.log(words)
  console.log(nonAutoSubtitles.length)
  // console.log(text.join(' ').indexOf('recent weeks'))
  // console.log(words[30])
})
.catch(err => {
  console.log(err)
})
