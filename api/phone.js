import fetch from "node-fetch";

export default async function handler(req, res) {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Missing ?phone parameter" });
  }

  try {
    const response = await fetch(https://osintapi.anshapi.workers.dev/?phone=${phone});
    const data = await response.json();

    delete data.developer;
    data.source_by = "BST API";

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message
    });
  }
}
