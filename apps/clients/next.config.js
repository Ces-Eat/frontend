const withTM = require("next-transpile-modules")([
  "@ceseatslib/form",
  "@ceseatslib/template",
  "@ceseatslib/theme",
  "@ceseatslib/ui",
  "@ceseatslib/utils",
]);

const API_URL = "http://88.160.115.60:32768";
// const API_URL = "http://localhost:4100";

module.exports = withTM({
  reactStrictMode: false,
  env: {
    API_USERS: `${API_URL}/users`,
    API_AUTH: `${API_URL}/users/sessions`,
    API_WALLET: `${API_URL}/users/wallets/me`,
    API_ADDRESS: `${API_URL}/users/addresses/me`,
    API_RESTAURANT: `${API_URL}/restaurants`,
    API_ORDERS: `${API_URL}/orders`,
  },
});
