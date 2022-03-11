const conn = require("../database")
const mime = require('mime');
const fs = require('fs');
const randomString = require("randomString");
const e = require("express");
exports.buyConfirm = (req, res) => {
    let slipIMG = req.files.slipIMG; // get picture
    const UID = res.locals.UserID; // userID
    let paymentID = randomString.generate(12); //randomString for paymentID
    let newName = "slipID" + '-' + paymentID + '.' + mime.getExtension(slipIMG.mimetype); // rename picture
    let status = "W";
    try {
        slipIMG.mv(`./public/images/slipPayment/${newName}`); // move file to folder
        conn.query('SELECT * FROM cart WHERE user_id = ?', [UID], (error, results) => { // select cart for product data
            if (error) {
                return res.json('Error selectCart[01]')
            }
            if (results.length > 0) {
                results.forEach((cart, index) => {
                    conn.query('INSERT INTO history SET ?', { // insert cart to history 
                        history_code: paymentID,
                        product_id: cart.product_id,
                        history_picture: newName,
                        history_status: status,
                        user_id: UID
                    }, (insertError, insertResult) => {
                        if (insertError) {
                            return res.json('Error Insert[01]');
                        }
                        if (insertResult) {
                            conn.query('UPDATE product SET product_quantity = product_quantity - 1 WHERE product_id = ?', [cart.product_id], (updateError, updateResult) => { // update product quantity -1
                                if (updateError) {
                                    return res.json('Error Update[01]');
                                }
                                if (updateResult) {
                                    conn.query('DELETE FROM cart WHERE user_id = ?', [UID], (errors, results) => { // delete cart 
                                        if (errors) {
                                            return res.json('Error Delete[01]');
                                        }
                                        if(results){
                                            conn.query('SELECT COUNT(*) AS cartCount FROM cart WHERE user_id = ?', [req.session.UserID], (cartCountError, cartCountResult) => { //count cart for session cart
                                                req.session.cartCount = cartCountResult[0].cartCount;
                                                if (cartCountError) {
                                                    console.log(error)
                                                }
                                                if(cartCountResult){
                                                    return res.send({
                                                        result: 'success',
                                                        url: 'profile'
                                                    });
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                })
            }
        })
    } catch (error) {
        return res.json('Error movePic[00]');
    }
}
exports.orderConfirm = (req,res)=>{
    let {emsnumber,id} = req.body;
    try{
        conn.query("UPDATE history SET history_status = 'Y',history_ems = ? WHERE history_code = ?",[emsnumber,id],(error,result)=>{
            if(error){
                return res.json('Error updateems')
            }
            if(result){
                return res.send("success");
            }
        })
    }catch(error){
        return res.json('Error confirmOrder');
    }
}
exports.cancelOrder = (req,res)=>{
    let {id} = req.body;
    try{
        conn.query("UPDATE history SET history_status = 'N' WHERE history_code = ?",[id],(error,result)=>{
            if(error){
                return res.json('Error cancel[01]');
            }
            if(result){
                return res.send("success");
            }
        })
    }catch(error){  
        return res.json('Error cancelOrder');
    }
}
exports.getReceipt = (req,res)=>{
    
}