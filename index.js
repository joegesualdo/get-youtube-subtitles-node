var getYoutubeSubtitleUrl = require('@joegesualdo/get-youtube-subtitle-url-node').default
var reqwest = require('reqwest')
var vttToJson = require('vtt-to-json');

function getYoutubeSubtitles(id, options) {
  let type = options.type || 'either';
  return new Promise((resolve, reject) => {
    if (type === 'nonauto') {
      getYoutubeSubtitleUrl(id, {type: 'nonauto'})
      .then((result) => {
        // console.log(result.url)
        reqwest(result.url, function (resp) {
          vttToJson(resp)
          .then(nonAutoSubtitles => {
            getYoutubeSubtitleUrl(id, {type: 'auto'})
            .then((result) => {
              reqwest(result.url, function (resp) {
                vttToJson(resp)
                .then(autoSubtitles => {
                  autoSubtitles.forEach(autoSection => {
                    autoSection.words.forEach(autoWord => {
                      let a_id;
                      nonAutoSubtitles.forEach((section, id) => {
                        if(autoWord.time >= section.start && autoWord.time <= section.end) {
                          a_id = id
                        }
                      })
                      if (a_id) {
                        var s = nonAutoSubtitles[a_id].words.map(w => {
                          return w.word
                        })
                        if (s.indexOf(autoWord.word)){
                          console.log(`word '${autoWord.word}' is not in ${s}`)
                        }
                        nonAutoSubtitles[a_id].words.forEach((word, i) => {
                          if (word.word.toLowerCase() == autoWord.word.toLowerCase()) {
                            nonAutoSubtitles[a_id].words[i].time = autoWord.time
                          } else {
                          }
                        })
                        // console.log(nonAutoSubtitles[a_id])
                      }
                    })
                  })
                  resolve(nonAutoSubtitles)
                })
                .catch(err => {
                  reject(err)
                })
              })
            })
            .catch(err => {
              reject(err)
            })
          })
          .catch(err => {
            reject(err)
          })
        })
      })
      .catch(err => {
        reject(err)
      })
    } else if (type === 'auto') {
      getYoutubeSubtitleUrl(id, {type: type})
      .then((result) => {
        reqwest(result.url, function (resp) {
          vttToJson(resp)
          .then(json => {
            resolve(json)
          })
          .catch(err => {
            reject(err)
          })
        })
      })
      .catch(err => {
        reject(err)
      })
    }
    

            // autoSubtitles.forEach(autoSection => {
            //   autoSection.words.forEach(autoWord => {
            //     let a_id;
            //     nonAutoSubtitles.forEach((section, id) => {
            //       if(autoWord.time > section.start && autoWord.time < section.end) {
            //         a_id = id
            //       }
            //     })
            //     if (a_id) {
            //       nonAutoSubtitles[a_id].words.forEach((word, i) => {
            //         if (word.word == autoWord.word) {
            //           nonAutoSubtitles[a_id].words[i].time = autoWord.time
            //           // console.log(nonAutoSubtitles[a_id].words)
            //         }
            //       })
            //       // console.log(nonAutoSubtitles[a_id])
            //     }
            //   })
            // })
  //         })
  //         .catch(err => {
  //           reject(err)
  //         })
  //       })
  //     })
  //     .catch(err => {
  //       reject(err)
  //     })
  //   }
  //
  })
}

module.exports = getYoutubeSubtitles;
