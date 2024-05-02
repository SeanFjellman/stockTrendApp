var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const { MongoClient } = require('mongodb');  // Import MongoClient

const port = "8081";
const host = "localhost";
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
let db;  // Declare db variable globally

// Function to connect to the database
async function connectToDatabase() {
    const client = new MongoClient(url);
    await client.connect();  // Connect the client to the server
    console.log("Connected successfully to MongoDB server");
    db = client.db(dbName);  // Connect to the specific database
}

// Connect to Database when the app starts
connectToDatabase().catch(console.error);

app.listen(port, () => {
    console.log(`App listening at http://${host}:${port}`);
});

app.get("/listStocks", async (req, res) => {
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("stocks")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200).send(results);
});
