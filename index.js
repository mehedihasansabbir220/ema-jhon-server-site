const express = require('express');
const app = express();
require('dotenv').config()
const { MongoClient } = require('mongodb');
const cors = require("cors")

const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ncqfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        client.connect();
        const database = client.db("online_shop");
        const productCollection = database.collection("products");

        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const product = await cursor.toArray();
            res.send(product)
        })


    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("this is emajhon simple ");
});

app.listen(port, () => {
    console.log("Surver running at port", port);
});