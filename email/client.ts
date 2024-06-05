import nodemailer from "nodemailer";

const authEmail = process.env.SMTP_EMAIL;
const authPassword = process.env.SMTP_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: authEmail,
    pass: authPassword,
  },
});

export const mailOptions = {
  from: `HELLO JOB 👋 - noreply ${authEmail}`,
  to: "amrhnshh@gmail.com",
};
