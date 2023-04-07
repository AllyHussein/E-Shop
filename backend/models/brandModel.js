const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand Required"],
      unique: [true, "Brand Must Be Unique"],
      minlength: [3, "Too Short Brand Name"],
      maxlength: [32, "Too Long Brand Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const setImgUrl = (doc) => {
  if (doc.image) {
    doc.image = `${process.env.BASE_URL}/brands/${doc.image}`;
  }
};
// findOne , findAll ,update
brandSchema.post("init", (doc) => {
  setImgUrl(doc);
});
// create

brandSchema.post("save", (doc) => {
  setImgUrl(doc);
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
