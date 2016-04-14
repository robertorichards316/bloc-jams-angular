(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();
    /**
    *@function SongPlayer
    *@desc Injects Fixtures service into SongPlayer
    *@param {Fixtures}
    */

    SongPlayer.currentSong = null;

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
        SongPlayer.currentSong.playing = null;
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

    /**
    *@function getSongIndex
    *@desc Gets all current songs from the album in an index
    *@param {song}
    */

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

      SongPlayer.currentSong = song;
    };
//private function
    var playSong = function(song) {
      if(currentBuzzObject) {
        currentBuzzObject.play();
        song.playing = true;
      }
    };

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong !== song) {

        setSong(song);
        playSong(song);

      } else if (SongPlayer.currentSong === song) {
          if(currentBuzzObject.isPaused()) {
            playSong(song);
          }
        }
    };

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

      SongPlayer.currentSong = song;
      playSong();

      }
    };

    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if(currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;

      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    /**
    *@function SongPlayer.previous
    *@desc Able to clicks on previous songs

    */


    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
