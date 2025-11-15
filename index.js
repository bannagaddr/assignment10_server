const express = require("express");
const app = express();
var cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = 3000;

// cors middleware for allow all cross request
app.use(cors());
// json data convert then set in to the body for using globally
app.use(express.json());

// -------------------------------------------------------------------------------------------------------------------------------------------
// MongoDB- now create all apis into this database.
const uri =
  "mongodb+srv://assignment10:bVpZg5qKQUxL6fZT@devcluster.bxh9yyl.mongodb.net/?appName=DevCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // write apis in this line

    // Send a ping to confirm a successful connection
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// -------------------------------------------------------------------------------------------------------------------------------------------
// run this server
app.listen(port);
