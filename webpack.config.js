module.exports = {
  context: __dirname + "/src",
  entry: {
    main: "./main.js"
  },
  output: {
    path: __dirname + "/dist/",
    filename: "[name].js",
    chunkFilename: "[id].js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader?optional=runtime&stage=1']}
    ]
  }
};