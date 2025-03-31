const connectDb = require("../../../Db/connectDb");

let fetchAllCategories = async (req, res) => {
  try {
    const databse = await connectDb();
    const collection = databse.collection("categories");
    const categories = await collection.find().toArray();
    if (categories.length > 0) {
      res.status(200).json({
        success: true,
        message: "Data retrieved successfully.",
        categories,
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

module.exports = fetchAllCategories;
