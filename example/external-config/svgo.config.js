module.exports = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeTitle: false,
          convertPathData: false,
          convertColors: {
            shorthex: false,
          },
        },
      },
    },
    "prefixIds",
  ],
};
