import express from "express";
import {
  login,
  register,
  resendVerifyEmail,
  sendForgetPasswordEmail,
  setNewPassword,
  VerifyforgetPasswordCode,
  verifyYourself,
} from "../Controller/UserController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifyYourself/:id", verifyYourself);
router.get("/resendEmail/:id", resendVerifyEmail);
router.post("/forgetPasswordEmail", sendForgetPasswordEmail);
router.post("/verifyForgetcode/:id", VerifyforgetPasswordCode);
router.post("/setNewPassword/:id", setNewPassword);
// router.get("/sendEmail/:id", sendVerificationEmail);

export default router;
