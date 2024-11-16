import mongoose from "mongoose";

const carSchema = new  mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    images:{type:Array,required:true},
    car_type:{type:String,required:true},
    company:{type:String,required:true},
    dealer:{type:String,required:true},
})
const carModel = mongoose.models.cars || mongoose.model('cars',carSchema)
export default carModel