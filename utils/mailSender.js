const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // send mail

    let info = await transporter.sendMail({
      from: `MailAuthX <${process.env.MAIL_USER}>`,
      to: email,

      subject: title,

      html: body,
    });

    console.log("Email sent Successfully");
    return info;
  } catch (err) {
    console.log("MAil Errror",err);
  }
};

module.exports = mailSender;
