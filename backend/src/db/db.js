import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`) 
        //if you forgot to add yout db name, it will automatically add test(dbName) by default
        console.log(`\n mongoDB connected !! dbHost: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("\n db.js catch mongodb error", error);
        process.exit(1)
    }
}

