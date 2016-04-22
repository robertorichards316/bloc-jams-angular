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

    var setSong = function(song) {
      if(currentBuzzObject) {
        stopSong();
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
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
        stopSong();

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

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if(currentSongIndex >= currentAlbum.songs.length) {
        stopSong();


      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
