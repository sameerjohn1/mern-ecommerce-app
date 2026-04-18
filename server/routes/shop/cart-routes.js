const express = require("express");

const {
  addToCart,
  fetchCartItems,
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);

module.exports = router;
