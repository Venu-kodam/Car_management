import jwt from 'jsonwebtoken'
const authMiddleware = async(req,res,next)=>{
    const {token} = req.headers
    if(!token){
        return res.json({success:false,message:"Not authorized to Login"})
    }
    try {          //decode the token
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}
export default authMiddleware