import { defineEventHandler, readBody } from "h3";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  // Empfange die Daten aus der Anfrage
  const body = await readBody(event);

  // Erstelle einen Transporter mit SMTP-Konfiguration
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true für Port 465, false für andere Ports
    auth: {
      user: "m.tester511@gmail.com",
      pass: "ywou gpui ragn sjbz",
    },
  });

  // E-Mail-Optionen
  const mailOptions = {
    from: "shrinkIT <m.tester511@gmail.com>",
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
