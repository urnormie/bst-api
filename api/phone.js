import https from "https";

export default async function handler(req, res) {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Missing ?phone parameter" });
  }

  try {
    // fetch ke instead native https request use karo (no dependency)
    const url = https://osintapi.anshapi.workers.dev/?phone=${phone};

    https.get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        try {
          const parsed = JSON.parse(data);

          // developer field remove karo
          delete parsed.developer;

          // apna tag add karo
          parsed.source_by = "BST API";

          res.status(200).json(parsed);
        } catch (err) {
          res.status(500).json({ success: false, error: "Invalid JSON response" });
        }
      });
    }).on("error", (err) => {
      res.status(500).json({ success: false, error: err.message });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
}
