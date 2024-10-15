import nodemailer from 'nodemailer' 

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "dawn.jacobi90@ethereal.email",
    pass: "yXkJZyT5nauvppUgP3",
  },
});
export default transporter;
