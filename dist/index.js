module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getYoutubeSubtitleUrl = __webpack_require__(1).default;
	var reqwest = __webpack_require__(4);
	var vttToJson = __webpack_require__(5);

	function getYoutubeSubtitles(id, options) {
	  var type = options.type || 'either';
	  return new Promise(function (resolve, reject) {
	    if (type === 'nonauto') {
	      getYoutubeSubtitleUrl(id, { type: 'nonauto' }).then(function (result) {
	        reqwest(result.url, function (resp) {
	          vttToJson(resp).then(function (nonAutoSubtitles) {
	            getYoutubeSubtitleUrl(id, { type: 'auto' }).then(function (result) {
	              reqwest(result.url, function (resp) {
	                vttToJson(resp).then(function (autoSubtitles) {
	                  autoSubtitles.forEach(function (autoSection) {
	                    autoSection.words.forEach(function (autoWord) {
	                      var a_ids = [];
	                      nonAutoSubtitles.forEach(function (section, id) {
	                        if (autoWord.time >= section.start && autoWord.time <= section.end) {
	                          a_ids.push(id);
	                        }
	                      });
	                      if (a_ids.length > 0) {
	                        a_ids.forEach(function (a_id) {
	                          var s = nonAutoSubtitles[a_id].words.map(function (w) {
	                            return w.word;
	                          });
	                          if (s.indexOf(autoWord.word) == -1) {
	                            if (nonAutoSubtitles[a_id - 0]) {}
	                          }
	                          nonAutoSubtitles[a_id].words.forEach(function (word, i) {
	                            if (word.word.toLowerCase() == autoWord.word.toLowerCase()) {
	                              nonAutoSubtitles[a_id].words[i].time = autoWord.time;
	                            } else {}
	                          });
	                        });
	                      }
	                    });
	                  });
	                  resolve(nonAutoSubtitles);
	                }).catch(function (err) {
	                  reject(err);
	                });
	              });
	            }).catch(function (err) {
	              reject(err);
	            });
	          }).catch(function (err) {
	            reject(err);
	          });
	        });
	      }).catch(function (err) {
	        reject(err);
	      });
	    } else if (type === 'auto') {
	      getYoutubeSubtitleUrl(id, { type: type }).then(function (result) {
	        reqwest(result.url, function (resp) {
	          vttToJson(resp).then(function (json) {
	            resolve(json);
	          }).catch(function (err) {
	            reject(err);
	          });
	        });
	      }).catch(function (err) {
	        reject(err);
	      });
	    }
	  });
	}

	exports.default = getYoutubeSubtitles;
	// module.exports = getYoutubeSubtitles;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	const PythonShell = __webpack_require__(2);
	var appRoot = __webpack_require__(3);

	function NonExistentSubtitleError(message) {
	  this.message = message;
	  this.stack = (new Error().stack);
	}
	NonExistentSubtitleError.prototype = Error.prototype;

	function getAutoSubs(videoId) {
	  return new Promise((resolve, reject) => {
	    PythonShell.run('__main__.py', {
	      scriptPath: `${__dirname}/youtube-dl/youtube_dl`,
	      args: [
	        '--write-auto-sub',
	        '--skip-download',
	        '--sub-format',
	        'vtt',
	        `https://www.youtube.com/watch?v=${videoId}`],
	    }, (err, results) => {
	      if (err) {
	        reject(err);
	      } else {
	        if (results.indexOf('Default Subtitle:') === -1) {
	          reject(new Error(`No subtitles for video: ${videoId} `));
	        } else {
	          resolve(results[results.indexOf('Default Subtitle:') + 1]);
	        }
	      }
	    });
	  });
	}

	function getNonAutoSubs(videoId) {
	  return new Promise((resolve, reject) => {
	    PythonShell.run('__main__.py', {
	      scriptPath: `${__dirname}/youtube-dl/youtube_dl`,
	      args: [
	        '--write-sub',
	        '--skip-download',
	        '--sub-format',
	        'vtt',
	        `https://www.youtube.com/watch?v=${videoId}`],
	    }, (err, results) => {
	      if (err) {
	        reject(err);
	      } else {
	        if (results.indexOf('Default Subtitle:') === -1) {
	          reject(new Error(`No subtitles for video: ${videoId} `));
	        } else {
	          resolve(results[results.indexOf('Default Subtitle:') + 1]);
	        }
	      }
	    });
	  });
	}

	function getYoutubeSubtitleUrl(videoId, opts) {
	  opts = opts || {}
	  var type = 'either'
	  // onlye accepts auto and nonauto type
	  if (opts.type && (opts.type !== 'auto' && opts.type !== 'nonauto' && opts.type !== 'either')) {
	    throw new Error('type is not valid')
	  }
	  // default should be either 
	  if (opts.type === 'auto' || opts.type === 'nonauto') {
	    type = opts.type;
	  }
	  return new Promise((resolve, reject) => {
	    if (type === 'nonauto') {
	      getNonAutoSubs(videoId)
	      .then((url) => {
	        const result = {
	          automaticallyGenerated: false,
	          url,
	        };
	        resolve(result);
	      })
	      .catch(err => {
	        console.log(err)
	        if (err.message.indexOf("video doesn't have subtitles")) {
	          reject(new NonExistentSubtitleError(`Non-auto Subtitles dont exist for ${videoId}`));
	        } else {
	          reject(err);
	        }
	      })
	    } else if (type === 'auto') {
	      getAutoSubs(videoId)
	      .then((url) => {
	        const result = {
	          automaticallyGenerated: true,
	          url,
	        };
	        resolve(result);
	      })
	      .catch(err => {
	        if (err.message.indexOf("Couldn't find automatic captions for")) {
	          reject(new NonExistentSubtitleError(`Auto Subtitles dont exist for ${videoId}`));
	        } else {
	          reject(err);
	        }
	      });
	    } else if (type === 'either') {
	      getNonAutoSubs(videoId)
	      .then((url) => {
	        const result = {
	          automaticallyGenerated: false,
	          url,
	        };
	        resolve(result);
	      })
	      .catch(() => {
	        getAutoSubs(videoId)
	        .then((url) => {
	          const result = {
	            automaticallyGenerated: true,
	            url,
	          };
	          resolve(result);
	        })
	        .catch(err => {
	          if (err.message.indexOf("Couldn't find automatic captions for")) {
	            reject(new NonExistentSubtitleError(`Subtitles dont exist for ${videoId}`));
	          } else {
	            reject(err);
	          }
	        });
	      });
	    }
	  });
	}

	// export default getYoutubeSubtitleUrl;
	module.exports = {
	  default: getYoutubeSubtitleUrl
	}



/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("python-shell");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("app-root-path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("reqwest");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("vtt-to-json");

/***/ }
/******/ ]);