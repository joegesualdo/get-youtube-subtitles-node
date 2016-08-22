## @joegesualdo/get-youtube-subtitles-node [![Build Status](https://travis-ci.org/joegesualdo/get-youtube-subtitles-node.svg?branch=master)](https://travis-ci.org/joegesualdo/get-youtube-subtitles-node)
> Get the subtitles of a youtube video.

## Install
```
$ npm install --save @joegesualdo/get-youtube-subtitles-node 
```

## Usage
```javascript
var getYoutubeSubtitles = require('@joegesualdo/get-youtube-subtitles-node');

let videoId = 'q_q61B-DyPk'

getYoutubeSubtitles(videoId)
.then(subtitles => {
  console.log(subtitles)
})
.catch(err => {
  console.log(err)
})
```

## Test
```
$ npm test
```
## API
### `getYoutubeSubtitles(youtubeVideoId, options)`
> Returns a promise that passes the resulting subtitles json.

| Name | Type | Description |
|------|------|-------------|
| youtubeVideoId | `Number` | The id of the video you want to get the subtitles for |

### Options
| Name | Type | Default | Options |Description |
|------|------|-------------|-----|------|
| type | `String ` | `either` | `auto`, `nonauto`, `either` | The id of the video you want to get the subtitles for |

Returns: `Promise`, that passes the resulting subtitles.

```javascript
var getYoutubeSubtitles = require('@joegesualdo/get-youtube-subtitles-node');

let videoId = 'q_q61B-DyPk'

getYoutubeSubtitles(videoId, {type: 'nonauto'})
.then(subtitles => {
  console.log(subtitles)
})
.catch(err => {
  console.log(err)
})
```

## Build
```
$ npm run build
```

## Related
- [vtt-to-json](https://github.com/joegesualdo/vtt-to-json) - Convert vtt to json.
- [get-youtube-subtitle-url-node](https://github.com/joegesualdo/get-youtube-subtitle-url-node) - Get the url for a youtube video's subtitles.

## License
MIT © [Joe Gesualdo]()
