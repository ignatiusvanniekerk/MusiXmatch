myApp.factory('musiXmatchApiAlbumService', function($http, API_CATEGORY, REQUEST) {
    return {
        albumLookup: function(albumId) {

            REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.ALBUM + 'album_id=' + albumId;

            // searches for repositories by name and ajax call that gets the api respons in json
            return  $http(REQUEST)
                .then(function(response) {
                        console.log(response)
                        return response;
                    },
                    // error handler
                    function(response) {
                        return response;
                    });

        },
        albumArtistLookup: function(artistId) {

            REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.ARTIST_ALBUM_SEARCH + 'artist_id=' + artistId + '&s_release_date=desc';

            // searches for repositories by name and ajax call that gets the api respons in json
            return  $http(REQUEST)
                .then(function(response) {
                        console.log(response)
                        return response;
                    },
                    // error handler
                    function(response) {
                        return response;
                    });
        },
        albumTracksLookup: function(albumId, curentPage, pageSize) {

            REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.ALBUM_TRACKS + 'album_id=' + albumId + '&page=' + curentPage + '&page_size=' + pageSize;

            // searches for repositories by name and ajax call that gets the api respons in json
            return  $http(REQUEST)
                .then(function(response) {
                        console.log(response)
                        return response;
                    },
                    // error handler
                    function(response) {
                        return response;
                    });

        }
    }
});