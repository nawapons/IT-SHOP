const conn = require('../database');
module.exports = {
    getProduct: (req, res) => {
        conn.query('SELECT product.*,type.* FROM product  LEFT JOIN type ON product.type_id = type.type_id ORDER BY product_date DESC', (error, results) => {
            if (error) {
                res.redirect('/');
            }
            conn.query('SELECT * FROM type ORDER BY type_id ASC', (error, typeResults) => {
                if (error) {
                    res.redirect('/');
                }
                conn.query('SELECT COUNT(*) AS productCount FROM product', (error, countResults) => {
                    if (error) {
                        res.redirect('/');
                    }
                    conn.query('SELECT type_id, COUNT(*) AS typeC FROM product GROUP BY type_id', (error, typeCount) => {
                        if (error) {
                            res.redirect('/');
                        }

                        if (req.session.role == "Admin") {
                            res.render('admin/product', {
                                products: results,
                                types: typeResults,
                            })
                        } else if (req.session.role == "Emp") {
                            res.render('emp/product', {
                                products: results,
                                types: typeResults,
                            })
                        } else {
                            //queryPRODUCT 
                            conn.query('SELECT * FROM product', (error, resultsP) => {
                                if (error) throw error;
                                //pagination product
                                const resultsPerPage = 6;
                                const numOfResult = resultsP.length;
                                const numberOfPages = Math.ceil(numOfResult / resultsPerPage);
                                let page = req.query.page ? Number(req.query.page) : 1;
                                if (page > numberOfPages) {
                                    res.redirect('/?page=' + encodeURIComponent(numberOfPages));
                                } else if (page < 1) {
                                    res.redirect('/?page=' + encodeURIComponent('1'));
                                }
                                //LIMIT starting number
                                const startingLimit = (page - 1) * resultsPerPage;
                                conn.query(`SELECT product.*,type.* FROM product  LEFT JOIN type ON product.type_id = type.type_id ORDER BY product_date DESC LIMIT ${startingLimit},${resultsPerPage}`, (error, resultsALL) => {
                                    if (error) throw error;
                                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                                    if (endingLink < (page + 4)) {
                                        iterator -= (page + 4) - numberOfPages;
                                    }
                                    if(iterator <= 1){
                                        iterator = 1;
                                    }
                                  
                                   
                                        res.render('user/product', {
                                            products: resultsALL,
                                            types: typeResults,
                                            counts: countResults, 
                                            page:page, iterator: iterator,endingLink:endingLink,numberOfPages: numberOfPages
                                        })
                                    })
                            })
                        }
                    })
                })

            });
        });
    },
}