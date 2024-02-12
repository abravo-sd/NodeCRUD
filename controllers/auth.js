const {response} = require ('express');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req,res = response) => {
    const {email,password} =req.body;

    try{
        //verify if Email Exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'Email or Password are not valid - email'
            });
        }
        //Verify is User Active
        if(!user.status){
            return res.status(400).json({
                msg: 'Email or Password are not valid - status'
            });
        }
        //Verify is password ok
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Email or Password are not valid - password'
            });
        }    
        //Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong'}
        )
    }



    
}

module.exports = {
    login
}



