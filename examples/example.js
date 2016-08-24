var getYoutubeSubtitles = require('./../index.js');

// let id = 'vKosBJ1Uko0'
// let id = 'q_q61B-DyPk'
// let id = '_WkM8K_G4lM'
// let id = '3gilXX1vmlA'
let id = 'wHkK6mbFUTk'
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

getYoutubeSubtitles(id, {type: 'nonauto'})
.then(nonAutoSubtitles => {
  // console.log(nonAutoSubtitles[2])
  let hasTime = 0;
  let doesNotHaveTime = 0;
  let lastOne = 0;
  nonAutoSubtitles.forEach(section => {
    section.words.forEach((word, i, ws) => {
      if (i === (ws.length - 1)) {
        if (i > 0) {
          if (!word.time && ws[i - 1].time) {
            lastOne = lastOne + 1;
          } else {
            // console.log(ws)
          }
        }
      }
      if (word.time) {
        hasTime = hasTime + 1;
      } else {
        doesNotHaveTime = doesNotHaveTime + 1
      } 
    })
  })
  console.log(hasTime)
  console.log(doesNotHaveTime)
  console.log(lastOne)
  console.log((hasTime/(hasTime + doesNotHaveTime)) * 100, '%')
})
.catch(err => {
  console.log(err)
})
