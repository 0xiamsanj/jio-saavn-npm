const fetcher = require("./fetch");
const info = require("./get_info");
const { END_POINTS } = require("./endpoints");

/**
 * @param {object} options
 * @returns {object}
 */

const jiosaavn = async (options) => {
  let params = {
    __call: "webapi.getLaunchData",
    lang: options.lang,
  };
  let result = await fetcher(params);
  if (result) {
    return result;
  }
};

module.exports = jiosaavn;

jiosaavn.SongsBySearch = info.SongsBySearch;
jiosaavn.SongByID = info.SongByID;
jiosaavn.ResultsFromSearch = info.ResultsFromSearch;
jiosaavn.PlaylistFromID = info.PlaylistFromID;
jiosaavn.AlbumFromID = info.AlbumFromID;
jiosaavn.RecommendationFromID = info.RecommendationFromID;
