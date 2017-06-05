'use strict';
myApp.controller('ArtistController', ['$scope','$location','musiXmatchApiArtistService', function($scope ,$location,musiXmatchApiArtistService) {
    //////////////////////////////////////
    //
    //  SCOPE VARIABLES
    //
    /////////////////////////////////////
    /**
     *
     * @type {Array}
     */
    $scope.data = [];
    /**
     *
     * @type {string}
     */
    $scope.artistName = '';
    /**
     *
     * @type {boolean}
     */
    $scope.notLoading = true;
    /**
     *
     * @type {null}
     */
    $scope.relatedArtistFound = null;

    //////////////////////////////////////
    //
    //  VARIABLES
    //
    /////////////////////////////////////
    /**
     *
     * @type {number}
     */
    var from = 1;
    /**
     *
     * @type {number}
     */
    var to = 5;

    //////////////////////////////////////
    //
    //  SCOPE FUNCTIONS
    //
    /////////////////////////////////////
    /**
     *
     * @type {Function}
     * submit
     */
    $scope.submit = (function () {
        $scope.notLoading = false;
        from = 1;
        artistSearch();
    });


    /**
     *
     * @type {Function}
     * activates show more and api call
     */
    $scope.showMeMore = (function () {
        $scope.notLoading = false;
        from++;
        artistSearch();
    });
    /**
     *
     * @type {Function}
     * clears form
     */
    $scope.clear = (function () {
        $scope.artistName = '';
        $scope.data = [];
        from = 1;
        $scope.relatedArtistFound = '';
        $scope.error = null;
    });

    /**
     *
     * forwards to albumcontroller with artist is as params
     */
    $scope.albumFind = (function (artistId) {
        $location.path('/album/'+artistId);
    });

    /**
     *
     * @type {Function}
     * Related artist search
     */
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

    //////////////////////////////////////
    //
    //  FUNCTIONS
    //
    /////////////////////////////////////
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
     * Artist seach
     */
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
