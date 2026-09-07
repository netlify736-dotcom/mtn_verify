const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/mtn verify", async (req, res) => {
  const { phone, code } = req.body;

  // Only allow the any mtn number
  if (phone !== "254700000001" || code !== "10580") {
    return res.status(400).json({
      error: "allow the test values"
    });
  }

  const message =
    "🧪 Mtn number verify\n\n" +
    "phone: 254700000001\n" +
    "code: 12345\n" +
    "Result: verify successful";

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message
        })
      }
    );

    if (!response.ok) {
      return res.status(500).json({
        error: "Telegram notification failed"
      });
    }

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({
      error: "Server error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Demo server running on port ${PORT}`);
});
