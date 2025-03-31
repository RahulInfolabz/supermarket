const cors = require("cors");
const express = require("express");
const connectDb = require("./Db/connectDb");
const fetchAllCategories = require("./Api/User/Categories/fetchAllCategories");
const fetchAllProducts = require("./Api/User/Products/fetchAllProducts");
const insertCategories = require("./Api/Admin/Categories/insertCategories");
const insertProduct = require("./Api/Admin/Products/insertProduct");
const insertProducts = require("./Api/Admin/Products/insertProducts");
const insertCategory = require("./Api/Admin/Categories/insertCategory");
const fetchProductsByCategory = require("./Api/User/Products/fetchProductsByCategory");
const fetchProductById = require("./Api/User/Products/fetchProductsById");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:5174",
    ], // Allowed frontend URLs
    credentials: true, // Allow cookies and sessions to be shared across origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);

connectDb();

// user

app.get("/categories", fetchAllCategories);
app.get("/products", fetchAllProducts);
app.get("/category/:category_id", fetchProductsByCategory);
app.get("/products/:product_id", fetchProductById);


// admin
app.post("/insertCategories", insertCategories);
app.post("/insertProducts", insertProducts);
app.post("insertProduct", insertProduct);
app.post("/insertCategory", insertCategory);

app.listen(PORT, () => {
  console.log("Server Started At Port : ", PORT);
});
