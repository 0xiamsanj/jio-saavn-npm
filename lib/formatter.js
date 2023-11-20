const decryptUrl = require("./decryption");

/**
 *
 * @param {object} response
 * @returns {object}
 */
exports.formatSingleSongResponse = (response) => {
  try {
    var artistNames = [];
    if (
      response["more_info"]["artistMap"] == false ||
      response["more_info"]["artistMap"]["primary_artists"] == null ||
      response["more_info"]["artistMap"]["primary_artists"].length == 0
    ) {
      if (
        response["more_info"]["artistMap"] == false ||
        response["more_info"]["artistMap"]["featured_artists"] == null ||
        response["more_info"]["artistMap"]["featured_artists"].length == 0
      ) {
        if (
          response["more_info"]["artistMap"] == false ||
          response["more_info"]["artistMap"]["artists"] == null ||
          response["more_info"]["artistMap"]["artists"].length == 0
        ) {
          if (response["more_info"]["music"] != null) {
            artistNames.push(response["more_info"]["music"]);
          } else {
            artistNames.push("Unknown");
          }
        } else {
          try {
            response["more_info"]["artistMap"]["artists"][0]["id"].forEach(
              (element) => {
                artistNames.push(element["name"]);
              }
            );
          } catch (e) {
            response["more_info"]["artistMap"]["artists"].forEach((element) => {
              artistNames.push(element["name"]);
            });
          }
        }
      } else {
        response["more_info"]["artistMap"]["featured_artists"].forEach(
          (element) => {
            artistNames.push(element["name"]);
          }
        );
      }
    } else {
      response["more_info"]["artistMap"]["primary_artists"].forEach(
        (element) => {
          artistNames.push(element["name"]);
        }
      );
    }

    return {
      id: response["id"],
      "320kbps": response["more_info"]["320kbps"],
      title: unescape(response["title"]),
      subtitle: response["subtitle"],
      type: response["type"],
      album: response["more_info"]["album"],
      album_url: response["more_info"]["album_url"],
      album_id: response["more_info"]["album_id"],
      copyright_text: response["more_info"]["copyright_text"],
      artist: artistNames,
      language: response["language"],
      cache_status: response["cache_state"],
      duration: response["more_info"]["duration"],
      year: response["year"],
      has_lyrics: response["more_info"]["has_lyrics"],
      song_url: decryptUrl(response["more_info"]["encrypted_media_url"]),
      image: response["image"].replaceAll("150x150", "500x500"),
      explicit_content: response["explicit_content"] == 1 ? true : false,
    };
  } catch (error) {
    return error;
  }
};
/**
 *
 * @param {Object} response
 * @returns {Object}
 */
exports.formatPlaylistResponse = (response) => {
  try {
    var songList = response["list"].map((item) => {
      var song = this.formatSingleSongResponse(item);
      console.log(song);
      return song;
    });
    return {
      id: response["id"],
      title: response["title"],
      subtitle: response["subtitle"],
      header: response["header"],
      type: response["type"],
      image: response["image"],
      language: response["language"],
      year: response["year"],
      list_type: response["list_type"],
      list: songList,
      explicit_content: response["explicit_content"],
      artists: response["more_info"]["artists"],
    };
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {Object} response
 * @returns {Promise}
 */
exports.formatAlbumResponse = (response) => {
  try {
    var songsList = response["list"].map((item) => {
      this.formatSingleSongResponse(item);
    });

    return {
      id: response["id"],
      title: response["title"],
      subtitle: response["subtitle"],
      header: response["header"],
      type: response["type"],
      image: response["image"],
      language: response["language"],
      year: response["year"],
      list_type: response["list_type"],
      list: songsList,
      explicit_content: response["explicit_content"],
    };
  } catch (error) {
    return error;
  }
};

/**
 *
 * @param {string} string
 * @returns {string}
 */
const unescape = (string) => {
  return string
    .replaceAll("&amp;", "&")
    .replaceAll("&#039;", "'")
    .replaceAll("&quot;", '"');
};
