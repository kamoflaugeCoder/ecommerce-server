let express = require('express')
let router = express.Router()
const validateSession = require('../middleware/validate-session')

const Beer = require('../db').import('../models/beer')

//     * **************************
//  ***** BEER CREATE ***
//  **************************** * /
router.post('/create', validateSession, (req, res) => {
    const beerEntry = {
        name: req.body.beer.name,
        type: req.body.beer.type,
        rating: req.body.beer.rating,
        comments: req.body.beer.comment,
        owner: req.user.id
    }
    Beer.create(beerEntry)
        .then(beer => res.status(200).json(beer))
        .catch(err => res.status(500).json({ error: err }))
});

/* ***************************************
 ***GET ALL ENTRIES ***
 *************************************** */
router.get("/", (req, res) => {
    Beer.findAll()
        .then(beers => res.status(200).json(beers))
        .catch(err => res.status(500).json({ error: err }))
});

/* ************************
 ***GET ENTRIES BY USER***
 ************************* */
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Beer.findAll({
        where: { owner: userid }
    })
        .then(beers => res.status(200).json(beers))
        .catch(err => res.status(500).json({ error: err }))
});


// EDIT CONTROLER
router.put("/edit/:entryId", validateSession, function (req, res) {
    const editBeer = {
        name: req.body.beer.name,
        type: req.body.beer.type,
        rating: req.body.beer.rating,
        comments: req.body.beer.comments,
    };
    const query = { where: { id: req.params.entryId, owner: req.user.id } }
    Beer.update(editBeer, query)
        .then((beers) => res.status(200).json(beers))
        .catch((err) => res.status(500).json({ error: err }))
})

// DELETE CONTROLLER 
router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    Beer.destroy(query)
        .then(() => res.status(200).json({ message: "Beer Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }))
})

module.exports = router