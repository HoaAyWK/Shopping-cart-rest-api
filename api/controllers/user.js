const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { validation } = require('../validation');

module.exports.postLogin = async (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(500).json({message: error.details[0].message});
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(404).json({message: 'Auth failed'});
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(500).json({message: 'Auth failed'});
        const token = jwt.sign(
        {
            email: user.email,
            userId: user._id
        },
        process.env.JWT_KEY,
        {
            expiresIn: '1h'
        });
        res.status(200).json({message: 'Auth successful', token: token});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

module.exports.createNewUser = async (req, res) =>  {
    const { error } = validation(req.body);
    if (error) return res.status(500).json({message: error.details[0].message});
    try {
        const emailExist = await User.findOne({email: req.body.email});
        console.log(emailExist);
        if (emailExist) {
            return res.status(409).json({messae: 'Email already exists'});
        } else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                email: req.body.email,
                password: hashedPassword
            });
            const saveUser = await user.save();
            res.status(201).json({message: 'Create user successful'});
        }
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

module.exports.deleteUser = async (req, res) => {
    const id = req.params.userId;
    try {
        const result = await User.deleteOne({_id: id});
        if (result.n > 0) {
            res.status(200).json({message: 'User deleted'});
        } else {
            res.status(400).json({message: 'User not found'});
        }
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};