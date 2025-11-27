import express from "express";
import bodyParser from "body-parser";
import { Resend } from "resend";

const app = express();
app.use(bodyParser.json());

// Resend config
const resend = new Resend("re_GFtd1s9q_G3aRNet7kZnjpf3XNmvEyStw");

app.post("/api/send", async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await resend.emails.send({
      from: "Huy <onboarding@resend.dev>",
      to,
      subject,
      text
    });

    res.json({ success: true, result });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({ error: "Failed to send email", detail: err });
  }
});

// Render requires listening on 0.0.0.0
const port = process.env.PORT || 10000;
app.listen(port, "0.0.0.0", () => console.log("Mail API running on", port));
