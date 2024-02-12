
const {response,request} = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');


const userGet = async(req = request, res = response) => {
    const {limit = 5,from =0} = req.query;

    const query = {status: true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const userPost = async (req,res = response) => {

    const {name,password,email,role} = req.body;
    const user = new User( {name,password,email,role} );
    
    //Encrypt Password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password,salt);

    //Save to DB
    await user.save(); 

    res.json({
        user
    })
}

const userPut = async(req,res = response) =>{
    const {id} = req.params;

    const {_id, password, email, ...theRest} = req.body;

    //Validate vs DB

    if(password){
        const salt = bcrypt.genSaltSync();
        theRest.password = bcrypt.hashSync(password,salt);
    }
    
    

    const userUpdate =  await User.findByIdAndUpdate(id,theRest);

  


    res.json({
        userUpdate
    })
}

const userPatch = (req,res = response) => {
    res.json({
        msg: 'patch API - Controller'
    })
}
const userDelete = async(req,res = response) => {

    const {id} =req.params;

    const authenticatesUser = req.user;

    //Permanent Delete NOT TO USE
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {status: false});



    res.json({
        user,
        authenticatesUser
    })
}




module.exports = {
    userGet,
    userDelete,
    userPatch,
    userPost,
    userPut
}