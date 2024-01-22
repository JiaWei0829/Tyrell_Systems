// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html", // to import index.html file inside index.js
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
  resolve: {
    alias: {
      // Add aliases for your CSS files if necessary
      '@mdbCss': path.resolve(__dirname, 'node_modules/mdb-react-ui-kit/dist/css/mdb.min.css'),
      '@fontawesomeCss': path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/css/all.min.css'),
    },
  },
  devServer: {
    static: path.join(__dirname, '/public'),
    compress: true,
    port: 3000,
    open: true,
  },
};