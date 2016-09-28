"use strict"
var getYoutubeSubtitleUrl = require('@joegesualdo/get-youtube-subtitle-url-node').default
var reqwest = require('reqwest')
var vttToJson = require('vtt-to-json');

function getYoutubeSubtitles(id, options) {
  let type = options.type || 'either';
  return new Promise((resolve, reject) => {
    if (type === 'nonauto') {
      getYoutubeSubtitleUrl(id, {type: 'nonauto'})
      .then((result) => {
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
                      let a_ids = [];
                      nonAutoSubtitles.forEach((section, id) => {
                        if(autoWord.time >= (section.start) && autoWord.time <= (section.end)) {
                          a_ids.push(id)
                        }
                      })
                      if (a_ids.length > 0) {
                        a_ids.forEach(a_id => {
                          var s = nonAutoSubtitles[a_id].words.map(w => {
                            return w.word
                          })
                          if (s.indexOf(autoWord.word) == -1){
                            if (nonAutoSubtitles[a_id - 0]) {
                            }
                          }
                          nonAutoSubtitles[a_id].words.forEach((word, i) => {
                            if (word.word.toLowerCase() == autoWord.word.toLowerCase()) {
                              nonAutoSubtitles[a_id].words[i].time = autoWord.time
                            } else {
                            }
                          })
                        })
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
  })
}

module.exports = getYoutubeSubtitles;
