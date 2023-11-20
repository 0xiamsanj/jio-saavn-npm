const axios = require("axios");
const { API_STR, BASE_URL } = require("./endpoints");
// const fetch = require("node-fetch");

const SEARCH_URL = BASE_URL + API_STR;

/**
 * Universal function to fetch results using axios
 *
 * @param {object} options
 * @param {array} lang
 * @returns {promise}
 */

const fetcher = async (options, lang = ["English"]) => {
  var preferredLanguages = lang.map((x) => {
    return x.toLowerCase();
  });
  console.log(axios)
  const response = await axios.get(SEARCH_URL, {
    headers: {
      cookie: `L=${preferredLanguages.join("%2C")}`,
    },
    params: options,
  });
  return response.data;
};

module.exports = fetcher;
