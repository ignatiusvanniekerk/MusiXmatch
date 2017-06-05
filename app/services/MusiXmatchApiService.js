
/**
 * Api constants for the services including base url
 */
myApp.constant('API_CATEGORY',{

    BASE_URL: 'https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/',

    ALBUM: 'album.get?',

    ALBUM_TRACKS: 'album.tracks.get?',

    ARTIST: 'artist.get?',

    ARTIST_RELATED: 'artist.related.get?',

    ARTIST_SEARCH: 'artist.search?',

    ARTIST_ALBUM_SEARCH: 'artist.albums.get?',

    TRACK_LYRICS: 'track.lyrics.get?',

    MATCHER_LYRICS: 'matcher.lyrics.get?',

    MATCHER_SUBTITLE: 'matcher.subtitle.get?',

    MATCHER_TRACK: 'matcher.track.get?',

    SNIPPETS: 'track.snippet.get?',

    TRACK: 'track.get?',

    TRACK_SEARCH : 'track.search?'

});

/**
 * REQUEST constants with api key
 */
myApp.constant('REQUEST',{
    method: 'GET',
    url: '' ,
    headers: {
        "X-Mashape-Key": "FwTZLuc0tQmshoj3lJdNiMF9Nombp1KYxiBjsn1ZJrHHWMQbos",
        "Accept": "application/json"
    },
    data: { test: 'test' }
});
