import mongoose from "mongoose"

const ConnectDB = async(req,res)=>{
    mongoose.connection.on('connected',()=>console.log("DB Connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/Cars`)
}
export default ConnectDB