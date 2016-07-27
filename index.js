var getYoutubeSubtitleUrl = require('@joegesualdo/get-youtube-subtitle-url-node').default
var reqwest = require('reqwest')
var vttToJson = require('vtt-to-json');

function getYoutubeSubtitles(id) {
  return new Promise((resolve, reject) => {
    getYoutubeSubtitleUrl(id)
    .then((result) => {
    getYoutubeSubtitleUrl(id)
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
  })
}

module.exports = getYoutubeSubtitles;
