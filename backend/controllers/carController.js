import fs from 'fs'
import carModel from '../models/carModel.js'
const add_car = async (req, res) => {
    try {
        const {title, description, dealer, company, car_type } = req.body
        const car = new carModel({
            title, description, dealer, company, car_type,
            images: req.files.map(file => file.filename)
        })
        await car.save()
        res.json({ success: true, message: 'Car Added' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

const update_car = async(req,res)=>{
    try {
        const carId = req.params.id;
        const {title, description, dealer, company, car_type } = req.body
        console.log(req.files)
        const car = await carModel.findOne({_id:carId})
        if(!car){
            return res.json({success:false,message:"Car not found"})
        }
        car.title = title || car.title
        car.description = description || car.description
        car.dealer = dealer || car.dealer
        car.company = company || car.company
        car.car_type = car_type || car.car_type
        console.log(req.files);
        if(req.files.length>0){
            car.images = req.files.map(file=>file.filename)
        }
        await car.save()
        res.json({ success: true, message:"Car details updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
const car_list = async (req, res) => {
    try {
        const cars = await carModel.find({})
        res.json({success:true,cars})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
const remove_car = async (req, res) => {
    const{id} = req.body
    try {
        const car = await carModel.findById(id)

        // Iterate over the images array and unlink each file
        car.images.forEach((image) => fs.unlink(`uploads/${image}`,()=>{}) ) //it is used to remove image from uploads
        
        await carModel.findByIdAndDelete(id)
        res.json({success:true,message:"Car removed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const single_car = async(req,res)=>{
    try {
        const {carId} = req.body
        const car = await carModel.findById(carId)
        res.json({success:true,car})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}
export { add_car,update_car, car_list, remove_car,single_car }
