const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth-controller.js');
const { validateFields } = require('../middlewares/validate-fields.js');
const { validateJWT } = require('../middlewares/validate-jwt.js');

//Creando instancia
const router = Router();

{/*
    Event Routes
    //api/auth    
*/}


router.post( 
    '/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password must be longer than 6 characters').isLength({ min: 6 }), 
        validateFields
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Pasword is required').not().isEmpty(),
        check('password', 'Password must be longer than 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    loginUser
);

router.get('/renew',validateJWT ,revalidateToken);


module.exports = router;