const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too Short Product Title"],
      maxlength: [100, "Too Long Product Title"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product Description is Required"],
      minlength: [20, "Too Short Product Description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product Quantity is Required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product Price is Required"],
      trim: true,
      max: [200000, "Too Long Product Price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    coverImage: {
      type: String,
      required: [true, "Product Cover Image is Required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product Category is Required"],
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [1, "Rating Must be above or equal 1.0"],
      max: [5, "Rating Must be below or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name -_id",
  });
  next();
});
const setImgUrl = (doc) => {
  if (doc.coverImage) {
    doc.coverImage = `${process.env.BASE_URL}/products/${doc.coverImage}}`;
  }
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => {
      const imgUrl = `${process.env.BASE_URL}/products/${image}`;
      imagesList.push(imgUrl);
    });
    doc.images = imagesList;
  }
};
// findOne , findAll ,update
productSchema.post("init", (doc) => {
  setImgUrl(doc);
});
// create

productSchema.post("save", (doc) => {
  setImgUrl(doc);
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
