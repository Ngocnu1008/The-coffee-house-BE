const { sequelize} = require("../db");
const { DataTypes} = require("sequelize");

const OTPRegister = sequelize.define("OTPRegister", {
    id: {
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4, 
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    otp: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
   count: {
       type: DataTypes.INTEGER, 
       defaultValue: 0,
   }
});

module.exports = OTPRegister;