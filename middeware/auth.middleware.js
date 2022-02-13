const { UnAuthorize } = require("../handler/response.handler") 
require("dotenv").config();
const jwt = require("jsonwebtoken");

function AuthoMiddleware(req, res, next) {

    //headers (bình thường gửi qua param, query, còn những cái liên quan đến bảo mật
    //thì gửi qua header)
    if (!req.headers.authorization) {
        return UnAuthorize(res, "token is required fied")
    }

    const auth = req.headers.authorization; 

    const token = auth.split(" ");// chia uthorization thành 1 mảng gồm 2 ptu: Bearer và token

    if (token[0] !== "Bearer") {
        return UnAuthorize(res, "Bearer is required")
    }
 
    const verify = jwt.verify(token[1], process.env.SECRET_KEY);
    //token này chứa tt tùy thuộc vào bên hàm, vd hàm register lưu token gồm email, name, address, phone, hashPw thì giải mã sẽ gồm 5 tt đó 
    //Sau đó verify này đã được lấy ra đem qua bên function AutboOTP để xử lý

    req.decode = verify;

    next();
}
module.exports = AuthoMiddleware;
//AuthoMiddleware này dùng để giải mãi thông tin từ token, trong th người dùng là Admin muốn thêm sp, xóa, sửa...
//tránh th hacker giả danh để vào lấy dữ liệu nên bắt buộc để thực hiện chức năng đó 
//yêu cầu phải gửi token lên