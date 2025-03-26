import mongoose from "mongoose";
import dotenv from "dotenv";

const URI = "mongodb+srv://LMS:NpVaXyPBCW7h6LEk@cluster0.fehtf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log("error occured", error); 
    }
}
export default connectDB;