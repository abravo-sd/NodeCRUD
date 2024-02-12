const mongoose = require('mongoose');

const dbConnection = async () =>{
    try{
        await mongoose.connect( process.env.MONGODB_CONN);

        console.log('Connected Successfully to Database');
    }catch(error){
        console.log(error);
        throw new Error('error at Database Error');
    }
}


module.exports ={
    dbConnection
}