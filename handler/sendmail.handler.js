const nodeMailer = require("nodemailer");

// setup email
const admin_email = process.env.EMAIL;
const admin_pw = process.env.MK_EMAIL;
const mailHost = "smtp.gmail.com"; //giao thuc gui email di;
const mailPort = 587;
const subject = `The coffee house`;

const sendMail = (to, htmlContent) => {
    // Khởi tạo 1 transporter object sử dụng chuẩn giao thức truyền tải smtp với các thông tin cấu hình ở trên:
    const transporter = nodeMailer.createTransport({
        host: mailHost, 
        port: mailPort, 
        secure: false, 
        auth: {
            user: admin_email, 
            pass: admin_pw
        } 
    });

    const options = {
        from: admin_email, 
        to: to, 
        subject: subject, 
        html: htmlContent,
        // text: htmlContent
    };

    //hàm transporter.sendRmail() sẽ trả về cho chúng ta 1 promise:
    return transporter.sendMail(options)
}
module.exports = sendMail;
//end setup email:

//tai lieu: nodeMailer