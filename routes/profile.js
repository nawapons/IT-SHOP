const conn = require('../database');
module.exports = {
    getProfile: (req, res) => {
        let id = req.session.UserID;
        conn.query('SELECT * FROM user WHERE user_id = ?', [id], (error, results) => {
            if (error) {
                res.render('home')
            }
            if (req.session.role == "Admin") {
                res.render('admin/profile', {
                    profiles: results,

                })
            } else if (req.session.role == "Emp") {
                res.render('emp/profile', {
                    profiles: results,

                })
            } else {
                conn.query('SELECT * FROM address WHERE user_id = ?', [id], (errors, result) => {
                    if (errors) {
                        res.render('home')
                    }
                    conn.query('SELECT * FROM history WHERE user_id = ?', [id], (hisError, hisResult) => {
                        if (hisError) {
                            res.render('home');
                        }
                        conn.query('SELECT his.*,SUM(pro.product_price) AS TOTAL_PRICE,COUNT(his.product_id) AS TOTAL_AMOUNT FROM history his INNER JOIN product pro ON his.product_id = pro.product_id WHERE his.user_id = ? GROUP BY his.history_code ',[id],(hisumError,hissumResult)=>{
                            if(hisumError){
                                res.render('home');
                            }
                            res.render('user/profile', {
                                profiles: results,
                                address: result,
                                history:hisResult,
                                hissum: hissumResult
                            })
                        })
                    })
                })

            }
        })
    }
}