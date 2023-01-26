// gzip 파일로 만들어줌 => gzip 파일은 브라우저에서 압축해제해서 사용함.
// 넥스트에 내장되어있음 : compress: true,
// const CompressPlugin = require("compression-webpack-plugin");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === "production";

    // if (prod) {
    //   plugins.push(new CompressPlugin());
    // }
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /^\.\/ko$/),
      ],
      //   module: {
      //     ...config.module,
      //     rules: [...config.module.rules, {}],
      //   },
    };
  },
});
