const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

module.exports = {
  //TODO 소스코드, 처리하고싶은 코드들.
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
  },
  mode: "development",
  watch: true,
  output: {
    filename: "js/[name].js",
    //TODO main.js을 번들링 후에 path 경로에 저장
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  module: {
    //TODO rules = 각각의 파일 종류에 따라 어떤 전환을 할건지 정해주는 옵션
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        //! webpack은 배열의 마지막인덱스 부터 읽어들임
        //! sass->css->style순
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
}
