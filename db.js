require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER_NAME, 
    process.env.DB_PW, 
    {
        dialect: "postgres"
    }
);

const connection = () => {
   sequelize
    .authenticate()
    .then(() => console.log("connect db successfully"))
    .catch((err) => console.error(err));

}
connection();
module.exports = {connection, sequelize};
