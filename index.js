require("dotenv").config();
const app = require("./app");
const http = require("http");
const port = process.env.PORT;

//server http
const server = http.createServer(app);
server.listen(port, () => console.log(`server running port ${port}`));


