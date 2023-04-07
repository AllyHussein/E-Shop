const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Required"],
      unique: [true, "Category Must Be Unique"],
      minlength: [3, "Too Short Category Name"],
      maxlength: [32, "Too Long Category Name"],
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
    doc.image = `${process.env.BASE_URL}/categories/${doc.image}`;
  }
};
// findOne , findAll ,update
categorySchema.post("init", (doc) => {
  setImgUrl(doc);
});
// create

categorySchema.post("save", (doc) => {
  setImgUrl(doc);
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
