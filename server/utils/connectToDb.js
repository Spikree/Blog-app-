import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_STRING);
        console.log("mongoDb connected");
    } catch (error) {
        console.log("error connecting to mongoDb");
    }
}

export default connectToDb;