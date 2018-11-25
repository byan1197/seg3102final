const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post('/signup', (req, res, next) => {

    User.find({email : req.body.email})
        .exec()
        .then(user => { 
            if (user.length > 0){
                console.log(user);
                return res.status(409).json({
                    message : "email exists"
                });
            } else{
                const hash = bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err){
                        return res.status(500).json({
                            error : err
                        });
                    }else{
                        const user = new User({
                            _id : new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password : hash,
                            type : req.body.type,
                            name: req.body.name
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message : 'user created'
                                });
                            })
                            .catch(err =>{
                                console.log(err);
                                res.status(500).json({
                                    error : 'invalid email entered'
                                })
                            })
                }
            });
        }
    });  
});

router.get('/', (req, res, next) => {
    User.find()
        .select('_id email type name')
        .then( docs =>{
            const response = {
                length : docs.length,
                users : docs.map(user => {
                    return{
                        _id : user._id,
                        email : user.email,
                        name: user.name,
                        type: user.type,
                        name: user.name
                    };
                })
            }
            res.status(200).json(response);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error : err
            })
        })
})

router.delete('/:userId', (req, res, next) => {
    User.deleteOne({_id : req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message : 'User successfully deleted',
                userId : req.body.userId
            });
        })
        .catch( err => {
            res.status(500).json({
                error : err
            })
        })
});

router.post('/login', (req, res, next) =>{
    User.find({email : req.body.email})
        .exec()
        .then( user => {
            if(user.length < 1){
                res.status(401).json({
                    message : 'Auth failed'
                });
            }else{
                bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
                    if(err || !result){
                        res.status(401).json({
                            message: 'Auth failed'
                        });
                    }else{
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        "secret", 
                            {
                                expiresIn : "1h"
                            }
                        );
                        res.status(200).json({
                            message: 'Login Successful',
                            token : token
                        });
                    }
                    
                });
            }
        })
        .catch(err =>{
            res.status(500).json(err);
        })
})
module.exports = router;