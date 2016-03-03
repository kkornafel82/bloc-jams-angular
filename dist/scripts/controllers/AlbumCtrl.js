(function() {
   function AlbumCtrl($scope) {
     this.albumData = angular.copy(albumPicasso)
 
     }

   angular
       .module('blocJams')
       .controller('AlbumCtrl', ['$scope', AlbumCtrl]);
})();