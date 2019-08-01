module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"]
      }
    }
  });

  return config;
};
