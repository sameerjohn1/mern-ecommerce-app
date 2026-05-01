const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "dummy_client_id",
  client_secret: "dummy_secret",
});

module.exports = paypal;
