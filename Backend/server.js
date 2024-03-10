import path from "path";
import dotenv from "dotenv"; //package imports
import express from "express"; //Package imports
import cookieParser from 'cookie-parser';


import authRoutes from "./routes/auth.routes.js";//file imports
//import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import mongoose from "mongoose";//file imports


const app = express();  //variables
const PORT = process.env.PORT || 5000; //variables

const __dirname = path.resolve();

mongoose.connect("mongodb://localhost:27017/")
.then(()=>console.log("connected to mongodb"))
.catch((err)=>console.log(err))

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get('/', (req, res) => {
//     res.send("Hello World!!");
// });

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    //connectToMongoDB();
    console.log(`Server Running on Port ${PORT}`)});