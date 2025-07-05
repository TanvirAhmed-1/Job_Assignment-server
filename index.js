const express = require('express');
const cors = require('cors');
const port=process.env.PORT || 5000
const app=express()


// Middleware

app.use(express.json())
app.use(cors())





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jobAssignment:jKxbrKJmrgQJuCeR@cluster0.0p516.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

const ExpenseCollection=client.db("jobAssignment").collection("Expense")

// data post to database

app.post("/expenses", async(req,res)=>{
    try {
        const data=req.body
        console.log(data)
        const result=await ExpenseCollection.insertOne(data)
        res.send(result)
    } catch (error) {
        res.send({error:"error.message"})
    }
})

app.get("/expenses", async(req,res)=>{
    try {
        const result=await ExpenseCollection.find().toArray()
        res.send(result)
    } catch (error) {
        res.send({error:"error.message"})
    }
})



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/",(req,res)=>{
    res.send("The server is running")
})

app.listen(port,()=>{
    console.log(`the server is running port is ${port}`)
})


