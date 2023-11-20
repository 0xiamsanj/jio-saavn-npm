const path = require("path");

module.exports = {
  entry: "./lib/index.js",
  output: {
    library: "test",
    libraryTarget: "umd",
    filename: "jiosaavn.js",
    path: path.resolve(__dirname, "dist"),
  },
};
