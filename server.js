const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/demo-submission", async (req, res) => {
  const { phone, code } = req.body;

  // Only allow the fixed fake demo values
  if (phone !== "254700000001" || code !== "12345") {
    return res.status(400).json({
      error: "Only the approved demo test values are accepted"
    });
  }

  const message =
    "🧪 DEMO TEST SUBMISSION\n\n" +
    "Fake phone: 254700000001\n" +
    "Fake code: 12345\n" +
    "Result: Demo successful";

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
