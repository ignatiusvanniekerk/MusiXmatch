
myApp.factory('musiXmatchApiArtistService', function($http, API_CATEGORY, REQUEST) {
    return {
        /**
         * Get the artist object
         */
        artistLookup: function(artistId) {

            REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.ARTIST + 'artist_id=' + artistId;

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
        /**
         * Get the related artist object
         */
    relatedArtist: function(artistId) {

        REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.ARTIST_RELATED + 'artist_id=' + artistId;

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
        /**
         * Searches artist
         */
        artistSearch: function(page, pageSize, artist,order) {

            REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.ARTIST_SEARCH +'page='+ page + '&page_size=' + pageSize + '&q_artist=' + artist + '&s_artist_rating=' + order;


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
    }
});