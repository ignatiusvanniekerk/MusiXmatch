myApp.factory('musiXmatchApiSnippetService', function($http, API_CATEGORY, REQUEST) {
    return {
        snippetLookup: function(trackId) {

            REQUEST.url = API_CATEGORY.BASE_URL + API_CATEGORY.SNIPPETS + 'track_id=' + trackId;

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
    };
});