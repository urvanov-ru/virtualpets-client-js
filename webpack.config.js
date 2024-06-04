const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

module.exports =  (env) => {
  return {
    mode: 'development',
    entry: ['./src/index.js'],
    devtool: 'inline-source-map',
    watch: false,
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "manifest.json", to: "manifest.json" },
          { from: "data", to: "data" },
          { from: "index.html", to: "index.html" },
          { from: "style.css", to: "style.css" },
          { from: "./src/sw.js", to: "sw.js" }
        ],
      }),
      new webpack.EnvironmentPlugin({
        SERVER_URL : env.SERVER_URL
      })
      
    ],
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
}
