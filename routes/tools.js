
const conn = require('../database');
const ifNotLoggedin = (req, res, next) => {
    if (!req.session.isLoggedIn) {

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
                            res.redirect('/');
                        }
                        conn.query('SELECT * FROM banner ORDER BY banner_id DESC', (error, bannerResults) => {
                            if (error) {
                                res.redirect('/');
                            }
                            res.render('./home', {
                                Hotproducts: resultHot,
                                Newproducts: resultNew,
                                AdviceProducts: resultAdvice,
                                types: typeResults,
                                banners: bannerResults
                            })
                        })
                    })
                })
            })
        })
    }
    next();
}
const ifLoggedin = (req, res, next) => {
    if (req.session.isLoggedIn) {
        if (req.session.role == "User") {

        } else if (req.session.role == "Emp") {
            return res.render('./emp/home')
        } else if (req.session.role == "Admin") {
            return res.render('./admin/home')
        } else {
            return res.send('ERROR Redirect');
        }
    }
    next();
}

module.exports = {
    ifNotLoggedin: ifNotLoggedin,
    ifLoggedin: ifLoggedin
}