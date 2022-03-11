
const conn = require('../database');
const bcrypt = require('bcrypt');


exports.register = (req, res) => {

    const { fname, lname, gender, date, email, password, confpassword } = req.body;


    conn.query('SELECT user_email FROM user WHERE user_email = ?', [email], async (error, results) => {
        if (error) {
            return res.json('Error Checking')
        }
        if (results.length > 0) {
            return res.json('อีเมลถูกใช้งานแล้ว')
        } else if (password !== confpassword) {
            return res.json('รหัสผ่านไม่ตรงกัน')
        }

        let hashPassword = await bcrypt.hash(password, 12);
        // let token = crypto.randomBytes(64).toString('hex');
        let role = "User";
        conn.query('INSERT INTO user SET ?', { user_fname: fname, user_lname: lname, user_gender: gender, user_date: date, user_email: email, user_password: hashPassword, user_role: role }, (error, results) => {
            if (error) {
                return res.json('Error Register!')
            }
            if (results) {
                return res.json('success')
            }
        })
    });

}
exports.login = (req, res) => {
    const { email, password } = req.body;

    conn.query('SELECT user_email FROM user WHERE user_email = ?', [email], async (error, results) => {
        if (error) {
            return res.json('Error Login')
        }
        if (results.length == 1) {
            conn.query('SELECT * FROM user WHERE user_email = ?', [email], async (error, results) => {
                await bcrypt.compare(password, results[0].user_password).then(compare_result => {
                    if (compare_result === true) {
                        
                        req.session.UserID = results[0].user_id
                         req.session.isLoggedIn = true
                         req.session.role = results[0].user_role
                         req.session.fname = results[0].user_fname
                        req.session.lname = results[0].user_lname
                        
                        conn.query('SELECT COUNT(*) AS cartCount FROM cart WHERE user_id = ?',[req.session.UserID],(errors,result)=>{
                            req.session.cartCount = result[0].cartCount;

                            return res.json(req.session.role)
                        })
                    } else {
                        return res.json('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
                    }
                })
            })
        } else {
            return res.json('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
        }
    })
}