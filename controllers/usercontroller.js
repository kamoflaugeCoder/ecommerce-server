const router = require('express').Router();

const User = require('../db').import('../models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/*  -------  USER SIGNUP  ---------  */
router.post('/create', function(req, res) {
	console.log('req body', req.body);

	User.create({
		email: req.body.user.email,
		password: bcrypt.hashSync(req.body.user.password, 13),
        userRole: req.body.user.userRole
	})
		.then(function createSuccess(user) {
			let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

			res.json({
				user         : user,
				message      : 'User successfully created!',
				sessionToken : token
			});
		})
		.catch((err) => res.status(500).json({ error: err }));
});

/*  -------  USER LOGIN  ---------  */
router.post('/login', function(req, res) {
	User.findOne({
		where : {
			email : req.body.user.email
		}
	})
		.then(function loginSuccess(user) {
			if (user) {
				bcrypt.compare(req.body.user.password, user.password, function(err, matches) {
					if (matches) {
						let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

						res.status(200).json({
							user         : user,

							message      : 'User successfully logged in!',

							sessionToken : token
						});
					} else {
						res.status(502).send({ error: 'Login failed' });
					}
				});
			} else {
				res.status(500).json({ error: 'User does not exist.' });
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
});

// const isAuth = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (token){
//         const onlyToken = token.slice(7, token.length);
//         jwt.verify(onlyToken, config.JWT_SECRET, {err, decode} => {
//             if (err) {
//                 return res.status(401).send({msg: 'Invalid Token'});
//             }
//             req.user = token;
//         })
//     }
// }

module.exports = router;

// let express = require('express')
// let router = express.Router();
// //let jwt = require('..db').import {  } from "module/user";

// router.post('/register', function (req, res) {

//     //req.body.username
//     //req.body.password
//     // console.warn('req.body', req.body)
//     // User.register({
//     //     email: ""
//     //     password: ""
//     // })
//     // .then (
//     res.send('POST request to Beer Wingman for register endpoint');
//   });

//   router.post('/login', function (req, res) {

//     res.send('POST request to Beer Wingman for login endpoint');
//   });
// module.exports = router;
