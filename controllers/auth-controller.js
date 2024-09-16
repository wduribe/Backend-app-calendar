const User = require('../models/user-model.js');
const bcrypt = require('bcryptjs');;
const { generateJWT }  = require('../helpers/jwt.js');


const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Validate if user is already
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                message: 'User is already'
            });
        }

        user = new User(req.body);
        //Encriptando contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Creating user
        await user.save();

        //Creating JWT
        const token = await generateJWT( user._id, user.name );
        
        return res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token,
            message: 'User created successfully',
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Ups...',
        });
    }

}

const loginUser = async (req, res) => {
    
    
    try {
        const { email, password } = req.body;
        //Confirm email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Email or password invalid'
            });
        }

        //Confirm password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Email or password invalid'
            });
        }
        //Generate JWT
        const token = await generateJWT( user._id, user.name );
        return res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'One error has ocurred',
        });
    }


}

const revalidateToken = async (req, res) => {
    
    const { uid, name } = req;
    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        name,
        uid,
        token,
    });
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken,
}