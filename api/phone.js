export default async function handler(req, res) {
  // Set timeout to prevent hanging
  res.setTimeout(10000, () => {
    if (!res.headersSent) {
      res.status(504).json({ error: "Request timeout" });
    }
  });

  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Missing ?phone parameter" });
  }

  try {
    console.log(Request for phone: ${phone});
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(https://osintapi.anshapi.workers.dev/?phone=${phone}, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      return res.status(502).json({
        error: External API returned ${response.status},
        status: response.status
      });
    }

    const text = await response.text();
    
    if (!text) {
      return res.status(502).json({ error: "Empty response from external API" });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      return res.status(502).json({ 
        error: "Invalid JSON from external API",
        response: text.substring(0, 100)
      });
    }

    // Clean up response
    delete data.developer;
    data.source_by = "BST API";

    return res.status(200).json(data);

  } catch (error) {
    console.error('Full error:', error);
    
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: "Request timeout" });
    }
    
    return res.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
}
