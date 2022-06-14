module.exports = {
  ...(module.exports = require("eslint-config-custom")),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  rules: {
    "import/prefer-default-export": "off",
    ...require("eslint-config-custom").rules,
  },
};
