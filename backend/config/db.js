import mongoose from "mongoose";

const connectToMongo=()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/userAuth");
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectToMongo;
