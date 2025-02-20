import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/messgae.route.js";
import { app, server } from "./socketIO/server.js";
import path from "path"

dotenv.config();

const PORT = process.env.PORT 
const URI = process.env.MONGODB_URI;

app.use(cors({
    origin: "http://localhost:3001", 
    credentials: true, 
}));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database"))
    .catch(err => console.log("Error in database connection:", err));

// Test Route
app.get("/", (req, res) => {
    res.send("HELLO");
});


app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);


//production
if(process.env.NODE_ENV === 'production'){
   const dirPath = path.resolve()
   app.use(express.static('./client/dist'))
   app.get('*' , (req, res) => {
    res.sendFile(path.resolve(dirPath , './client/dist', 'index.html'))
   })
}


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
