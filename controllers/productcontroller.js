let express = require('express');
let router = express.Router();
const validateSession = require('../middleware/validate-session');

const Product = require('../db').import('../models/product');
const Cart = require('../db').import('../models/cart');
const Review = require('../db').import('../models/review');

// FETCH HERE======

// fetch('https://fakestoreapi.com/products')
// .then(res=>res.json())
// .then(json=>console.log(json))

/* **************************
 ***** PRODUCT CREATE ***
 **************************** */
router.post('/create', validateSession, (req, res) => {
	const productEntry = {
		// id: req.body.product.id,
		category    : req.body.product.category,
		title       : req.body.product.title,
		description : req.body.product.description,
		image       : req.body.product.image,
		price       : req.body.product.price,
		amount      : req.body.product.amount
	};
	Product.create(productEntry)
		.then((product) => res.status(200).json(product))
		.catch((err) => res.status(500).json({ error: err }));
});

/* ***************************************
 ***GET ALL ENTRIES ***
 *************************************** */
router.get('/', (req, res) => {
	Product.findAll({
		include : Review
	})
		.then((product) => res.status(200).json(product))
		.catch((err) => res.status(500).json({ error: err }));
});

/* ************************
 ***GET ENTRIES BY USER***
 ************************* */
router.get('/mine', validateSession, (req, res) => {
	let userid = req.user.id;
	Product.findAll({
		where : { owner: userid }
	})
		.then((product) => res.status(200).json(product))
		.catch((err) => res.status(500).json({ error: err }));
});

// // EDIT CONTROLER
router.put('/edit/:id', validateSession, function(req, res) {
	const editProduct = {
		category    : req.body.category,
		description : req.body.description,
		image       : req.body.image,
		price       : req.body.price,
		title       : req.body.title,
		amount      : req.body.amount
	};
	const query = { where: { id: req.params.id } };
	Product.update(editProduct, query)
		.then((product) => res.status(200).json(product))
		.catch((err) => res.status(500).json({ error: err }));
});

// DELETE CONTROLLER
// router.delete("/:id", validateSession, function (req, res) {
//     const query = { where: { id: req.params.id, owner: req.user.id } };

//     Product.destroy(query)
//         .then((product) => res.status(200).json({ message: "Product Entry Removed", product:product }))
//         .catch((err) => res.status(500).json({ error: err }))
// })
router.delete('/:id', (req, res) => {
	Product.destroy({
		where : {
			id : req.params.id
		}
	})
		.then((product) =>
			res.status(200).json({
				product : product
			})
		)
		.catch((err) =>
			res.status(500).json({
				error : err
			})
		);
});

module.exports = router;
