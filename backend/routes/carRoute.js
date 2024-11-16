import express from 'express'
import { add_car, car_list, remove_car, single_car, update_car } from '../controllers/carController.js'
import multer from 'multer'
import authMiddleware from '../middlewares/auth.js'

const carRouter = express.Router()

//Image Storage Engine
const storage = multer.diskStorage({
    destination:"uploads",    //images will be stored in uploads folder
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})
carRouter.post('/add',upload.array('images',10),add_car)
carRouter.get('/list',car_list)
carRouter.post('/remove',remove_car)
carRouter.post('/single',single_car)
carRouter.put('/update/:id',upload.array('images',10),update_car)

export default carRouter