const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "development",
  devtool: "source-map",
  plugins: [
    new HTMLPlugin({
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "resources"),
          to: path.resolve(__dirname, "dist", "resources"),
        },
        {
          from: path.resolve(__dirname, "src", "styles"),
          to: path.resolve(__dirname, "dist", "styles"),
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
