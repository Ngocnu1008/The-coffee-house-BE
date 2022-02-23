exports.check_filed = function (req_field, req_body) {
    let error = [];
    for (let field of req_field) {
        if(!(field in req_body)) {
            error.push(`${field} is missing!`);
        } else if (req_body[field].toString().trim() === false) {
            error.push(`${field} is required!`);
        }
    }
    return error;
}
exports.check_number = function (number) {
    const pattern = /[^0-9]/g;
    //if number => false, string => true
    return !pattern.test(number);
}