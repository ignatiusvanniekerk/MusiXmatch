
'use strict';
myApp.controller('LyricsController', ['$scope', 'musiXmatchApiLyricsService', 'musiXmatchApiTrackService','$mdDialog',function($scope, musiXmatchApiLyricsService, musiXmatchApiTrackService, $mdDialog) {
    $scope.data = [];
    $scope.notLoading = true;
    $scope.lyrics = ''

    var from = 1;

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


    $scope.submit = (function () {
        $scope.tracks = [];
        $scope.notLoading = false;
        apiLyricsCall();
    });


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

    $scope.showMeMore = (function(){
        $scope.notLoading = false;
        $scope.lyrics.page++;
        apiLyricsCall();
    });

    $scope.getLyrics = (function ($event, trackId) {
        $scope.notLoading = false;
        musiXmatchApiLyricsService.trackLyricsLookup(trackId)
            .then(function(onLookupComplete){
                $scope.lyrics = onLookupComplete.data.lyrics_body.replace(/(?:\r\n|\r|\n)/g, ' <br/> ');
                console.log('$scope.lyrics', $scope.lyrics)
                showDialog($event)
                $scope.notLoading = true;
            },  function(onError) {
                $scope.error = onError;
                $scope.notLoading = true;
            });
    })

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
            '      Close Dialog' +
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

}]);
