const connectDb = require("../../../Db/connectDb");

async function insertProduct(req, res) {
  try {
    // get database
    const db = await connectDb();

    // get collection
    const collection = db.collection("products");

    const {
      name,
      category_id,
      description,
      brand,
      price,
      currency,
      quantity_available,
      unit,
      image,
      tags,
      rating,
      reviews_count,
    } = req.body;

    // write here query
    const insert = await collection.insertOne({
      name,
      category_id,
      description,
      brand,
      price,
      currency,
      quantity_available,
      unit,
      image,
      tags,
      rating,
      reviews_count,
    });

    if (insert.acknowledged) {
      res.status(201).json({
        success: true,
        message: "Product inserted successfully.",
        data: insert.ops[0], // Send back the inserted product data
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Failed to insert product.",
        message:
          "Data insertion was unsuccessful. Please check the request and try again.",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred on the server.",
      message: "Internal Server Error. Please try again later.",
    });
  }
}

module.exports = insertProduct;
