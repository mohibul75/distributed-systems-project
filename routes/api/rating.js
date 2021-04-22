const express = require('express');

const router = express.Router();
const Rating = require('../../models/rating');

router.post('/rating', (req, res) => {
    
    const rating = new Rating({
        driverName:req.body.driverName,
        rating: req.body.rating
    });

    rating.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});

module.exports = router;