const conn = require('../database');

exports.addBank = (req, res) => {
    const {
        bankname,
        bankno,
        accname
    } = req.body;
    const UID = res.locals.UserID;
    conn.query('INSERT INTO bank SET ?', {
        bank_name: bankname,
        bank_number: bankno,
        bank_accname: accname,
        user_id: UID
    }, (error, results) => {
        if (error) {
            return res.json('error');
        }
        if(results){
            return res.json('success');
        }
    })
}
exports.delBank = (req,res)=>{
    const {id} = req.body;
    conn.query('DELETE FROM bank WHERE bank_id = ?',[id],(error,results)=>{
        if(error){
            return res.json('error');
        }
        if(results){
            return res.json('success');
        }
    })
}
exports.editBank = (req,res)=>{
    const {
        bankname,
        bankno,
        accname,
        bankid
    } = req.body;
    conn.query('UPDATE bank SET bank_name = ?,bank_number = ?,bank_accname = ? WHERE bank_id = ?', [bankname,bankno,accname,bankid], (error, results) => {
        if (error) {
            return res.json('error');
        }
        if(results){
            return res.json('success');
        }
    })
}