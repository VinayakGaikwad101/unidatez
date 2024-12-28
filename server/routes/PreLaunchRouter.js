import Email from "../model/EmailModel.js";
import express from "express";
import { preLaunchEmailRegister } from "../controllers/PreLaunchEmailRegister.js";

const router = express.Router();

router.post("/save/email", preLaunchEmailRegister); // http://localhost:3000/api/pre-register/save/email

export default router;
