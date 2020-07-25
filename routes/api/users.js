const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const User = require('../../models/user');
const jwt = require('jsonwebtoken')
const config = require('config');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// @route       GET api/users
// @desc        Register route
// @access      Public 
router.post('/', 
    [
        body('name', 'Name is required')
            .notEmpty(),
        body('email', 'Please include a valid email')
            .isEmail(),
        body('password', 'Please enter a password with 6 or more characters')
            .isLength({min: 4})
            .isString()
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        // console.log(req.body);
        const {name, email, password} = req.body;

        try {
            let user = await User.findOne({ email })
            // user exits
            if (user) {
                return res.status(400).json({errors: [{msg: 'User already exists'}]});
            }

            // Get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            })

            console.log(name, email, avatar, password);
            
            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                {expiresIn: 360000},
                (err, token) => {
                    if(err) throw err;
                    res.json({token});
                }
            );

        } catch(err) {
            console.log(err.message);
            res.status(500).send('server error');
        }
    }

);

module.exports = router;