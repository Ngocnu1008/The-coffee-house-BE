const { Router } = require("express");
const {LoginAdmin, Register, AuthoOTP } = require("../controller/login.controller");
const LoginMiddleware = require("../middeware/login.middeware");
const RegisterMiddleware = require("../middeware/register.middeware");
const AuthoMiddleware = require("../middeware/auth.middleware")
const routerLogin = Router(); 

routerLogin.post("/login", [LoginMiddleware] , LoginAdmin);

routerLogin.post("/register", [RegisterMiddleware] , Register);

routerLogin.post("/otp", [AuthoMiddleware] , AuthoOTP);

module.exports = routerLogin;