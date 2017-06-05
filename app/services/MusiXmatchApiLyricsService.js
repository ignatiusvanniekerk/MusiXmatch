/**
 * Looks up a tracks lyric
 */

myApp.factory('musiXmatchApiLyricsService', function($http, API_CATEGORY, REQUEST) {
    return {

        /**
         * Get the lyrics for a track
         */
        trackLyricsLookup: function(trackId) {

            REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.TRACK_LYRICS + 'track_id=' + trackId;

            // searches for repositories by name and ajax call that gets the api respons in json
            return  $http(REQUEST)
                .then(function(response) {
                        console.log(response);
                        return response;
                    },
                    // error handler
                    function(response) {
                        return response;
                    });
        }
    };
});