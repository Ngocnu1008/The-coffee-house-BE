function Success(res, data) {
    res.status(200).json(data);
}

function BadRequest(res, message) {
    res.status(400).send(message);
}

function UnAuthorize(res, message) {
    res.status(401).send(message);
}
module.exports = { Success, BadRequest, UnAuthorize };