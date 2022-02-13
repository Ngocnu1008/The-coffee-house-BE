require("dotenv").config();
const { BadRequest, Success } = require("../handler/response.handler")
const { User, OTPRegister } = require("../model/index.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const RandomOTP = require("../handler/random");
const sendMail = require("../handler/sendmail.handler");
const TemplateEmail = require("../helper/templateEmail");
const logger = require("../handler/logger.handler");

async function LoginAdmin (req, res) {
    try {
        logger.info(`Login controller`);
        var { phone, password } = req.body;
        //check phone's existion: 
        const finduser = await User.findOne({ 
            where: {
                phone,  
            },
        });

        if(!finduser) {
            return BadRequest(res, "user does not exist");
        }

        //verify pw: 
        const verify_pw = await argon2.verify(
            finduser.dataValues.password, 
            password);
            //khi console.log(find_user) sẽ trả về bảng user là object có p.tử con là dataValues, trong dataValues có password 
            if(!verify_pw) {
                return BadRequest(res, "password is not correct");
            }

            //generate jwt: 
            const token = jwt.sign(
                { id_user: finduser.dataValues.id, 
                  is_admin: finduser.dataValues.is_admin
                }, 
                  process.env.SECRET_KEY
            );
            //BƯỚC LOGIN NÀY KHÔNG LIÊN QUAN GÌ ĐẾN TOKEN MÀ CHỈ SO SÁNH THÔNG TIN NHẬP VÀO VÀ THÔNG TIN LƯU DƯỚI BẢNG USERS THÔI,
            //SAU KHI ĐĂNG NHẬP THÀNH CÔNG MỚI GỬI TOKEN, ĐÓ LÀ LÝ DO CỦA generate jwt
                
            //tra ve user: 
            Success(res, { accessToken: token, login: true});//tra ve: thuật toán, dữ liệu, private key
    } catch (error) {
        console.error(error);
        logger.error(error.message);
        BadRequest(res);
    }
}

async function Register (req, res) {
    try {
        logger.info(`Register controller`)
        var { name, address, phone, password, email } = req.body;

        //check phone if it existed: 

        const findPhone = await User.findOne({
            where: {phone},
        })

        if(findPhone) {
            return BadRequest(res, "Phone already existed");
        } 

        const hashPw = await argon2.hash(password);

        //expire OTP: 
        const token = jwt.sign(
            { email, name, address, phone, hashPw }, 
            //token này bao gồm thông tin để sau đó giải mã ra và so sánh với email và otp đã lưu trong bảng OTPRegister ở database
            process.env.SECRET_KEY, 
            {
                expiresIn: "2h", 
            }
        );
         
        //random  otp: 
        const otp = RandomOTP();

        //save otp: 
        await OTPRegister.create({
            email, 
            otp
        });
       
        //send OTP: 
        const template = TemplateEmail(name, otp);//hàm TemplateEmail là hàm callback, được truyền dưới dạng đối số của hàm sendMail
        //hàm sendMail đgl higher-order function

        await sendMail(email, template);

        Success(res, { register: true, accessToken: token })
    } catch (error) {
        console.error(error);
        logger.error(error.message);
        BadRequest(res);
    }
}

async function AuthoOTP (req, res) {
    try {
        logger.info(`Auth otp controller`);
        var { otp } = req.body;
        var decode = req.decode;

        //check otp: 
        const count = await OTPRegister.findOne({
            otp, 
            email: decode.email,
        })
        //so sánh thông tin của bảng với thông tin mà Register tạo token (email, name...) sau khi được decode (mã hóa) có phải tt của ng đã đk không
        if(!count) {
            return BadRequest(res, "request invalid");
        }
        if(count.dataValues.count > 3) {
            return BadRequest(res, "over request");
        }

        var { name, address, phone, email, hashPw} = decode;//lấy tt từ token lúc trên được tạo từ Register và mã hóa để lưu vào bảng User


        //insert database: 
        await User.create ({
            name, 
            address, 
            phone, 
            email,
            password: hashPw
        });

        Success(res, { auth_otp: true});
    } catch (error) {
        console.error(error);
        logger.error(error)
        BadRequest(res);
    }
}
module.exports = {LoginAdmin, Register, AuthoOTP};
//Giải thích: 
//Route Register dùng để tạo và gửi OTP đi, sau đó lưu thông tin email,otp vào bảng OTPRegister, cuối cùng tạo ra token.
//Route AuthoOTP: lấy token được tạo ra và mã hóa (bên auth.middlerware.js) cùng với mã OTP nhập vào đó, thông tin sau khi mã hóa
//đem so sánh với thông tin lưu trong bảng OTPRegister để xem có cùng 1ng không, đúng thì lưu thông tin ng dùng vào bảng User.


//jsonwebtoken, search: npm jwt
//cơ sở dữ liệu: ORM
//refresh token

