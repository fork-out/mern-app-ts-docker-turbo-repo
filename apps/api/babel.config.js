module.exports = {
  assumptions: {
    setPublicClassFields: true
  },
  presets: [["@babel/preset-env", { targets: { node: "current" } }], "@babel/preset-typescript"],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties"],
    "babel-plugin-parameter-decorator"
  ]
};
