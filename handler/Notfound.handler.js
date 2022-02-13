const Notfound = (_req, res) => {
    res.status(404).send("Endpoint the coffee house not found");
}
module.exports = Notfound;