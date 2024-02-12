const { request, response } = require("express");


const isAdminRole = (req=request, res = response, next) => {
    
    if(!req.user){
        return res.status(500).json({
            msg: 'Need to verify token first'
        })
    }

    const {role,name} = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} is not an administrator`
        })
    }


    next();
}

const hasRole = ( ...roles ) => {

    return (req=request, res = response, next) => {
        if(!req.user){
            return res.status(500).json({
                msg: 'Need to verify token first'
            })
        }

        if(!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `The service need one of the following roles: ${roles}`
            });
        }

        
        next();
    }

}

module.exports = {
    isAdminRole,
    hasRole
}