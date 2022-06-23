const withTM = require("next-transpile-modules")([
  "@ceseatslib/form",
  "@ceseatslib/template",
  "@ceseatslib/theme",
  "@ceseatslib/ui",
  "@ceseatslib/utils",
]);

const API_URL = "http://localhost:4000";

module.exports = withTM({
  reactStrictMode: true,
  env: {
    API_RESTAURANT: `${API_URL}/restaurants`,
  },
});
