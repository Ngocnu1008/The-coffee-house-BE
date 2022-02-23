require("dotenv").config();
const { BadRequest, Success } = require("../handler/response.handler");
const logger = require("../handler/logger.handler");
const { User } = require("../model/index.model");
const argon2 = require("argon2");

async function CreateCustomer(req, res) {
  try {
    const { name, phone, email, password, address } = req.body;

    //check phone existed

    const check_exists = await User.findOne({ where: { phone } });

    if (check_exists) {
      return BadRequest(res, "Phone already existed");
    }

    const hash_password = await argon2.hash(password);

    await User.create({ name, phone, email, password: hash_password, address });

    Success(res, { success: true });
  } catch (error) {
    console.error(error);
    logger.error(error.message);
    BadRequest(res, "Something went wrong, pls check again");
  }
}

async function getCustomer(req, res) {
  const user = await User.findAll();

  res.json(user);
}

async function editCustomer(req, res) {
  const { name, phone, email, password, address } = req.body;

  //check user existed:
  const user = await User.findOne({ where: {phone} });
  // console.log(user);

  if (!user) {
    return BadRequest(res, "Can not find user");
  }
  user.set({
    name,
    phone,
    email,
    address,
  });

  user.save();

  Success(res, { success: true });
}

async function deleteCustomer(req, res) {
  const { id } = req.query;

  const user = await User.findOne({ where: { id } });
  await user.destroy();

  Success(res, { success: true });
}
module.exports = { CreateCustomer, editCustomer, getCustomer, deleteCustomer };
