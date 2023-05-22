import express from "express";

import {
  register,
  login,
  forgotpassword,
  resetpassword,
  getPrivateData,
} from "../Controllers/auth.js";

import { getAccessToRoute } from "../Middlewares/Authorization/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/forgotpassword", forgotpassword);

router.put("/resetpassword", resetpassword);

router.get("/private", getAccessToRoute, getPrivateData);

// module.exports = router;
export default router;
