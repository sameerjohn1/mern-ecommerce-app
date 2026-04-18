const express = require("express");

const { addToCart } = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);

module.exports = router;
