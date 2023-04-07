const express = require("express");
const { protect, allowedTo } = require("../controllers/authControllers");

const {
  getLoggedUserAddressess,
  addAddress,
  removeAddress,
} = require("../controllers/addressControllers");

const router = express.Router();

router.use(protect, allowedTo("user"));

router.route("/").get(getLoggedUserAddressess).post(addAddress);
router.route("/:addressId").delete(removeAddress);

module.exports = router;
