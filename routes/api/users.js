const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//Load user model
const User = require('../../models/users');

// @route   GET api/users/test
// @desc    Tests users route
// @access  public
router.get('/test', (req, res) => res.json({msg: "Users works"}));

// @route   POST api/users/register
// @desc    Register user
// @access  public
router.post('/register', (req, res)=> {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({email: 'Email already exists'});
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s:'200', //size
                    r: 'pg', //rating
                    d: 'mm' //default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user =>res.json(user))
                            .catch(err => console.log(err)); 
                    })
                    if(err) throw err;
                })
            }
        })
});

// @route   POST api/users/login
// @desc    Login user / returning JWT Token
// @access  public
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({email})
        .then(user => {
            //Check for user existence
            if(!user) {
                return res.status(404).json({email: 'User not found'});
            }

            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                       //User matched
                        const payload = { id: user.id, name: user.name, avatar: user.avatar} 
                       //Sign Token
                       jwt.sign(
                           payload, 
                           keys.secretOrKey, 
                           { expiresIn: 3600 }, 
                           (err, token) => {
                               res.json({
                                   success: true,
                                   token: 'Bearer ' + token,
                               })
                             }
                        );
                    } else {
                        return res.status(400).json({passwor: 'Password incorrect'});
                    }
                })
        })
})
module.exports = router;