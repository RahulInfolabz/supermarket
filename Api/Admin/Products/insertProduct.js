const { ObjectId } = require("mongodb");
const connectDb = require("../../../Db/connectDb");

async function insertProduct(req, res) {
  try {
    const db = await connectDb();
    const collection = db.collection("products");

    const {
      name,
      category_id, // Expecting hexadecimal string from request
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
      nutritional_info,
      dietary_preferences,
      shelf_life,
      batch_number,
      storage_instructions,
      organic,
      discount,
      minimum_order_quantity,
    } = req.body;

    const productDocument = {
      name,
      category_id: ObjectId.createFromHexString(category_id),
      description,
      brand,
      price: Number(price),
      currency,
      quantity_available: Number(quantity_available),
      unit,
      image,
      tags,
      rating: Number(rating),
      reviews_count: Number(reviews_count),
      nutritional_info,
      dietary_preferences,
      shelf_life,
      batch_number,
      storage_instructions,
      organic: Boolean(organic),
      discount: Number(discount) || 0,
      minimum_order_quantity: Number(minimum_order_quantity) || 1,
      status: "Active",
      created_at: new Date(),
    };

    const insertResult = await collection.insertOne(productDocument);

    if (insertResult.acknowledged) {
      res.status(201).json({
        success: true,
        message: "Product inserted successfully",
        data: {
          ...productDocument,
          _id: insertResult.insertedId,
          category_id: category_id, // Return original string for reference
        },
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Insert operation failed",
        message: "Product could not be added to the database",
      });
    }
  } catch (error) {
    console.error("Error inserting product:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
}

module.exports = insertProduct;
