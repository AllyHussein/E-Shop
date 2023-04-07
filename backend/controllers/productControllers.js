const asyncHandeler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const Product = require("../models/productModel");
const factory = require("./handlersFactory");
const {
  uploadMultipleImages,
} = require("../middlewares/uploadImageMiddleware");

const uploadProductImages = uploadMultipleImages([
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);
const resizeProductImages = asyncHandeler(async (req, res, next) => {
  if (req.files.coverImage) {
    const coverImageFileName = `product-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.files.coverImage[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${coverImageFileName}`);
    req.body.coverImage = coverImageFileName;
  }
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imgName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imgName}`);

        req.body.images.push(imgName);
      })
    );
    next();
  }
});

// @desc    Get all products
const getProducts = factory.getAll(Product, "Products");

const getProduct = factory.getOne(Product, "reviews");

const createProducts = factory.createOne(Product);

const updateProduct = factory.updateOne(Product);

const deleteProduct = factory.deleteOne(Product);
module.exports = {
  createProducts,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
};
