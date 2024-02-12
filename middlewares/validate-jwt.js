const { response } = require('express')
const User = require('../models/user')

const jwt = require('jsonwebtoken')
 
const validateJWT = async (req = request,res=response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No Token in request'
        });
    }

    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'Token not Valid - User not found'
            });
        }

        //check if user is Active

        if(!user.status){
            return res.status(401).json({
                msg: 'Token not Valid - User not found or deleted'
            });
        }

        req.user = user
        

        next();
    }catch(error){

        console.log(error);
        res.status(401).json({
            msg: 'Token not valid'
        });
    }

    

    

}


module.exports = {
    validateJWT
}