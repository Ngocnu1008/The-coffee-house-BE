const { sequelize} = require("../db");
const { DataTypes} = require("sequelize");

const ParentType = sequelize.define("ParentType", {
    id: {
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4, 
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    },  
   createAt: {
       type: DataTypes.DATE, 
       defaultValue: new Date(),
   }
});

module.exports = ParentType;