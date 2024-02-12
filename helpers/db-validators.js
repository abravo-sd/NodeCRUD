const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '')=> {
    const roleExists = await Role.findOne({role});
    if(!roleExists){
        throw new Error('Role not defined on the Database');
    }
}

const emailExists = async(email = '') => {
    const verifyEmail = await User.findOne({email});
    if( verifyEmail){
        throw new Error(`Email: ${email}  Already Exists in System`);
    }

}
const userExistsById = async(id) => {
    const userExist = await User.findById( id );
    if( !userExist){
        throw new Error(`Id: ${id} is not a Valid Id`);
    }

}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById
}
