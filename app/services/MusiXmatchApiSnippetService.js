
myApp.factory('musiXmatchApiSnippetService', function($http, API_CATEGORY, REQUEST) {
    return {
        /**
         * Snippets lookup
         */
        snippetLookup: function(trackId) {

            REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.SNIPPETS + 'track_id=' + trackId;


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
    };
});