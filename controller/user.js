const conn = require('../database');
const bcrypt = require('bcrypt');

exports.addUser = (req, res) => {
    const {
        fname,
        lname,
        email,
        gender,
        role,
        date,
        password,
        confpassword
    } = req.body;
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
        conn.query('INSERT INTO user SET ?', {
            user_fname: fname,
            user_lname: lname,
            user_gender: gender,
            user_date: date,
            user_email: email,
            user_password: hashPassword,
            user_role: role
        }, (error, results) => {
            if (error) {
                return res.json('Error AddUser!')
            }
            if (results) {
                return res.json('success')
            }
        })
    });
}
exports.delUser = (req, res) => {
    const {
        id
    } = req.body;
    conn.query("DELETE FROM user WHERE user_id = ?", [id], (error, results) => {
        if (error) {
            return res.json('Error DelUser!');
        }
        if (results) {
            return res.json('success');
        }
    })
}
exports.editUser = (req, res) => {
    const {
        fname,
        lname,
        email,
        gender,
        role,
        date,
        id
    } = req.body;
    if (!id || !fname || !lname || !email || !gender || !role || !date) {
        return res.json('กรุณากรอกข้อมูลให้ครบ!');
    } else {
        conn.query('UPDATE user SET user_fname = ?,user_lname = ?,user_email = ?,user_gender = ?,user_role = ?,user_date = ? WHERE user_id = ?', [fname, lname, email, gender, role, date, id], (error, results) => {
            if (error) {
                console.log(error)
            }
            if (results) {
                return res.json('success');
            }
        })
    }
}
exports.addAddress = (req, res) => {
    const {
        province,
        district,
        zipcode,
        detail
    } = req.body;
    const UID = res.locals.UserID
    if (!province || !district || !zipcode || !detail) {
        return res.json('กรุณากรอกข้อมูลให้ครบ!');
    } else {
        conn.query('INSERT INTO address SET ?', {
            user_id: UID,
            address_detail: detail,
            address_district: district,
            address_province: province,
            address_zipcode: zipcode
        }, (error, results) => {
            if (error) {
                return res.json('error');
            }
            if (results) {
                return res.json('success');
            }
        })
    }
}
exports.editAddress = (req, res) => {
    const {
        province,
        district,
        zipcode,
        detail
    } = req.body;
    const UID = res.locals.UserID
    if (!province || !district || !zipcode || !detail) {
        return res.json('กรุณากรอกข้อมูลให้ครบ!');
    } else {
        conn.query('UPDATE address SET address_detail = ?,address_district = ?,address_province = ?,address_zipcode = ? WHERE user_id = ?', [detail,district,province,zipcode,UID], (error, results) => {
            if (error) {
                return res.json('error');
            }
            if (results) {
                return res.json('success');
            }
        })
    }
}