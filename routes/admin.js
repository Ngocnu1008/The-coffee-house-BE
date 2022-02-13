const { Router } = require("express");
const {
  AddProduct,
  Addgroup,
  EditGroup,
  EditProduct,
  DeleteGroup,
  DeleteProduct,
  GetAllProduct,
  getAllGroup, 
  UpLoadImg
} = require("../controller/admin.controller");
const {
  AddproductMiddleware,
  AddgroupMiddleware,
  EditGroupMiddleware,
  EditProductMiddleware,
  DeleteGroupMiddleware,
  DeleteProductMiddleware,
} = require("../middeware/admin.middleware");

const upload = require("../middeware/UpLoadImgMiddleware");

const RouterAdmin = Router();

// const AuthoMiddleware = require("../middeware/auth.middleware");

RouterAdmin.post("/upload", upload.single("file"), UpLoadImg);

RouterAdmin.get("/all-product", GetAllProduct);

RouterAdmin.get("/all-group", getAllGroup);

RouterAdmin.post(
  "/add-product",
  [
  // AuthoMiddleware, 
  AddproductMiddleware],
  AddProduct
);

RouterAdmin.post("/add-group", [
  // AuthoMiddleware,
  AddgroupMiddleware], Addgroup);

RouterAdmin.post("/edit-product", [EditProductMiddleware], EditProduct);

RouterAdmin.delete(
  "/delete-product/:id",
  [DeleteProductMiddleware],
  DeleteProduct
);

RouterAdmin.post("/edit-group", [EditGroupMiddleware], EditGroup);

RouterAdmin.delete("/delete-group", [DeleteGroupMiddleware], DeleteGroup);

module.exports = RouterAdmin;
