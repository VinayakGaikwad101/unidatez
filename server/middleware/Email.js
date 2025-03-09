import {
  Verification_Email_Template,
  Welcome_Email_Template,
  Password_Reset_Template,
} from "../libs/EmailTemplate.js";
import { transporter } from "./EmailConfig.js";

export const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      // from: '"UniDatez 💗" <vinaayakgaikwad@gmail.com>',
      from: '"UniDatez 💗" <unidatez@gmail.com>',
      to: email,
      subject: "Verify your Email",
      text: "Verify your Email",
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending email", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      // from: '"UniDatez 💗" <vinaayakgaikwad@gmail.com>',
      from: '"UniDatez 💗" <unidatez@gmail.com>',
      to: email,
      subject: "Welcome Email",
      text: "Welcome to UniDatez",
      html: Welcome_Email_Template.replace("{name}", name),
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending email", error);
  }
};

export const sendEmail = async (to, subject, html) => {
  try {
    const response = await transporter.sendMail({
      from: '"UniDatez 💗" <unidatez@gmail.com>',
      to,
      subject,
      html,
    });

    console.log("Email sent successfully", response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
