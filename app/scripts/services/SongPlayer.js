(function() {
  function SongPlayer() {
    var SongPlayer = {};

    var currentSong = null;

    /**
     * @desc Buzz object audio file
     * @type {Object}
     */

    var currentBuzzObject = null;

    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
//currentBuzzObject is created inside setSong
    var setSong = function(song) {
      if(currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };
//private function
    var playSong = function(song) {
      if(currentBuzzObject) {
        currentBuzzObject.play();
        song.playing = true;
      }
    };

    SongPlayer.play = function(song) {
      if(currentSong !== song) {

        setSong(song);
        playSong();
        //currentBuzzObject.play();
        //song.playing = true;

        } else if (currentSong === song) {
          if(currentBuzzObject.isPaused()) {
            currentBuzzObject.play();
          }
        }
    };

    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

      currentSong = song;
      playSong();
      //currentBuzzObject.play();
      //song.playing = true;
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
