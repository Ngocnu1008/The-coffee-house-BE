function RandomOTP () {
    const otp = Math.floor(100000 + Math.random() * 900000); //Math.foor làm tròn đến số nguyên gần nhất nhỏ hơn số truyền vào, vd: 245632.12 = 245632
    return otp;
}
module.exports = RandomOTP;