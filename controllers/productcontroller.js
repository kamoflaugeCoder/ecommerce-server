let express = require('express')
let router = express.Router()
const validateSession = require('../middleware/validate-session')

const Product = require('../db').import('../models/product')
const UserProduct = require('../db').import('../models/userProduct')

/* **************************
 ***** PRODUCT CREATE ***
 **************************** */
router.post('/create', validateSession,  (req, res) => {
    const productEntry = {
        // id: req.body.product.id,
        category: req.body.product.category,
        description: req.body.product.description,
        image: req.body.product.image,
        price: req.product.price,
        title: req.product.title,
        amount: req.product.amount
    }
    Product.create(productEntry)
        .then(product => res.status(200).json(product))
        .catch(err => res.status(500).json({ error: err }))
});

/* ***************************************
 ***GET ALL ENTRIES ***
 *************************************** */
router.get("/", (req, res) => {
    Product.findAll()
        .then(product => res.status(200).json(product))
        .catch(err => res.status(500).json({ error: err }))
});

/* ************************
 ***GET ENTRIES BY USER***
 ************************* */
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Product.findAll({
        where: { owner: userid }
    })
        .then(product => res.status(200).json(product))
        .catch(err => res.status(500).json({ error: err }))
});


// // EDIT CONTROLER
router.put("/edit/:entryId", validateSession, function (req, res) {
    const editProduct = {
        id: req.body.product.id,
        category: req.body.product.category,
        description: req.body.product.description,
        image: req.body.product.image,
        price: req.product.price,
        title: req.product.title,
        amount: req.product.amount
    };
    const query = { where: { id: req.params.entryId, owner: req.user.id } }
    product.update(editproduct, query)
        .then((product) => res.status(200).json(product))
        .catch((err) => res.status(500).json({ error: err }))
})

// DELETE CONTROLLER 
router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    product.destroy(query)
        .then(() => res.status(200).json({ message: "Product Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }))
})

module.exports = router