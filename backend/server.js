import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/router.js";
import cors from "cors";
dotenv.config();

const App = express();

App.use(cors());
App.use(express.json());

//{useUnifiedTopology: true, useNewUrlParser: true}


const PORT = process.env.PORT || 4000

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Routes go here
App.use("/api", router);

//Connect to the database before listening
connectDB().then(() => {
    App.listen(PORT, () => {
        console.log("listening for requests");
    })
})




