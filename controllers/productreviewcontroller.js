let express = require('express')
let router = express.Router()
const validateSession = require('../middleware/validate-session')

const Review = require('../db').import('../models/review')

//     * **************************
//  *****PRODUCT REVIEW CREATE ***
//  **************************** * /
router.post('/create', validateSession, (req, res) => {
    const productReview = {
        name: req.review.name,
        description: req.body.review.description,
        rating: req.body.review.rating,
        comments: req.body.review.comments,
        owner: req.user.id
    }
    Review.create(productReview)
        .then(review=> res.status(200).json(review))
        .catch(err => res.status(500).json({ error: err }))
});

/* ***************************************
 ***GET ALL ENTRIES ***
 *************************************** */
router.get("/", (req, res) => {
    Beer.findAll()
        .then(reviews => res.status(200).json(reviews))
        .catch(err => res.status(500).json({ error: err }))
});

/* ************************
 ***GET ENTRIES BY USER***
 ************************* */
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    review.findAll({
        where: { owner: userid }
    })
        .then(reviews => res.status(200).json(reviews))
        .catch(err => res.status(500).json({ error: err }))
});


// EDIT CONTROLER
router.put("/edit/:entryId", validateSession, function (req, res) {
    const editReview= {
        description: req.body.review.description,
        rating: req.body.review.rating,
        comments: req.body.review.comments,
        owner: req.user.id
    };
    const query = { where: { id: req.params.entryId, owner: req.user.id } }
    Review.update(editReview, query)
        .then((review) => res.status(200).json(review))
        .catch((err) => res.status(500).json({ error: err }))
})

// DELETE CONTROLLER 
router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    Review.destroy(query)
        .then(() => res.status(200).json({ message: "Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }))
})



module.exports = router