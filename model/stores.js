const { sequelize} = require("../db");
const { DataTypes} = require("sequelize");

const Stores = sequelize.define("Stores", {
    id: {
        primaryKey: true, 
        autoIncrement: true, 
        type: DataTypes.INTEGER
    }, 
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    add: {
        type: DataTypes.STRING, 
        allowNull: false
    },     
    attachment_map: {
        type: DataTypes.STRING, 
        defaultValue: "", 
    }, 
    description: {
        type: DataTypes.TEXT, 
        defaultValue: ""
    }
});

module.exports = Stores;