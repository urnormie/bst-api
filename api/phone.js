export default async function handler(req, res) {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Missing ?phone parameter" });
  }

  try {
    const url = https://osintapi.anshapi.workers.dev/?phone=${phone};
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(HTTP error! status: ${response.status});
    }
    
    const data = await response.json();
    
    // Remove developer field and add source_by
    delete data.developer;
    data.source_by = "BST API";
    
    res.status(200).json(data);
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
}
