const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const Property = require('../models/property');
const User = require('../models/user');
const mongoose = require('mongoose');

router.post('/', checkAuth, (req, res, next) =>{

    const property = new Property({
        _id : new mongoose.Types.ObjectId(),
        owner : req.body.owner,
        address : req.body.address,
        isAvailable: req.body.isAvailable,
        createdAt: new Date().toString(),
        leasedTo: req.body.leasedTo
    });

    property.save().then(result => {
        console.log(result);
        res.status(201).json({
            message : 'Created Property successfully',
            createdProperty : {
                address : result.address,
                isAvailable : result.isAvailable,
                owner: result.owner,
                _id : result._id
                
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

// GETTING ALL PROPERTIES FROM OWNER WITH :uid
router.get('/ownedby?:uid', checkAuth, (req, res) => {

    if (!req.params.uid){
        res.status(400).json({
            error: err
        })
        return;
    }

    var uid = req.params.uid;

    Property.find({
        owner: mongoose.Types.ObjectId(uid)
    })
    .populate('owner')
    .exec((err, docs) => {
        if (err) {
            res.status(400).json({
                error: err
            })
            return;
        }

        res.send(docs.data);

    })

})

//VIEWING ALL PROPERTIES
router.get('/properties', checkAuth, (req, res) => {
    Property.find({

    })
    .populate('owner')
    .exec((err, docs) => {
        if (err) {
            res.status(400).json({
                error: err
            })
            return;
        }
        res.send(docs.data);
    })
})

router.get('locations', checkAuth, (req, res) => {
    Property.find({}, 'address')
    .exec((err, docs) => {
        if (err) {
            res.status(400).json({
                error: err
            })
            return;
        }
        res.send(docs.data.map(x => x.address));
    })
})



module.exports = router;