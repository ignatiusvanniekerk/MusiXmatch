'use strict';
myApp.controller('AlbumController', ['$scope','$rootScope' ,'$location','$routeParams','musiXmatchApiAlbumService',function($scope,$rootScope ,$location, $routeParams, musiXmatchApiAlbumService) {

    //////////////////////////////////////
    //
    //  SCOPE VARIABLES
    //
    /////////////////////////////////////
    /**
     *
     * @type {boolean}
     */

    $scope.notLoading = true;

    //////////////////////////////////////
    //
    //  SCOPE FUNCTIONS
    //
    /////////////////////////////////////
    /**
     *
     * @returns {*}
     * finds a track list and forward to lyrics
     */
    $scope.findTrackList = (function(albumId){
        musiXmatchApiAlbumService.albumTracksLookup(albumId, 1 , 99)
            .then(function(onLookupComplete){
                $rootScope.trackList = onLookupComplete.data;
                $location.path('/lyrics/');
            },  function(onError) {
                $scope.error = onError;
                $scope.notLoading = true;
            });
    });
    //////////////////////////////////////
    //
    //  FUNCTIONS
    //
    /////////////////////////////////////

    /**
     *
     * @returns {*}
     * adds properties to album tiles
     */
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

    /**
     *
     * @returns {*}
     * picks a randonm colour of the appcompont
     */
    function randomColor() {
        return $scope.COLOURS[Math.floor(Math.random() * $scope.COLOURS.length)];
    }

    /**
     *
     * @returns {*}
     * picks a randonm span hight
     */
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
    /**
     *
     * @returns {*}
     * Angular lifecycle hook
     */
    var init = function () {
        $scope.notLoading = false;
        var artistId = $routeParams.artistId;

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
    /**
     *
     * @returns {*}
     * Angular lifecycle hook
     */
    init();

}]);
