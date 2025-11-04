// 👇 Yeh line sabse upar likhni hai
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

export default async function handler(req, res) {
  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Missing ?phone parameter" });
  }

  try {
    // Fetch data from original API
    const response = await fetch(https://osintapi.anshapi.workers.dev/?phone=${phone});
    const data = await response.json();

    // Developer field remove karna
    delete data.developer;

    // Apna name add karna
    data.source_by = "BST API";

    // Final output
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message
    });
  }
}
