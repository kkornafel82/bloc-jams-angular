 (function() {
     function SongPlayer($rootScope, Fixtures) {
          
           /**
           * @desc returned output of service
           * @type {Object}
           */
          var SongPlayer = {};

           /**
           * @desc current album in Fixtures
           * @type {Object}
           */
          var currentAlbum = Fixtures.getAlbum();
          
           /**
           * @desc Buzz object audio file
           * @type {Object}
           */
          var currentBuzzObject = null;

           /**
           * @desc returns index of current song
           * @type function
           * @param currently playing song
           */
          var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
          };
           
                     /**
           * @function stopSong
           * @desc Stops currently playing song and sets currently playing song to null
           * @param {Object} song
           */ 
          var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
          };


           /**
           * @function setSong
           * @desc Stops currently playing song and loads new audio file as currentBuzzObject
           * @param {Object} song
           */
          var setSong = function(song) {
            if (currentBuzzObject) {
              stopSong();
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
            });  

            currentBuzzObject.bind('timeupdate', function() {
              $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
            });
     });
          SongPlayer.currentSong = song;
          };
         /**
         * @desc plays song set as currentBuzzObject and sets song.playing to true
         * @type function
         * @param {Object} song
         */
          var playSong = function(song) {
           currentBuzzObject.play();
           song.playing = true;
          };

         /**
         * @desc current song playing or paused
         * @type {Object}
         */
          SongPlayer.currentSong = null;

         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
          SongPlayer.currentTime = null;

          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
             setSong(song);  
             playSong(song);
          
          } else if (SongPlayer.currentSong === song) {
            if (currentBuzzObject.isPaused()) {
              playSong(song);
            }
          }
        };

        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
        };

        
         /**
         * @desc finds index of current song and decreases by 1
         * @type function
         */
        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

        if (currentSongIndex < 0) {
         stopSong();
         } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
        }   
       };

        SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

        if (currentSongIndex >= currentAlbum.songs.length) {
         stopSong();
         } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
        }   
       };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
         if (currentBuzzObject) {
         currentBuzzObject.setTime(time);
         }
        };

       return SongPlayer;
 };
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();