module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
        plugins: ["@babel/plugin-proposal-class-properties"]
      }
    }
  });

  config.resolve.extensions = [".ts", ".tsx", ...config.resolve.extensions];

  return config;
};
