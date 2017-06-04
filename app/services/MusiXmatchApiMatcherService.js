myApp.factory('musiXmatchApiMatcherService', function($http, API_CATEGORY, REQUEST) {
    return {
        matcherLyricsLookup: function(artist, track) {

            REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.MATCHER_LYRICS + 'q_artist=' + artist + '&q_track=' + track;

            // searches for repositories by name and ajax call that gets the api respons in json
            return  $http(REQUEST)
                .then(function(response) {
                        return response;
                    },
                    // error handler
                    function(response) {
                        return response;
                    });

    },
        matcherSubtitleLookup: function(subtitleLength, subtitleLengthMaxDeviation, artist, track) {

            REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.MATCHER_SUBTITLE + 'f_subtitle_length=' + subtitleLength + '&f_subtitle_length_max_deviation=' + subtitleLengthMaxDeviation + '&q_artist=' + artist +'&q_track=' + track;

            // searches for repositories by name and ajax call that gets the api respons in json
            return  $http(REQUEST)
                .then(function(response) {
                        return response;
                    },
                    // error handler
                    function(response) {
                        return response;
                    });

    },
        matcherTrackLookup: function(hasLyrics, artist, track) {

            REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.MATCHER_TRACK + 'f_has_lyrics=' + hasLyrics + '&q_artist=' + artist + '&q_track=' + track;

            // searches for repositories by name and ajax call that gets the api respons in json
            return  $http(REQUEST)
                .then(function(response) {
                        return response;
                    },
                    // error handler
                    function(response) {
                        return response;
                    });
        }
    };
});