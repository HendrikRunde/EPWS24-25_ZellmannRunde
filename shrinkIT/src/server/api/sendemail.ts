import { defineEventHandler, readBody } from "h3";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Lade die Umgebungsvariablen aus der .env Datei
dotenv.config();

export default defineEventHandler(async (event) => {
  // Empfange die Daten aus der Anfrage
  const body = await readBody(event);

  // Erstelle einen Transporter mit SMTP-Konfiguration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "0", 10),
    secure: process.env.SMTP_SECURE === "true", // true für Port 465, false für andere Ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // E-Mail-Optionen
  const mailOptions = {
    from: `shrinkIT <${process.env.SMTP_USER}>`,
    to: body.to,
    subject: body.subject,
    text: body.text,
  };

  // Sende die E-Mail
  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email erfolgreich gesendet" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Fehler beim Senden der E-Mail", error };
  }
});
