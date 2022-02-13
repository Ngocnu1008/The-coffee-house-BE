const { BadRequest }= require("../handler/response.handler")

function RegisterMiddleware(req, res, next) {
    var { name, address, phone, password, confirm_password, email } = req.body;

    if([name, address, phone, password, confirm_password, email].includes(undefined)) {
        return BadRequest(res, "argument invalid");
    }

    if(password !== confirm_password) {
        return BadRequest(res, "pw is not match")
    }

    //validate phone

    if(isNaN(phone)) {
        return BadRequest(res, "phone is wrong format");
    }
    next();
}
module.exports = RegisterMiddleware;
