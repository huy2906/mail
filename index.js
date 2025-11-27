import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

app.post("/api/send", async (req, res) => {
  try {
    const { apiName, statusCode, errorMsg, timestamp, to } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const html = `
      <h2>⚠ CẢNH BÁO API LỖI</h2>
      <b>API:</b> ${apiName}<br/>
      <b>Status:</b> ${statusCode}<br/>
      <b>Error:</b> ${errorMsg}<br/>
      <b>Time:</b> ${timestamp}
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "⚠ API Error Alert",
      html
    });

    res.json({ ok: true, message: "Email sent" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/", (req, res) => {
  res.send("Mail API is running.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
