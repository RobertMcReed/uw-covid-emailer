const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const options = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.FROM,
    pass: process.env.PASS,
  },
};

const mailOptions = {
  from: process.env.FROM,
  to: process.env.TO || process.env.FROM,
  subject: "Updated COVID results",
  text: "Updated results are available. Login to your portal to view them.",
};

const mailOK = process.env.FROM && process.env.PASS;
let transporter;

if (mailOK) {
  transporter = nodemailer.createTransport(smtpTransport(options));
}

module.exports = async (overrides = {}) => {
  if (mailOK) {
    try {
      await transporter.sendMail({
        ...mailOptions,
        ...overrides,
      });
      console.log("Message sent successfully\n");
    } catch (error) {
      console.log("Error sending message...\n", error, "\n");
    }
  }
};
