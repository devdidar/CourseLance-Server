const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9very.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function run() {
    try {
      await client.connect();
      const database = client.db("courseLance");
      const courseCollection = database.collection("courses");

      // get all courses
      app.get('/courses', async(req,res)=>{
        const courses = await courseCollection.find({}).toArray();
      res.send(courses);
      })
     
    } finally {
      //   await client.close();
    }
  }
  run().catch(console.dir);
  
  app.get("/", (req, res) => {
    res.send("Hello CourseLance Server!");
  });
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });