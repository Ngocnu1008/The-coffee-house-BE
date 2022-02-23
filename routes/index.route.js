const Notfound = require("../handler/Notfound.handler");
const routerLogin = require("./login");
const RouterAdmin = require("./admin")
const routerUser = require("./user");

function Route(app) {
    app.use("/general", routerLogin);//giải thích app.use trong file Nodejs(video2, phút 40s)

    app.use("/admin", RouterAdmin);

    app.use("/customer", routerUser);

    app.use("*", Notfound);
}
module.exports = Route;