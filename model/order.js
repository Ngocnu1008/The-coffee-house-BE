const { sequelize} = require("../db");
const { DataTypes} = require("sequelize");

const Order = sequelize.define("Order", {
    id: {
        primaryKey: true, 
        autoIncrement: true, 
        type: DataTypes.INTEGER
    }, 
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    cost: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
    }, 
    price: {
        type: DataTypes.STRING, 
        allowNull: false,
    }, 
    description: {
        type: DataTypes.TEXT, 
        defaultValue: "",
    }, 
    story: {
        type: DataTypes.TEXT, 
        defaultValue: ""
    }, 
    attachment: {
        type: DataTypes.STRING, 
        defaultValue: "", 
    }
});

module.exports = Order;