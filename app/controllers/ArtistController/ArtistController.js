'use strict';
myApp.controller('ArtistController', ['$scope','$location','musiXmatchApiArtistService', function($scope ,$location,musiXmatchApiArtistService) {

    $scope.data = [];
    $scope.artistName = '';
    $scope.notLoading = true;

    $scope.relatedArtistFound = null;

    var from = 1;
    var to = 5;

    $scope.submit = (function () {
        $scope.notLoading = false;
        from = 1;
        artistSearch();
    });

    $scope.showMeMore = (function () {
        $scope.notLoading = false;
        from++;
        artistSearch();
    });

    $scope.clear = (function () {
        $scope.artistName = '';
        $scope.data = [];
        from = 1;
        $scope.relatedArtistFound = '';
        $scope.error = null;
    });

    $scope.albumFind = (function (artistId) {
        $location.path('/album/'+artistId);
    });

    $scope.relatedArtist = (function (artistId, artistname) {
        $scope.data = [];
        $scope.notLoading = false;
        $scope.artistName = artistname;
        $scope.relatedArtistFound = artistname;
        musiXmatchApiArtistService.relatedArtist(artistId)
            .then(function(onLookupComplete){
                for(var i=0; i < onLookupComplete.data.length;i++){
                    onLookupComplete.data[i]['color'] = randomColor()
                    $scope.data.push(onLookupComplete.data[i]);
                }
                $scope.notLoading = true;
                if (onLookupComplete.data.length < 1) {
                    $scope.error = 'No Data to display';
                }else{
                    $scope.error = null;
                }
            },  function(onError) {
                $scope.error = onError;
                $scope.notLoading = true;
            });
    });

    function randomColor() {
        return $scope.COLOURS[Math.floor(Math.random() * $scope.COLOURS.length)];
    }

    function artistSearch() {
        musiXmatchApiArtistService.artistSearch(from, to, $scope.artistName, 'desc')
            .then(function(onLookupComplete){
                for(var i=0; i < onLookupComplete.data.length;i++){
                    onLookupComplete.data[i]['color'] = randomColor();
                    $scope.data.push(onLookupComplete.data[i]);
                }
                if (onLookupComplete.data.length < 1) {
                    $scope.error = 'No Data to display';
                }else{
                    $scope.error = null;
                }
                $scope.notLoading = true;
            },  function(onError) {
                $scope.error = onError;
                $scope.notLoading = true;
            });
        }
    }
]);
