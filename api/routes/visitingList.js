const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const Property = require('../models/property');
const User = require('../models/user');
const VisitingList = require('../models/visitingList');
const mongoose = require('mongoose');

router.post('/',  (req, res, next) =>{

    const userId = req.body.userId;
    const propertyId = req.body.propertyId;
    const property = null;

    var userCheckPromise = new Promise((resolve, reject) => {
        User
        .findById(userId)
        .exec()
        .then(user =>{
            if(!user){
                reject('User not found');
            }  
            //user = docs[0];
            console.log(user)
            resolve(user);
        })
        .catch(err => {
            reject("User not found");
        });
    })

    var propertyCheckPromise = new Promise((resolve, reject) => {

        Property
        .findById(propertyId)
        .exec()
        .then(prop =>{
            if(!prop) {
                reject('Property not found');
            }
            //property = prop[0];
            console.log(prop);
            resolve(prop);
        })
        .catch(err => {
            reject('Property not found');
        });
    })

    Promise.all([userCheckPromise, propertyCheckPromise])
    .then(results => {
        
        if(results[1].rent > results[0].maxRent){
            res.status(400).json({
                message: "Cannot add property. Maximum allowed rent is exceeded"
            });
        }
        VisitingList
        .find({
            customerId: userId 
        })
        .exec((err,docs) =>{
            if (err)
                throw new Error('Visiting List Error')
            if(docs.length == 0){
                const vList = new VisitingList({
                    _id : new mongoose.Types.ObjectId(),
                    customerId : userId,
                    list: [propertyId]
                });



                vList.save().then(result => {

                    res.send({
                        message : 'Property added to visiting list successfully',
                        Property : {
                            address : result.address,
                            id: propertyId
                        }
                    })
                })
            }else{
                const vl = docs[0];
                vl.list.push(propertyId);
                VisitingList.updateOne({customerId : userId}, {$set : vl})
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            result: vl
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error : err
                        });
                
                    });
            }
        });
    })
    .catch(err => res.status(400).json({message: err}))

    
    
        
    

});

router.get('/get?:userid', checkAuth, (req, res, next) =>{
});


module.exports = router;