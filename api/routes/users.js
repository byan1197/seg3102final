const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check_auth');

router.post('/signup', /*checkAuth,*/ (req, res, next) => {

    User.find({
        username: req.body.username
    })
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json({
                    message: "username exists"
                });
            } else {
                const hash = bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            type: req.body.type,
                            name: req.body.name,
                            lastName : req.body.lastName,
                            username: req.body.username,
                            maxRent: 400
                        });
                        user
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    success: 'user created'
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: 'invalid email entered'
                                })
                            })
                    }
                });
            }
        });
});

//GET ALL USERS
router.get('/', (req, res, next) => {
    User.find()
        .select('_id email type name')
        .then(docs => {
            const response = {
                length: docs.length,
                users: docs.map(user => {
                    return {
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        type: user.type,
                        name: user.name
                    };
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.get('/&uid=:uid', checkAuth, (req, res, next) => {
    
    User.findById({_id: req.params.uid}).exec((err, u) => {
        if(err)
            return res.status(500).json({message: 'Could not find user'})
        res.status(201).json(u)
    })
})

router.delete('/:uid', checkAuth, (req, res, next) => {
    console.log("here")
    User.deleteOne({ _id: req.params.uid })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User successfully deleted',

            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.post('/login', (req, res, next) => {
    console.log("here")
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({
                    message: 'Auth failed'
                });
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err || !result) {
                        res.status(401).json({
                            message: 'Auth failed'
                        });
                    } else {
                        const token = jwt.sign({
                            username: user[0].username,
                            userId: user[0]._id
                        },
                            "secret",
                            {
                                expiresIn: "1h"
                            }
                        );
                        res.status(200).json({
                            message: 'Login Successful',
                            token: token,
                            uid: user[0]._id,
                            type: user[0].type
                        });
                    }

                });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.patch('/uid=:uid', (req, res, next) => {
    userId = req.params.uid
    //console.log("here");
    const where = {
        _id: userId
    }
    console.log(req.body.ogpassword);
    User.findById({_id: userId}).exec((err, u) => {
        bcrypt.compare(req.body.ogpassword, u.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({
                    message: 'Incorrect Password'
                });
            }

            const hash = bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
            set= {};
            set = {
                email : req.body.email,
                password : hash
            }

            User.updateOne(where, { $set: set })
                .exec((err, result) => {
                    if (err)
                        return res.status(500).json({
                            error: err
                        })
                    return res.status(200).json({
                        email : req.body.email
                        
                    })
                })
                
    })
    

        })
    
    })
})
module.exports = router;