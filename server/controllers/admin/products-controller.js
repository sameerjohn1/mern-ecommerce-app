const { imageUploadUtils } = require("../../helpers/cloudinary");
const Product = require("../../modals/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imageUploadUtils(url);
    res
      .status(200)
      .json({ message: "Image uploaded successfully", url: result.secure_url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newlyCreatedProfuct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProfuct.save();

    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured" });
  }
};

module.exports = { handleImageUpload };
