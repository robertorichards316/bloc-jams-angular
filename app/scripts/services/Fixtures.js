(function () {
  function Fixtures() {
    var Fixtures = {};

    var albumPicasso = {
         title: 'The Colors',
         artist: 'Pablo Picasso',
         label: 'Cubism',
         year: '1881',
         albumArtUrl: '/assets/images/album_covers/09.png',
         songs: [
             { name: 'Blue', length: '161.71', audioUrl: '/assets/music/blue' },
             { name: 'Green', length: '103.96', audioUrl: '/assets/music/green' },
             { name: 'Red', length: '268.45', audioUrl: '/assets/music/red' },
             { name: 'Pink', length: '153.14', audioUrl: '/assets/music/pink' },
             { name: 'Magenta', length: '374.22', audioUrl: '/assets/music/magenta' }
         ]
     };

     var albumMarconi = {
         title: 'The Telephone',
         artist: 'Guglielmo Marconi',
         label: 'EM',
         year: '1909',
         albumArtUrl: '/assets/images/album_covers/20.png',
         songs: [
             { title: 'Hello, Operator?', duration: '1:01' },
             { title: 'Ring, ring, ring', duration: '5:01' },
             { title: 'Fits in your pocket', duration: '3:21' },
             { title: 'Can you hear me now?', duration: '3:14' },
             { title: 'Wrong phone number', duration: '2:15' }
         ]
     };

     Fixtures.getAlbum = function() {
       return albumPicasso;
     };

     Fixtures.getCollection = function(numberOfAlbums) {
       nbrOfAlbums=parseInt(numberOfAlbums);
       var albums = [];
       for(var i = 0; i < nbrOfAlbums; i++) {
         albums.push(angular.copy(albumPicasso));
       }
       return albums;
     };

     return Fixtures;
   }

  angular
      .module('blocJams')
      .factory('Fixtures', Fixtures);
})();
