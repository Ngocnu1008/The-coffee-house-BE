const { sequelize} = require("../db");
const { DataTypes} = require("sequelize");
const User = sequelize.define("User", {
    id: {
        primaryKey: true, 
        type: DataTypes.STRING, 
        defaultValue: DataTypes.UUIDV4
    }, 
    name : {
        type: DataTypes.STRING, 
        allowNull: false, 
    }, 
    phone: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    password: {
        type: DataTypes.STRING, 
        allowNull: false, 
    }, 
    address: {
        type: DataTypes.STRING, 
        allowNull: false,
    }, 
    point: {
        type: DataTypes.INTEGER, 
        defaultValue: 0, 
    }, 
    is_admin: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false, 
    }
});

module.exports = User;