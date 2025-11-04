export default async function handler(req, res) {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Missing ?phone parameter" });
  }

  try {
    // Original API call
    const response = await fetch(https://osintapi.anshapi.workers.dev/?phone=${phone});
    const data = await response.json();

    // Developer field remove karna
    delete data.developer;

    // Apna tag add karna
    data.source_by = "BST API";

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message
    });
  }
}
