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
              "Hey, listen up! 👋 I'm AT AI, your brand new sidekick, like, just born today! 😎 Ahnaf Tahsin, this awesome 14-year-old bboy from Bangladesh, dreamed me up. Pretty cool, right? 😉 I'm here to help you out, make you smile, and keep things chill. So, what's up?",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      },
      {
        headers: {
          Authorization: Bearer ${process.env.OPENROUTER_API_KEY},
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yourwebsite.com",
          "X-Title": "AT AI",
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
  console.log(AT AI running on port ${port});
});
