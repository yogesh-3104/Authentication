import mongoose from "mongoose";

const connectToMongo=()=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectToMongo;
