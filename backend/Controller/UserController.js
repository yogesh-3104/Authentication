import { generateToken } from "../helper/generateToken.js";
import { sendVerificationEmail } from "../helper/SendVerificationEmail.js";
import User from "../Model/User.js";
import bcryptjs from "bcryptjs";
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let userexist = await User.findOne({ email });
    if (userexist) {
      return res.json({
        message: "User with this email already exist",
        success: false,
      });
    }

    userexist = await User.findOne({ username });
    if (userexist) {
      return res.json({ message: "Username already taken", success: false });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const user = await new User({ username, email, password: hashPassword });
    delete user.password;

    const verifyCode = Math.floor(100000 + Math.random() * 900000);
    const verifyCodeExpiry = new Date(Date.now() + 3600000);
    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = verifyCodeExpiry;
    user.save();

    const token = generateToken({ id: user._id });
    res.cookie("token", token);
    await sendVerificationEmail(email, verifyCode, "Verification Email");
    return res.json({
      message: "User Registered Successfully",
      data: user,
      token: token,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    // console.log(identifier,password)
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not Found", success: false });
    } else {
      const isValidPassword = await bcryptjs.compare(password, user.password);
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ message: "Invalid Credentials", success: false });
      }
      delete user.password;
      const token = generateToken({ id: user._id });
      res.cookie("token", token);
      return res.json({
        message: "User Login SuccessFully",
        data: user,
        token: token,
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const verifyYourself = async (req, res) => {
  try {
    const { verifyCode } = req.body;
    const user = await User.findOne({ _id: req.params.id });
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not Found", success: false });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: "User is already verified", success: false });
    }

    // console.log(new Date(), Date.now());
    if (verifyCode === user.verifyCode && user.verifyCodeExpiry > new Date()) {
      user.isVerified = true;
      user.verifyCode = undefined;
      user.verifyCodeExpiry = undefined;
      user.save();
      return res
        .status(200)
        .json({
          message: "user email verified successfully",
          data: user,
          success: true,
        });
    } else if (user.verifyCodeExpiry < new Date()) {
      return res
        .status(400)
        .json({
          message: "Verification code expired",
          data: user,
          success: false,
        });
    } else {
      return res
        .status(400)
        .json({
          message: "Invalid Verification Code. Try again",
          success: false,
        });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Please Verify with valid Code", success: false });
  }
};

export const resendVerifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000);
    const verifyCodeExpiry = new Date(Date.now() + 3600000);
    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = verifyCodeExpiry;
    user.save();
    await sendVerificationEmail(
      user.email,
      verifyCode,
      "Resended Verification Email"
    );
    return res.status(200).json({ message: "Verify email resend successfully", success: true });
  } catch (err) {
    console.log(err);
  }
};

//if user click on forget password on the login page he  will redirect to a page where he has to enter email and then the onclicking this route will gonna work
export const sendForgetPasswordEmail = async (req, res) => {
  try {
    const {email}=req.body;
    const user = await User.findOne({ email});
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const forgetPasswordCode = Math.floor(100000 + Math.random() * 900000);
    const forgetPasswordExpiry = new Date(Date.now() + 3600000);
    console.log(user.forgetPasswordExpiry < new Date());
    
    if (!user.forgetPasswordCode || user.forgetPasswordExpiry < new Date()) {
      user.forgetPasswordCode = forgetPasswordCode;
      user.forgetPasswordExpiry = forgetPasswordExpiry;
      user.save();
      await sendVerificationEmail(user.email, forgetPasswordCode, "Forget Password Code");
      return res.status(200).json({message: "Code for setting new password sent successfully",success: true,});
    } 
    // else if(user.forgetPasswordExpiry < new Date()){
    //   user.forgetPasswordCode = forgetPasswordCode;
    //   user.forgetPasswordExpiry = forgetPasswordExpiry;
    //   user.save();
    //   await sendVerificationEmail(user.email, forgetPasswordCode, "Resent Forget Password Code");
    //   return res.status(200).json({message: "Code for setting new password Resent successfully",status: true,});
    // }
    else {
      return res.status(400).json({message: "Code for setting new passoword already sent",success: false,});
    }

    // if (user.isVerified) {
    //   const forgetPasswordCode = Math.floor(100000 + Math.random() * 900000);
    //   const forgetPasswordExpiry = new Date(Date.now() + 3600000);
    //   user.forgetPasswordCode = forgetPasswordCode;
    //   user.forgetPasswordExpiry = forgetPasswordExpiry;
    //   user.save();
    //   await sendVerificationEmail(email, forgetPasswordCode, "Forget Password");

    //   return res.status(200).json({ message: "Verify email sent successfully", status: true });
    // } else {
    //   return res.status(400).json({ message: "Please verify your email address before resetting your password", status: false });
    // }
  } catch (err) {
    console.log(err);
  }
};

export const VerifyforgetPasswordCode = async (req, res) => {
  try {
    const id=req.params.id;
    const {code} = req.body;
    const user = await User.findOne({_id: id });
    console.log(user);
    console.log(new Date());
    
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.forgetPasswordCode === code && user.forgetPasswordExpiry > new Date()) {
      return res.status(200).json({  message: "Code is valid, you can set your new password",  success: true,});
    }
    else if(user.forgetPasswordExpiry < new Date()){
      return res.status(400).json({  message: "Forget password verification Expired",  success: false,});
    } 
    else {
      return res.status(400).json({ message: "Invalid code", success: false });
    }

    //  if (user.isVerified) {
    //   if (code === user.forgetPasswordCode && user.forgetPasswordExpiry > new Date()) {
    //     // Code is valid, redirect to set password page
    //     return res.status(200).json({ message: "Code is valid, you can set your new password", status: true });
    //   } else {
    //     return res.status(400).json({ message: "Invalid code", status: false });
    //   }
    // } else {
    //   return res.status(400).json({ message: "Please verify your email address before resetting your password", status: false });
    // }
  } catch (err) {
    console.log(err);
  }
};

export const setNewPassword = async (req, res) => {
  try {
    const {  password } = req.body;
    const id=req.params.id;
    // make the ui show above two and this one route handle at there only
    //in ui part take password and confirm password the check confirmpass===pass then proceed
    const user = await User.findOne({ _id:id });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    user.password = hashPassword;
    user.save();
    return res.status(200).json({ message: "New password set successfully", success: true });
  } catch (err) {
    console.log(err);
  }
};
