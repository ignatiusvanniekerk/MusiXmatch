myApp.factory('musiXmatchApiTrackService', function($http, REQUEST, API_CATEGORY) {
    return {
        trackLookup: function (trackId) {

            REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.TRACK + 'track_id=' + trackId;

            // searches for repositories by name and ajax call that gets the api respons in json
            return $http(REQUEST)
                .then(function (response) {
                        return response;
                    },
                    // error handler
                    function (response) {
                        return response;
                    });
        },
        searchTracks: function (trackSearchParams) {

            REQUEST.url  = API_CATEGORY.BASE_URL + API_CATEGORY.TRACK_SEARCH +
                (trackSearchParams.f_has_lyrics ? 'f_has_lyrics=' + trackSearchParams.f_has_lyrics : '') +
                (trackSearchParams.page ? '&page=' + trackSearchParams.page : 1) +
                (trackSearchParams.page_size ? '&page_size=' + trackSearchParams.page_size : 5) +
                (trackSearchParams.q_string ? '&q=' + trackSearchParams.q_string.split(' ').join('+') : '') +
                (trackSearchParams.q_artist ? '&q_artist=' + trackSearchParams.q_artist.split(' ').join('+') : '') +
                (trackSearchParams.q_lyrics ? '&q_lyrics=' + trackSearchParams.q_lyrics.split(' ').join('+') : '') +
                (trackSearchParams.q_track ? '&q_track=' + trackSearchParams.q_track.split(' ').join('+') : '') +
                (trackSearchParams.q_track_artist ? '&q_track_artist=' + trackSearchParams.q_track_artist.split(' ').join('+') : '') +
                (trackSearchParams.s_track_rating ? '&s_track_rating=' + trackSearchParams.s_track_rating : '')

            console.log(REQUEST.url)
            // searches for repositories by name and ajax call that gets the api respons in json
            return $http(REQUEST)
                .then(function (response) {
                        return response;
                    },
                    // error handler
                    function (response) {
                        return response;
                    });
        }
    }
});