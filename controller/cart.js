const conn = require('../database');
exports.cartProduct = (req,res) =>{
    const { id } = req.body;
    const UID = res.locals.UserID
    conn.query('INSERT INTO cart SET ?',{cart_id: null,product_id:id,user_id:UID},(error,results)=>{
        if(error){
            console.log(error)
        }
        if(results){
            conn.query('SELECT COUNT(*) AS cartCount FROM cart WHERE user_id = ?',[req.session.UserID],(errors,result)=>{
                req.session.cartCount = result[0].cartCount;
                if(errors){
                    console.log(error)
                }
                return res.json('success');
            })
        }
    })
}
exports.removeCart = (req,res) =>{
    const {pid} = req.body;
    const UID = res.locals.UserID
    conn.query('DELETE FROM cart WHERE product_id = ? AND user_id = ?',[pid,UID],(error,results)=>{
        if(error){
            return res.json('error');
        }
        if(results){
            conn.query('SELECT COUNT(*) AS cartCount FROM cart WHERE user_id = ?',[req.session.UserID],(errors,result)=>{
                req.session.cartCount = result[0].cartCount;
                if(errors){
                    console.log(error)
                }
                return res.json('success');
            })
        }
    })
}
