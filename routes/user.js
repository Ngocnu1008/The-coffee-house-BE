const { Router } = require("express");
const {
  CreateCustomer,
  getCustomer,
  editCustomer,
  deleteCustomer,
} = require("../controller/user.controller");
const { CreateUserMiddleWare } = require("../middeware/user.middleware");
const { body, query, is } = require("express-validator");
const routerUser = Router();

routerUser.post("/create", CreateUserMiddleWare, CreateCustomer);

routerUser.get("/get-all-customer", getCustomer);

routerUser.post(
  "/edit-customer",
  body("name").isString().isEmpty().withMessage("Name invalid"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .isEmpty()
    .withMessage("email is invalid")
    .exists(),
  body("phone").isMobilePhone().isEmpty().withMessage("phone is invalid"),
  body("address").isString().isEmpty().withMessage("address is invalid"),
  editCustomer
);

routerUser.delete(
  "/delete-customer",
  [query("id").isString().isEmpty()],
  deleteCustomer
);
module.exports = routerUser;
