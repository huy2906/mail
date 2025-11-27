import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mail API is running...");
});

app.post("/api/send", async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!to) return res.status(400).json({ error: "Missing 'to' field" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,   // bạn set trong Render
        pass: process.env.GMAIL_PASS    // bạn set trong Render
      }
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: subject || "No Subject",
      text: text || ""
    });

    res.json({ success: true, message: "Mail sent!" });

  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: err.toString() });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Mail API running on", PORT));
