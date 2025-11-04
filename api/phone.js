export default async function handler(req, res) {
  try {
    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({ error: "Missing ?phone parameter" });
    }

    console.log('Fetching data for phone:', phone);
    
    const url = https://osintapi.anshapi.workers.dev/?phone=${phone};
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(External API error: ${response.status});
    }
    
    const data = await response.json();
    
    // Modify the response
    delete data.developer;
    data.source_by = "BST API";
    
    console.log('Successfully processed data');
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error details:', error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
}
