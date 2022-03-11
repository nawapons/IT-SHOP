const express = require('express');
const conn = require('../database');
const router = express.Router();
const ifNotLoggedin = require('./tools').ifNotLoggedin;
const ifLoggedin = require('./tools').ifLoggedin;
const {
    getProduct
} = require('./product');
const {
    getProfile
} = require('./profile');
const {
    getUser
} = require('./setUser');
const {
    getBanner
} = require('./Banner');
const async = require('async');
router.get('/register', ifLoggedin, (req, res) => {
    res.render('register');
});
router.get('/login', ifLoggedin, (req, res) => {
    res.render('login');
});
router.get('/', ifNotLoggedin, (req, res) => {

});
router.get('/product', ifNotLoggedin, getProduct, (req, res) => {
    res.render('home');
})
router.get('/profile', ifNotLoggedin, getProfile, (req, res) => {})
router.get('/setUser', ifNotLoggedin, getUser, (req, res) => {
    if (req.session.role != "Admin") {
        res.render('home');
    }
})
router.get('/banner', ifNotLoggedin, (req, res) => {
    if (req.session.role == "Admin") {
        conn.query('SELECT * FROM banner ORDER BY banner_id DESC', (error, result) => {
            if (error) {
                res.redirect('/');
            }
            res.render('admin/banner', {
                banners: result
            })
        })
    } else if (req.session.role == "Emp") {
        conn.query('SELECT * FROM banner ORDER BY banner_id DESC', (error, result) => {
            if (error) {
                res.redirect('/');
            }
            res.render('emp/banner', {
                banners: result
            })
        })
    } else {
        res.render('./home')
    }

})
router.get('/manage', ifNotLoggedin, (req, res) => {
    if (req.session.role == "Admin") {
        conn.query('SELECT * FROM bank', (error, results) => {
            if (error) {
                res.render('./home');
            }
            res.render('admin/manage', {
                banks: results
            })
        })
    } else {
        res.redirect('/');
    }
})
router.get('/cart', ifNotLoggedin, (req, res) => {
    if (req.session.role == "Admin") {
        res.redirect('/');
    } else if (req.session.role == "Emp") {
        res.redirect('/');
    } else {
        const UID = res.locals.UserID
        conn.query('SELECT *,COUNT(cart.product_id) AS product_Count FROM cart INNER JOIN product ON cart.product_id = product.product_id WHERE user_id = ? GROUP BY cart.product_id', [req.session.UserID], (error, result) => {
            if (error) {
                res.redirect('user/product');
            }
            conn.query('SELECT * FROM address WHERE user_id = ?', [UID], (errors, results) => {
                if (errors) {
                    res.redirect('user/product');
                }
                res.render('user/cart', {
                    cartProduct: result,
                    address: results
                })
            })
        })
    }

})
router.get('/payment', ifNotLoggedin, (req, res) => {
    conn.query('SELECT *,COUNT(cart.product_id) AS product_Count FROM cart INNER JOIN product ON cart.product_id = product.product_id WHERE user_id = ? GROUP BY cart.product_id', [req.session.UserID], (error, result) => {
        if (error) {
            res.redirect('user/product');
        }
        conn.query('SELECT * FROM bank',(errors,results)=>{
            if(errors){
                res.redirect('user/product');
            }
            res.render('user/payment', {
                cartProduct: result,
                banks:results
            })
        })
       
    })
})
router.get('/productGrid', getProduct, (req, res) => {
    res.render('include/productGrid');
})
router.get('/home', ifNotLoggedin, (req, res) => {
    if (req.session.role == "Admin") {
        res.render('admin/home')
    } else if (req.session.role == "Emp") {
        res.render('emp/home')
    } else if (req.session.role == "User") {
        conn.query('SELECT product.*,type.* FROM product  LEFT JOIN type ON product.type_id = type.type_id ORDER BY product_quantity ASC LIMIT 4', (error, resultHot) => {
            if (error) {
                res.redirect('/');
            }
            conn.query('SELECT product.*,type.* FROM product  LEFT JOIN type ON product.type_id = type.type_id ORDER BY product_date DESC LIMIT 4', (error, resultNew) => {
                if (error) {
                    res.redirect('/');
                }
                conn.query('SELECT product.*,type.* FROM product  LEFT JOIN type ON product.type_id = type.type_id ORDER BY product_price ASC LIMIT 4', (error, resultAdvice) => {
                    if (error) {
                        res.redirect('/');
                    }
                    conn.query('SELECT * FROM type ORDER BY type_id ASC', (error, typeResults) => {
                        if (error) {
                            res.redirect('home');
                        }
                        conn.query('SELECT * FROM banner ORDER BY banner_id DESC', (error, bannerResults) => {
                            if (error) {
                                res.redirect('/');
                            }
                            res.render('user/home', {
                                Hotproducts: resultHot,
                                Newproducts: resultNew,
                                AdviceProducts: resultAdvice,
                                types: typeResults,
                                banners: bannerResults
                            });
                        })

                    })
                })
            })
        })
    } else {
        res.render('./home')
    }
})
router.get('/order',ifNotLoggedin,(req,res)=>{
        conn.query('SELECT * FROM user INNER JOIN address ON user.user_id=address.user_id',(addressError, addressResult) => {
            if (addressError) {
                res.render('home');
            }
            conn.query('SELECT his.*,SUM(pro.product_price) AS TOTAL_PRICE,COUNT(his.product_id) AS TOTAL_AMOUNT FROM history his INNER JOIN product pro ON his.product_id = pro.product_id  GROUP BY his.history_code ',(hisumError,hissumResult)=>{
                if(hisumError){
                    res.render('home');
                }
                if(req.session.role =="Admin"){
                    res.render('admin/order', {
                        address: addressResult,
                        hissum: hissumResult
                    })
                }else if(req.session.role == "Emp"){
                    res.render('emp/order', {
                        address: addressResult,
                        hissum: hissumResult
                    })
                }
            })
        })

})
module.exports = router;