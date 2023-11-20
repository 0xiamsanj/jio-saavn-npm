const { END_POINTS } = require("./endpoints");
const fetcher = require("./fetch");
const Format = require("./formatter");

/**
 * Search songs from a query
 *
 *  @param {object} options
 *  @returns {object}
 */
exports.SongsBySearch = async (options) => {
  let params = {
    __call: "search.getResults",
    q: options.query,
  };
  let result = await fetcher(params);
  console.log(result)
  var responseArray = result.results.map((song) =>
    Format.formatSingleSongResponse(song)
  );
  return options.minified ? responseArray : result.results;
};

/**
 * Search a specific song from an ID
 *
 * @param {Object} options
 * @returns {Promise<Object>}
 */
exports.SongByID = async (options) => {
  let params = {
    __call: "song.getDetails",
    pids: options.query,
  };
  let result = await fetcher(params);
  return options.minified
    ? Format.formatSingleSongResponse(result.songs[0])
    : result.songs;
};

/**
 * Fetches songs, albums, playlist, top searches and trending topics related to the query
 *
 * @param {Object} options
 * @returns {Promise}
 */
exports.ResultsFromSearch = async (options) => {
  let params = {
    __call: "autocomplete.get",
    query: options.query,
  };
  let result = await fetcher(params);
  return result;
};

/**
 * Fetches a specific playlist from ID
 * 
 * @param {Object} options
 * @returns {Promise}
 */
exports.PlaylistFromID = async (options) => {
  let params = {
    __call: "playlist.getDetails",
    cc: "in",
    _marker: "0%3F_marker%3D",
    listid: options.query,
  };

  let result = await fetcher(params);
  return options.minified ? Format.formatPlaylistResponse(result) : result;
};

/**
 *
 * @param {Object} options
 * @returns {Promise}
 */
exports.AlbumFromID = async (options) => {
  let params = {
    __call: "search.getAlbumResults",
    cc: "in",
    includeMetaTags: "1",
    albumid: options.query,
  };

  let result = await fetcher(params);
  return options.minified ? Format.formatAlbumResponse(result) : result;
};

/**
 * Recommends songs related to current listening song
 * 
 * @param {Object} options
 * @returns {Promise}
 */
exports.RecommendationFromID = async (options) => {
  let params = {
    __call: "reco.getreco",
    pid: options.query,
  };
  let result = await fetcher(params);
  var formattedResponse = result.map((item) =>
    Format.formatSingleSongResponse(item)
  );
  return options.minified ? formattedResponse : result;
};
