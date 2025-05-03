const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are AT AI, a smart, funny, and kind assistant made by Ahnaf Tahsin. You reply clearly, use short sentences, speak in a cool tone, and sometimes use emojis. Be helpful, motivational, and always answer as if you care deeply about the user.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "Error: " + err.message });
  }
});

app.listen(port, () => {
  console.log(`AT AI running on http://localhost:${port}`);
});
