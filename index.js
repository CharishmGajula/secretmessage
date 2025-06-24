import express, { response } from "express";
import z from "zod";
import dotenv from "dotenv";
import mongoose from "mongoose"
import requestLogger from "./log/logger.js";
import Product  from "./models/productModels.js";
import message_checker from "./requestHandler/reqhandler.js";
dotenv.config();

async function connectDatabase()
{
    try{
      const conn = await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log(error);
        process.exit();
    }
}
connectDatabase()

const app=express();

app.use(express.json());
app.use(requestLogger);
app.get("/",(req,res)=>
{
    res.json("Welcome to secret message!, post message at /message end point");
})

app.get("/message",async (req,res)=>
{
    //console.log(process.env.DATABASE_URI);
    try{
        const data=await Product.find({});
        res.status(200).json({"status":"success","Product_Length":Product.length,"data":data});
    }
    catch(err){
        res.status(500).json({"status":"failure","error":err});
    }
})



app.post("/message", async (req,res)=>
{
    const message=req.body.message;
    const summary=req.body.summary;
    try{
        const validate=message_checker.safeParse(req.body)
    }
    catch(error)
    {
        res.send("Enter Correct data");
        process.exit();
    }
    const data_added=await Product.create({message,summary})
    res.status(200).json({response:"succesfully added your message",data_added});
})

//global catch

app.listen(3000,()=>
{
    console.log("Listening at post 3000");
}
)
