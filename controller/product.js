const conn = require('../database');
const mime = require('mime');
const fs = require('fs');
exports.add = (req, res) => {
    // console.log(req.files.proimg);
    let proimg = req.files.proimg;
    let newName = "newFile" + '-' + Date.now() + '.' + mime.getExtension(proimg.mimetype);
    try {
        proimg.mv(`./public/images/product/${newName}`);
        const { pid, pname, type, detail, quantity, price } = req.body
        conn.query('INSERT INTO product SET ?', { product_id: pid, product_name: pname, type_id: type, product_detail: detail, product_quantity: quantity, product_price: price, product_picture: newName }, (error, results) => {
            if (error) {
                return res.json('Error add[02]')
            }
            if (results) {
                return res.json('success')
            }
        })
    } catch (error) {
        return res.json('Error add[03]');
    }
}
exports.addtype = (req, res) => {
    const { name } = req.body;
    conn.query('SELECT type_name FROM type WHERE type_name = ?', [name], async (error, results) => {
        if (error) {
            return res.json('Error type[01]')
        }
        if (results.length > 0) {
            return res.json('มีประเภทสินค้านี้ในระบบแล้ว!')
        }
        conn.query('INSERT INTO type SET ?', { type_name: name }, (error, results) => {
            if (error) {
                return res.json('Error type[02]')
            }
            if (results) {
                return res.json('success')
            }
        })
    })
}
exports.delproduct = (req, res) => {
    const { id } = req.body;
    conn.query('SELECT product_picture FROM product WHERE product_id = ?', [id], async (error, results) => {
        if (error) {
            return re.json('Error del[01]')
        }
        if (results) {
            let filePath = `./public/images/product/${results[0].product_picture}`;
            conn.query('DELETE FROM product WHERE product_id = ?', [id], async (error, results) => {
                if (error) {
                    return res.json('Error del[01]')
                }
                if (results) {
                    fs.unlinkSync(filePath);
                    return res.json('success')
                }
            })
        }
    })

}
exports.getShowProduct = (req, res) => {
    const { id } = req.body;
    conn.query('SELECT product.*,type.* FROM product LEFT JOIN type ON product.type_id = type.type_id WHERE product.product_id = ?', [id], async (error, results) => {
        if (error) {
            return re.json('Error del[01]')
        }

        if (results) {
            return res.json({
                show: results,
            })
        }
    })
}
exports.editproduct = (req, res) => {
    // console.log(req.files.proimg);
    if (!req.files) {
        try {
            const { showPID, showPname, showPtype, showPdetail, showPquantity, showPprice, oldID } = req.body
            conn.query('UPDATE product SET product_id = ?,product_name = ?,type_id= ?,product_detail = ?, product_quantity = ?,product_price = ? WHERE product_id = ?', [showPID, showPname, showPtype, showPdetail, showPquantity, showPprice, oldID], (error, results) => {
                if (error) {
                    return res.json('Error edit[01]');
                }
                if (results) {
                    return res.json('success')
                }
            })
        } catch (error) {
            return res.json('Error add[02]');
        }
    } else {
        let changePicture = req.files.changePicture;
        let newName = "newFile" + '-' + Date.now() + '.' + mime.getExtension(changePicture.mimetype);

        try {
            changePicture.mv(`./public/images/product/${newName}`);
            const { showPID, showPname, showPtype, showPdetail, showPquantity, showPprice, oldID } = req.body
            conn.query('SELECT product_picture FROM product WHERE product_id = ?', [oldID], async (error, results) => {
                if (error) {
                    return res.json('Error delEDIT[01]')
                }
                if (results) {
                    let filePath = `./public/images/product/${results[0].product_picture}`;
                    fs.unlinkSync(filePath);
                    conn.query('UPDATE product SET product_id = ?,product_name = ?,type_id= ?,product_detail = ?, product_quantity = ?,product_price = ?,product_picture = ? WHERE product_id = ?', [showPID, showPname, showPtype, showPdetail, showPquantity, showPprice, newName, oldID], (error, results) => {
                        if (error) {
                            return res.json('Error edit[03]')
                        }
                        if (results) {
                            return res.json('success')
                        }
                    })
                }
            })

        } catch (error) {
            return res.json('Error add[03]');
        }
    }
}

exports.getProductbyID = (req,res)=>{
    const id = req.params.type_id;
    conn.query('SELECT product.*,type.* FROM product  LEFT JOIN type ON product.type_id = type.type_id WHERE product.type_id = ? ORDER BY product_id ASC',[id], (error, results) => {
        if (error) {
            res.redirect('/');
        }

        conn.query('SELECT * FROM type ORDER BY type_id ASC',(error,typeResults)=>{
            if(error){
                res.redirect('/');
            }
            conn.query('SELECT COUNT(*) AS productCount FROM product',(error,countResults)=>{
                if(error){
                    res.redirect('/');
                }
                      //queryPRODUCT 
                      conn.query('SELECT * FROM product WHERE type_id = ?',[id], (error, resultsP) => {
                        if (error) throw error;
                        //pagination product
                        const resultsPerPage = 6;
                        let  numOfResult =1;
                        if(resultsP.length == 0){
                            numOfResult= 1;
                        }else{
                            numOfResult = resultsP.length;
                        }
                        const numberOfPages = Math.ceil(numOfResult / resultsPerPage);
                        let page = req.query.page ? Number(req.query.page) : 1;
                        if (page > numberOfPages) {
                            res.redirect('/?page=' + encodeURIComponent(numberOfPages));
                        } else if (page < 1) {
                            res.redirect('/?page=' + encodeURIComponent('1'));
                        }
                        //LIMIT starting number
                        const startingLimit = (page - 1) * resultsPerPage;
                        conn.query(`SELECT product.*,type.* FROM product  LEFT JOIN type ON product.type_id = type.type_id WHERE product.type_id = ? 
                        ORDER BY product_date DESC LIMIT ${startingLimit},${resultsPerPage}`,[id],(error, resultsALL) => {
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
                        });
                    })

            })
            
        });
       
    });
}
exports.searchProduct = (req,res)=>{
    const textSearch = req.body.textSearch;
   
    
        conn.query('SELECT * FROM type ORDER BY type_id ASC',(error,typeResults)=>{
            if(error){
                res.redirect('/');
            }
            conn.query('SELECT COUNT(*) AS productCount FROM product',(error,countResults)=>{
                if(error){
                    res.redirect('/');
                }
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
                    conn.query(`SELECT product.*,type.* FROM product  LEFT JOIN type ON product.type_id = type.type_id WHERE product.product_name LIKE ? ORDER BY product_date DESC LIMIT ${startingLimit},${resultsPerPage}`,'%'+[textSearch]+'%',(error, resultsALL) => {
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
                    });
                })
            })
        })
}
exports.detailProduct = (req,res) =>{
    const id = req.params.product_id;
    conn.query('SELECT * FROM product WHERE product_id = ?',[id],(error,result)=>{
        if(error){
            res.render('/product');
        }
        if(result){
            res.render('user/detail',{
                products: result
            })
        }
    })
}