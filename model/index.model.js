const Product = require("./product");
const User = require("./user");
const Stores = require("./stores");
const ParentType = require("./parent_type");
const Order = require("./order");
const OTPRegister =require("./otp");

const syscDB = async () => {
    await User.sync({ force: true });//các model (User, Product...) được tạo chứ chưa kết nối với database, file này để thêm bảng và kết nối db
    await Product.sync({ force: true});
    await Stores.sync({ force: true});
    await ParentType.sync({force: true});
    await Order.sync({force: true});
    await OTPRegister.sync({force: true});
};

// syscDB();

module.exports = { syscDB, User, Product, Stores, ParentType, Order, OTPRegister };
