
'use strict';
myApp.controller('LyricsController', ['$scope', '$rootScope', '$routeParams', 'musiXmatchApiLyricsService', 'musiXmatchApiTrackService','$mdDialog',
    function($scope, $rootScope,$routeParams,musiXmatchApiLyricsService, musiXmatchApiTrackService, $mdDialog) {
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

    //////////////////////////////////////
    //
    //  SCOPE FUNCTIONS
    //
    /////////////////////////////////////
        /**
     *
     * @type {Array}
     */
    $scope.data = [];
    /**
     *
     * @type {boolean}
     */
    $scope.notLoading = true;
    /**
     *
      * @type {string}
     */
    $scope.lyrics = '';

    /**
     *
     * @type {{f_has_lyrics: string, page: number, page_size: number, q_string: string, q_artist: string, q_lyrics: string, q_track: string, q_track_artist: string, s_track_rating: string}}
     * base object for lyrics
     */
    $scope.lyrics = {
        f_has_lyrics: '',
        page: 1,
        page_size: 5,
        q_string: '',
        q_artist: '',
        q_lyrics: '',
        q_track: '',
        q_track_artist: '',
        s_track_rating: 'desc'
    };

    //////////////////////////////////////
    //
    //  SCOPE FUNCTIONS
    //
    /////////////////////////////////////
    /**
     *
     * @type {Function}
     * submits search form and does api call
     */
    $scope.submit = (function () {
        $scope.tracks = [];
        $scope.notLoading = false;
        apiLyricsCall();
    });

    /**
     *
     * @type {Function}
     * clear search and old data
     */
    $scope.clear = (function () {
        $scope.tracks = [];
        from = 1;
        $scope.lyrics = {
            f_has_lyrics: '',
            page: 1,
            page_size: 5,
            q_string: '',
            q_artist: '',
            q_lyrics: '',
            q_track: '',
            q_track_artist: '',
            s_track_rating: 'desc'
        };
        $scope.error = null;
    });
    /**
     *
     * @type {Function}
     * clear search and old data
     */
    $scope.showMeMore = (function(){
        $scope.notLoading = false;
        $scope.lyrics.page++;
        apiLyricsCall();
    });
    /**
     *
     * @type {Function}
     * gets the lyrics and opens dialog box
     */
    $scope.getLyrics = (function ($event, trackId) {
        $scope.notLoading = false;
        musiXmatchApiLyricsService.trackLyricsLookup(trackId)
            .then(function(onLookupComplete){
                $scope.lyrics = onLookupComplete.data.lyrics_body.replace(/(?:\r\n|\r|\n)/g, ' <br/> ');
                showDialog($event)
                $scope.notLoading = true;
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

    function apiLyricsCall() {
        $scope.notLoading = false;
        musiXmatchApiTrackService.searchTracks($scope.lyrics)
            .then(function(onLookupComplete){
                $scope.notLoading = true;
                for(var i=0; i < onLookupComplete.data.length;i++){
                    onLookupComplete.data[i]['backGoundColour'] = randomColor();
                    onLookupComplete.data[i]['backGoundColourHeading'] = randomColor();
                    $scope.tracks.push(onLookupComplete.data[i]);
                }
                $scope.notLoading = true;
                if (onLookupComplete.data.length < 1) {
                    $scope.error = 'No Data to display'
                }else{
                    $scope.error = null;
                }
            },  function(onError) {
                $scope.error = onError;
                $scope.notLoading = true;
            });
    };


    //////////////////////////////////////
    //
    //  SHOWDIALOG COMPONENT
    //
    /////////////////////////////////////


        $scope.showDialog = showDialog;

    function showDialog($event) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            template:
            '<md-dialog class="" aria-label="List dialog">' +
            '  <md-dialog-content >'+
            '<div ng-bind-html="lyrics"></div>'+
            '  </md-dialog-content>' +
            '  <md-dialog-actions>' +
            '    <md-button ng-click="closeDialog()" class="md-primary">' +
            '      Close' +
            '    </md-button>' +
            '  </md-dialog-actions>' +
            '</md-dialog>',
            locals: {
                lyrics: $scope.lyrics
            },
            controller: DialogController
        });
        function DialogController($scope, $mdDialog, lyrics) {
            $scope.lyrics = lyrics;
            $scope.closeDialog = function() {
                $mdDialog.hide();
            }
        }
    }

    var init = function () {
        if($rootScope.trackList){
            $scope.tracks = [];
            for(var i=0; i < $rootScope.trackList.length;i++){
                $rootScope.trackList[i]['backGoundColour'] = randomColor();
                $rootScope.trackList[i]['backGoundColourHeading'] = randomColor();
                $scope.tracks.push($rootScope.trackList[i]);
            }
        }
    };

    init();


}]);
