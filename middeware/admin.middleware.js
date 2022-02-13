const { BadRequest } = require("../handler/response.handler")
require("dotenv").config();

function AddproductMiddleware (req, res, next) {
    var { id_group, name, cost, price, description, story, attachment} = 
        req.body;

        if([id_group, name, cost, price, description, story, attachment].includes(undefined)) {
            return BadRequest(res, "Argument invalid");
        }
        
        if(isNaN(cost)) {
            return BadRequest(res, "cost has wrong format");
        }
        next(); 
}

function EditProductMiddleware (req, res, next) {
    var { id, id_group, name, cost, price, description, story, attachment} = 
    req.body;

    //Edit có id để where id="", còn add không có vì set tự động tăng bên bảng
    if([id, id_group, name, cost, price, description, story, attachment].includes(undefined)) {
        return BadRequest(res, "Argument invalid");
    }
    next();
}

function DeleteProductMiddleware(req, res, next) {
    var { id } = req.params;
    if(!id) {
        return BadRequest(res, "Params invalid");
    };
    next();
}

function AddgroupMiddleware (req, res, next) {
    var { name } = req.body;

    if(!name) {
        return BadRequest(res, "Argument invalid");
    }

    req.name = name.trim(); //thêm 1 key name vào req => req.name (lúc này req.name tương tự như req.body, req.params...) tiếp bên controller
    next();
}

function EditGroupMiddleware (req, res, next) {
    var { id, name } = req.body;
    console.log(req.body);
    if(!id || !name) {
        return BadRequest(res, "argument invalid");
    };
    next();
}

function DeleteGroupMiddleware(req, res, next) {
    var { id } = req.query;

    if(!id) {
        return BadRequest(res, "Params invalid");
    };
    next();
}
module.exports = { AddproductMiddleware, AddgroupMiddleware, EditProductMiddleware, DeleteProductMiddleware, EditGroupMiddleware, DeleteGroupMiddleware };
