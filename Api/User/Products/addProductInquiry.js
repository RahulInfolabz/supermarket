const connectDb = require("../../../Db/connectDb");

async function AddProductInquiry(req, res) {
  try {
    const db = await connectDb();
    const collection = db.collection("ProductInquiry");

    const { productId, username, email, phone, message } = req.body;

    if (!productId || !username || !email || !phone || !message) {
      res.status(404).json({
        success: false,
        message: "All Field Are Required",
      });
    }

    await collection.insertOne({
      productId: productId,
      username,
      email,
      phone,
      message,
      status: "Pending",
      timestamp: new Date(),
    });

    return res
      .status(201)
      .json({ success: true, message: "Product Inquiry Submitted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddProductInquiry };
