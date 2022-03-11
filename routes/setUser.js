const conn = require('../database');
module.exports = {
    getUser: (req, res) => {
        conn.query('SELECT * FROM user WHERE user_role = "Admin" ORDER BY user_id', (error, admin) => {
            if (error) {
                res.render('home');
            }
            conn.query('SELECT * FROM user WHERE user_role = "Emp" ORDER BY user_id', (error, emp) => {
                if (error) {
                    res.render('home');
                }
                conn.query('SELECT * FROM user WHERE user_role = "User" ORDER BY user_id', (error, user) => {
                    if(error){
                        res.render('home');
                    }
                    if (req.session.role == "Admin") {
                        res.render('admin/setUser', {
                            adminRole: admin,
                            empRole: emp,
                            userRole: user
                        })
                    } else {
                        res.render('home');
                    }
                })
            })
        })
    }
}