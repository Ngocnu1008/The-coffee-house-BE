const { BadRequest } = require("../handler/response.handler");
require("dotenv").config();
const { check_filed, check_number } = require("../handler/request.handler")

function CreateUserMiddleWare(req, res, next) {

  const field = ["name", "phone", "email", "password", "confirmPassword", "address"];

  const error = check_filed(field, req.body);
  
  if (error.length > 0) {
      return BadRequest(res, error);
  }
  
  const { password, confirmPassword, phone } = req.body;

    //check phone

  const check_number1 = check_number(phone);
  if (!check_number1) {
      return BadRequest(res, "phone has wrong format")
  }

  if(password !== confirmPassword) {
      return BadRequest(res, "ps does not match to confirm_pw");
  }

  next();

}

// function EditMiddleWare(req, res, next) {
//   const { name, phone, email, address } = req.body;

//   //check field:

//   const field = ["name", "phone", "email", "address"];

//   const error = check_filed(field, req.body);

//   if(error.length > 0) {
//     return BadRequest(res, error);
//   }
// }
module.exports = { CreateUserMiddleWare };
