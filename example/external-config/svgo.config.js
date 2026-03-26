module.exports = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
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
