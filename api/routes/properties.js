const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const Property = require('../models/property');
const User = require('../models/user');
const VisitingList = require('../models/visitingList');
const mongoose = require('mongoose');
const config = require('../../config/config.json')['global']

//creating property
router.post('/', checkAuth, (req, res, next) => {
    console.log("yoyo");
    if (req.body.images < 5)
        return res.status(400).json({
            message: 'Not enough photos'
        });

    // if (!(config.locations.includes(req.body.location)))
    //     return res.status(400).json({
    //         message: 'Location not recognized'
    //     });


    const property = new Property({
        _id: new mongoose.Types.ObjectId(),
        owner: req.body.owner,
        address: req.body.address,
        createdAt: new Date().toString(),
        images: req.body.images,
        deleted: false,
        rent: req.body.rent,
        numWashrooms: req.body.numWashrooms,
        isAvailable: true,
        numBedrooms: req.body.numBedrooms,
        numOtherRooms: req.body.numOtherRooms,
        type: req.body.type, //one of : HOUSE, APPARTMENT,
        location: req.body.location
    });

    property.save().then(result => {
        res.status(201).json({
            message: 'Created Property successfully',
            createdProperty: {
                address: result.address,
                owner: result.owner,
                _id: result._id

            }
        })
    })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

// GETTING ALL PROPERTIES FROM OWNER WITH :uid
router.get('/ownedby/:uid', checkAuth, (req, res) => {

    if (!req.params.uid) {
        res.status(400).json({
            error: err
        })
        return;
    }

    var uid = req.params.uid;

    Property.find({
        deleted: false
    })
        .populate('owner')
        .exec((err, docs) => {
            if (err) {
                res.status(400).json({
                    error: err,
                    message: 'Something went wrong'
                })
                return;
            }
            res.status(200).json(docs);

        })

})

//VIEWING ALL PROPERTIES
router.get('/', checkAuth, (req, res) => {

    // TODO: PROTECT THIS. ONLY CUSTOMERS!

    var where = {
        deleted: false,
        isAvailable: true
    };

    var rentQuery = {};

    Object.keys(req.query)
        .filter(q => !q.includes('Rent'))
        .forEach(p => {
            if (req.query[p])
                where[p] = req.query[p].replace('%20', ' ');
        });

    if (req.query.maxRent)
        rentQuery.$lte = parseInt(req.query.maxRent)
    if (req.query.minRent)
        rentQuery.$gte = parseInt(req.query.minRent)
    if (Object.keys(rentQuery).length > 0)
        where.rent = rentQuery

    console.log('where', where)

    Property.find(where)
        .populate('owner')
        .exec((err, docs) => {
            if (err) {
                res.status(400).json({
                    error: err
                })
                return;
            }
            res.send(docs);
        })
})

router.get('/locations', checkAuth, (req, res) => {
    Property.find({}, 'location')
        .exec((err, docs) => {
            if (err) {
                res.status(400).json({
                    error: err
                })
                return;
            }
            res.send(docs.map(x => x.location));
        })
})

router.patch('/del/', checkAuth, (req, res) => {

    const where = {
        _id: req.body.pid
    }

    const set = {
        deleted: true
    }

    Property.updateOne(where, { $set: set })
        .exec((err, result) => {
            if (err)
                return res.status(500).json({ error: err })

            VisitingList.updateMany({ list: [req.body.pid] }, { $pullAll: { list: [req.body.pid] } })
                .exec((err, updateRes) => {

                    if (err)
                        return res.status(500).json({ error: err })
                    return res.status(200).json({
                        message: "Successfully deleted property"
                    })
                })

        })

})

router.patch('/:pid', checkAuth, (req, res, next) => {

    const where = {
        _id: req.params.pid
    }


    Property.updateOne(where, { $set: req.body })
        .exec((err, result) => {
            if (err)
                return res.status(500).json({
                    error: err
                })
            return res.status(200).json({
                message: "Successfully updated property"
            })
        })

})

router.post('/test/', (req, res, next) => {
  var imgur = [
    "https://i.imgur.com/1S6QQj7.jpg",
    "https://i.imgur.com/SUk3FQK.jpg",
    "https://i.imgur.com/pP1a1xT.jpg",
    "https://i.imgur.com/PydX2sh.jpg",
    "https://i.imgur.com/1JsS7n9.jpg"
  ];
var promiseArr = [];

for (var i = 0; i < 50; i++){

  promiseArr.push(new Promise((resolve, reject) => {
    const imgurCutOff = Math.round(Math.random() * 5);
    const property = new Property({
        _id: new mongoose.Types.ObjectId(),
        owner: req.body.owner,
        address: i.toString()  + ' Random Street',
        createdAt: new Date().toString(),
        images: imgur.slice(Math.random(imgurCutOff, imgur.length)).concat(imgur.slice(0, imgurCutOff)),
        deleted: false,
        rent: Math.floor(Math.random() * 5000),
        numWashrooms: Math.floor(Math.random() * 10),
        isAvailable: true,
        numBedrooms: Math.floor(Math.random() * 10),
        numOtherRooms: Math.floor(Math.random() * 10),
        type: (['HOUSE', 'APPARTMENT'])[Math.round(Math.random())], //one of : HOUSE, APPARTMENT,
        location: (['TORONTO, ON', 'MONTREAL, QC', 'OTTAWA, ON'])[Math.round(Math.random() * 2)]
    });

    property.save()
    .then(result => {
      resolve()
    })
    .catch(err => {
        reject()
    });
  }))

  Promise.all(promiseArr).then(
    (x) => {res.send(201).json({message: 'Success'})}
  )
 }
})



module.exports = router;
