import transporter from "../config/nodemailer.js";

export const sendVerificationEmail = async (email,verifyCode,subject) => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: email, // list of receivers
    subject:subject,
    //  "Verification Email✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `
        <div>
        <b>Verification Email for XYZ</b>
        <p>Verification Code</p> <b>${verifyCode}</b>
        </div>
        `, // html body
  });
  console.log("Message sent: %s", info.messageId);
};
