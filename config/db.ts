import mongoose from "mongoose"

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI||'')
        console.log(`Mongo Connected!! ${conn.connection.host}`)
    } catch (error:any) {
        console.log({message:error.message})
        process.exit(1)
    }
}

export default connectDB