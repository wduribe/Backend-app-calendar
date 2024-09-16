const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields.js');
const { isDate } = require('../helpers/isDate.js');
const { validateJWT } = require('../middlewares/validate-jwt.js');
const { getEvents, createEvent, updateEvent, deleteEvent, } = require('../controllers/events-controller.js');

const router = Router();

{/*
    Event Routes
    /api/events    
*/}

router.use( validateJWT );

router.get( '/', getEvents );

router.post(
    '/', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Invalid start date').custom( isDate ),
        check('end', 'Invalid end date').custom( isDate ),
        check('notes', 'Notes is required').not().isEmpty(),
        validateFields,
    ],
    createEvent );

router.put( '/:id', updateEvent );

router.delete( '/:id', deleteEvent );

module.exports = router;