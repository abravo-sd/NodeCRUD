
const {Router} = require('express');
const {check} = require('express-validator');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/users');
const { isValidRole, emailExists,userExistsById } = require('../helpers/db-validators');

const {validateFields,validateJWT,isAdminRole,hasRole } = require('../middlewares')


const router = Router();

router.get('/', userGet);

router.put('/:id',[
    check('id','This is not a Valid Id').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isValidRole),
    validateFields

], userPut);


router.post('/', [
    check('name','Name is Empty').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExists),
    check('password','Password is Empty').not().isEmpty(),
    //check('role', 'Not a Valid Role').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
], userPost);


router.delete('/:id', 
    validateJWT,
    //isAdminRole,
    hasRole('ADMIN_ROLE'),
    check('id','This is not a Valid Id').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
,userDelete);

router.patch('/', userPatch);


module.exports = router
