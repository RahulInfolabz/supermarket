const cors = require("cors");
const express = require("express");
const connectDb = require("./Db/connectDb");
const fetchAllCategories = require("./Api/User/Categories/fetchAllCategories");
const fetchAllProducts = require("./Api/User/Products/fetchAllProducts");
const insertCategories = require("./Api/Admin/Categories/insertCategories");
const insertProduct = require("./Api/Admin/Products/insertProduct");
const insertCategory = require("./Api/Admin/Categories/insertCategory");
const fetchProductsByCategory = require("./Api/User/Products/fetchProductsByCategory");
const fetchProductById = require("./Api/User/Products/fetchProductsById");
const { AddProductInquiry } = require("./Api/User/Products/addProductInquiry");
const { AddContactInquiry } = require("./Api/User/Products/addContactInquiry");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "http://localhost:5174",
      ];

      if (
        !origin || // allow non-browser requests like curl, Postman
        allowedOrigins.includes(origin) ||
        /https?:\/\/.*\.?onrender\.com$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connectDb();

// user
app.get("/", () => {
  res.status(200).json({
    success: true,
    message: "Server Connected.",
    apis: {
      products: "https://supermarket-e9sk.onrender.com/products",
      categories: "https://supermarket-e9sk.onrender.com/categories",
      productsByCategory: "https://supermarket-e9sk.onrender.com/category/1",
      productsById:
        "https://supermarket-e9sk.onrender.com/products/67ead29624c22d48e1bff5eb",
    },
  });
});
app.get("/categories", fetchAllCategories);
app.get("/products", fetchAllProducts);
app.get("/category/:category_id", fetchProductsByCategory);
app.get("/products/:product_id", fetchProductById);

// admin
app.post("/insertCategories", insertCategories);
app.post("/insertProduct", insertProduct);
app.post("/insertCategory", insertCategory);
app.post("/storeProductInquiry", AddProductInquiry);
app.post("/storeContactInquiry", AddContactInquiry);

app.listen(PORT, () => {
  console.log("Server Started At Port : ", PORT);
});
