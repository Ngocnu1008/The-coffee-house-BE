const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("./db");
const Route = require("./routes/index.route");
// require("./model/index");

//khoi tao server express: 
var app = express();

//init middleware:
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());//dữ liệu từ client gửi lên server được chuyển đổi thành Định dạng dữ liệu json
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));//mã hóa dữ liệu gửi lên server là string or array

//all route requests
Route(app);

module.exports = app;
