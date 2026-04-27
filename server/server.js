const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRoutes = require("./routes/admin/products-routes");
const shopProductsRoutes = require("./routes/shop/product-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRoutes);
app.use("/api/shop/products", shopProductsRoutes);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
