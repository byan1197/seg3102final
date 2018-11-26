const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const Property = require('../models/property');
const User = require('../models/user');
const mongoose = require('mongoose');

//creating property
router.post('/', checkAuth, (req, res, next) =>{

    if (req.body.images < 5)
        return res.status(400).json({
            message: 'Not enough photos'
        });


    const property = new Property({
        _id : new mongoose.Types.ObjectId(),
        owner : req.body.owner,
        address : req.body.address,
        isAvailable: req.body.isAvailable,
        createdAt: new Date().toString(),
        leasedTo: req.body.leasedTo,
        images: req.body.images
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
    // ?l=:location&bed=:bed&bath=:bath&minrent=:minrent&maxrent=:maxrent&t:=t

    var where = {};
    var rentQuery = {}; 

    console.log(req.query);

    Object.keys(req.query)
    .filter(q => !q.includes('Rent'))
    .forEach(p => {
        console.log('p', p)
        if (req.query[p])
            where[p] = req.query[p]
    });

    if (req.query.maxRent)
        rentQuery.$gte = parseInt(req.query.maxRent)
    if (req.query.minRent)
        rentQuery.$lte = parseInt(req.query.minRent)
    if (rentQuery)
        where.rent = rentQuery

    Property.find(where)
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

router.get('/locations', checkAuth, (req, res) => {
    Property.find({}, 'address')
    .exec((err, docs) => {
        if (err) {
            res.status(400).json({
                error: err
            })
            return;
        }
        res.send(docs.data.map(x => x.location));
    })
})



module.exports = router;