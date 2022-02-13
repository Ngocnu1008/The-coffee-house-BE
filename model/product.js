const { sequelize} = require("../db");
const { DataTypes} = require("sequelize");

const Product = sequelize.define("Product", {
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
    }, 
    id_group : {
        type: DataTypes.STRING, 
        allowNull: false
    }
});

module.exports = Product;