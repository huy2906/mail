import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(express.json());

// Init resend
const resend = new Resend(process.env.RESEND_API);

app.post("/api/send", async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    const data = await resend.emails.send({
      from: "Mail API <onboarding@resend.dev>",
      to,
      subject,
      text
    });

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Mail API with Resend is running!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on " + PORT));
