'use strict';
myApp.controller('AlbumController', ['$scope', '$routeParams','$location','musiXmatchApiAlbumService',function($scope, $location, $routeParams, musiXmatchApiAlbumService) {

    $scope.notLoading = true;

    $scope.findTrackList = (function(albumId){
        musiXmatchApiAlbumService.albumTracksLookup(albumId, 1 , 99)
            .then(function(onLookupComplete){
                $scope.trackList = onLookupComplete.data;
                console.log($scope.trackList);
            },  function(onError) {
                $scope.error = onError;
                $scope.notLoading = true;
            });
    });

    function albumTiles() {
        for (var i = 0; i < $scope.albums.length; i++) {
            var randomSize = randomSpan();
            $scope.albums[i]['tile'] = {
                        color: randomColor(),
                        colspan: randomSize,
                        rowspan: randomSize
                    };
        }
    };

    function randomColor() {
        return $scope.COLOURS[Math.floor(Math.random() * $scope.COLOURS.length)];
    }

    function randomSpan() {
        var r = Math.random();
        if (r < 0.8) {
            return 2;
        } else if (r < 0.9) {
            return 3;
        } else {
            return 4;
        }
    };

    var init = function () {
        $scope.notLoading = false;
        var artistId = $routeParams.$$path.replace( '/album/', "" );
        console.log(artistId)
        musiXmatchApiAlbumService.albumArtistLookup(artistId)
            .then(function(onLookupComplete){
                $scope.albums = onLookupComplete.data;
                albumTiles();
                $scope.notLoading = true;
            },  function(onError) {
                $scope.error = onError;
                $scope.notLoading = true;
            });
    };

    init();

}]);
