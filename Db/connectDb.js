require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

let connectDb = async () => {
  try {
    const connectionUrl = process.env.MONGO_URI;
    const client = await MongoClient.connect(connectionUrl);
    console.log("Database Connected");
    return client.db();
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDb;
