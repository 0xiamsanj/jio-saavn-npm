const BASE_URL = "https://www.jiosaavn.com";
const API_STR = "/api.php?_format=json&_marker=0&api_version=4&ctx=web6dot0";

const END_POINTS = {
  homeData: "__call=webapi.getLaunchData",
  search: "__call=autocomplete.get",
  topSearches: "__call=content.getTopSearches",
  lyrics: "__call=lyrics.getLyrics",
  songDetails: "__call=song.getDetails",
  playlistDetails: "__call=playlist.getDetails",
  albumDetails: "__call=content.getAlbumDetails",
  getResults: "__call=search.getResults",
  albumResults: "__call=search.getAlbumResults",
  artistResults: "__call=search.getArtistResults",
  playlistResults: "__call=search.getPlaylistResults",
  getReco: "__call=reco.getreco",
};

module.exports = {
  BASE_URL,
  API_STR,
  END_POINTS,
};
