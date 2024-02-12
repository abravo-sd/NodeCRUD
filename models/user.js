const {Schema, model} = require('mongoose')

const UserSchema = Schema({
    name:{
        type: String,
        required:[true, 'Name is Required']
    },
    email:{
        type: String,
        required:[true, 'email is Requires'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'email is required']
    },
    role:{
        type:String,
        emun: ['ADMIN_ROLE','USER_ROLE'],
        
    },
    status:{
        type:Boolean,
        default: true
    }
});


UserSchema.methods.toJSON = function() {
    const {__v, password,_id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}




module.exports = model( 'User', UserSchema);
