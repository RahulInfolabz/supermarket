const connectDb = require("../../../Db/connectDb");

let fetchAllProducts = async (req, res) => {
  try {
    const database = await connectDb();
    const collection = database.collection("products");
    const products = await collection.find().toArray();

    if (products.length > 0) {
      res.status(200).json({
        success: true,
        message: "Data retrieved successfully.",
        products,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Requested resource not found.",
        message: "No data found for the given criteria.",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred on the server.",
      message: "Internal Server Error. Please try again later.",
    });
  }
};

module.exports = fetchAllProducts;
