const withTM = require("next-transpile-modules")(["cel"]);

module.exports = withTM({
  reactStrictMode: true,
});
