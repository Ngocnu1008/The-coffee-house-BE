const { BadRequest }= require("../handler/response.handler")

function LoginMiddleware(req, res, next) {
    var { phone, password } = req.body;

    if(!phone || !password) {
        return BadRequest(res, "phone or pw is invalid");
    }

    //validate phone
    if(isNaN(phone)) {
        return BadRequest(res, "phone has wrong format");
    }
    next();
}
module.exports = LoginMiddleware;
