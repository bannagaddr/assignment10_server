const express = require("express");
const app = express();
var cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // target to mongo database
    const assignment10 = client.db("assignment10");
    // select db collection from main(now: assignment10) database
    const cropsCollection = assignment10.collection("crops");

    // api for getting data
    app.get("/", (req, res) => {
      res.send("");
    });

    // api for getting data
    // get method: find(), findOne()
    app.get("/crops", async (req, res) => {
      const result = await cropsCollection.find().toArray();

      // send req data to client side
      res.send(result);
    });

    // get data by id from mongodb
    app.get("/crops/:id", async (req, res) => {
      const { id } = req.params;
      // const objectId = new ObjectId(id) (another option)
      console.log(id);

      const result = await cropsCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Express.js
    app.get("/my-post/:email", async (req, res) => {
      const email = req.params.email;
      const result = await interestsCollection
        .find({ userEmail: email })
        .toArray();
      res.send(result);
    });

    // put data to mongodb
    // post method: insertOne(), insertMany()
    app.post("/crops", async (req, res) => {
      // data from client side and set to body
      const data = req.body;
      // console.log(data);

      // data insert into the database
      const result = await cropsCollection.insertOne(data);

      // send req data to client side
      res.send(result);
    });

    // updated data from mongodb
    // update method: updateOne(), updateMany()

    // delete data from mongodb
    // delete method: deleteOne(), deleteMany()
    app.delete("/crops/:id", async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const filter = { _id: objectId };

      const result = await cropsCollection.deleteOne(filter);

      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// -------------------------------------------------------------------------------------------------------------------------------------------
// run this server
app.listen(port);
