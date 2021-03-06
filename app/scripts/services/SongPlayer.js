(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();
    /**
    *@function SongPlayer
    *@desc Injects Fixtures service into SongPlayer
    *@param {Fixtures}
    */

    SongPlayer.currentSong = null;
    /**
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
     */
    SongPlayer.currentTime = null;

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

     SongPlayer.volume = 80;

     SongPlayer.maxVolume = 100;

     SongPlayer.currentAlbum = null;

    var setSong = function(song) {
      if(currentBuzzObject) {
        stopSong();
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      currentBuzzObject.setVolume(70);

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      currentBuzzObject.bind('volumechange', function() {
        $rootScope.$apply(function() {
          SongPlayer.volume = currentBuzzObject.getVolume();
        });
      });

      SongPlayer.currentSong = song;
    };

    /**
    *@function getSongIndex
    *@desc Gets all current songs from the album in an index
    *@param {song}
    */

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong!== song) {
        setSong(song);
        playSong(song);

      } else if (SongPlayer.currentSong === song) {
          if(currentBuzzObject.isPaused()) {
            playSong(song);
          }
        }
    };

    /**
     * @function pause
     * @desc Pause current song
     * @param {Object} song
     */

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;

      currentBuzzObject.pause();
      song.playing = false;
    };

    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if(currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
      }
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    };
    /**
    *@function SongPlayer.previous
    *@desc Able to clicks on previous songs

    */

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if(currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
      }
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    };

    SongPlayer.setVolume = function(volume) {
      if(currentBuzzObject) {
        currentBuzzObject.setVolume(volume)
      }
      SongPlayer.volume = volume;
    };

    SongPlayer.setCurrentTime = function(time) {
      if(currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
