let express = require('express')
let router = express.Router()
const validateSession = require('../middleware/validate-session')

// const Product = require('../db').import('../models/cart')
const Cart = require('../db').import('../models/cart')

/* **************************
 ***** ADD PRODUCT TO CART ***
 **************************** */
router.post('/create', validateSession,  (req, res) => {
    const cartEntry = {
        userId: req.user.id,
        productId: req.body.cart.productId,
        quantity: req.body.cart.quantity,
    }
    Cart.create(cartEntry)
        .then(cart => res.status(200).json(cart))
        .catch(err => res.status(500).json({ error: err }))
});

//  * ***************************************
//  ***ADD A PRODUCT ***
//  *************************************** */
// router.put('/addproduct/:id', validateSession, function (req, res) {  
//     const addProduct = {

//        userId: req.body.cart.userId,
//         productId: req.body.cart.productId,
//         quantity: req.body.cart.quantity
//     };

/* ************************
 ***GET ENTRIES BY USER***
 ************************* */
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Cart.findAll({
        where: { owner: userid }
    })
        .then(cart => res.status(200).json(cart))
        .catch(err => res.status(500).json({ error: err }))
});


// EDIT CONTROLER
router.put("/edit/:entryId", validateSession, function (req, res) {
    const editCart = {
        userId: req.body.cart.userId,
        productId: req.body.cart.productId,
        quantity: req.body.cart.quantity,
    };
     
    const query = { where: { id: req.params.entryId, owner: req.user.id } }
    Cart.update(editcart, query)
        .then((cart) => res.status(200).json(cart))
        .catch((err) => res.status(500).json({ error: err }))
})

// DELETE CONTROLLER 
router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    Cart.destroy(query)
        .then(() => res.status(200).json({ message: "Product Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }))
})

module.exports = router