const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");

const uploadBrandImage = uploadSingleImage("image");

const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/brands/${filename}`);
  }

  req.body.image = filename;
  next();
});
const getBrands = factory.getAll(Brand);

const getBrand = factory.getOne(Brand);

const createBrands = factory.createOne(Brand);

const updateBrand = factory.updateOne(Brand);

const deleteBrand = factory.deleteOne(Brand);
module.exports = {
  createBrands,
  deleteBrand,
  updateBrand,
  getBrands,
  getBrand,
  uploadBrandImage,
  resizeImage,
};
