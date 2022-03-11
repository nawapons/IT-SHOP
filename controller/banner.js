const conn = require('../database');
const mime = require('mime');
const fs = require('fs');
exports.addBanner = (req,res)=>{
     // console.log(req.files.proimg);
     let proimg = req.files.proimg;
     let newName = "banner" + '-' + Date.now() + '.' + mime.getExtension(proimg.mimetype);
     try {
         proimg.mv(`./public/images/banners/${newName}`);
         const { link } = req.body
         conn.query('INSERT INTO banner SET ?', { banner_id: null,banner_link: link,banner_picture:newName }, (error, results) => {
             if (error) {
                 return res.json('Error addBanner[02]')
             }
             if (results) {
                 return res.json('success')
             }
         })
     } catch (error) {
         return res.json('Error addBanner[03]');
     }
}
exports.editBanner = (req,res) =>{
    // console.log(req.files.proimg);
    if(!req.files){
        try {
            const {linkedit,id} = req.body;
            conn.query('UPDATE banner SET banner_link = ? WHERE banner_id = ?', [linkedit,id], (error, results) => {
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
    }else{
        let editimg = req.files.editimg;
        let newName = "banner" + '-' + Date.now() + '.' + mime.getExtension(editimg.mimetype);
        try {
            editimg.mv(`./public/images/banners/${newName}`);
            const {linkedit,id} = req.body;
            conn.query('SELECT banner_picture FROM banner WHERE banner_id = ?',[id],(error,results)=>{
                if(error){
                    return res.json('Error delEDIT[01]')
                }
                if(results){
                    let filePath = `./public/images/banners/${results[0].banner_picture}`;
                    fs.unlinkSync(filePath);
                    conn.query('UPDATE banner SET banner_link = ?,banner_picture = ? WHERE banner_id = ?',[linkedit,newName,id],(error,results)=>{
                        if(error){
                            return res.json('Error edit[03]')
                        }
                        if(results){
                            return res.json('success')
                        }
                    })
                }
            })
           
        } catch (error) {
            return res.json('Error editBanner[03]');
        }
    }
}
exports.delBanner = (req,res)=>{
    const {id} = req.body;
    conn.query('SELECT banner_picture FROM banner WHERE banner_id = ?', [id], async (error, results) => {
        if (error) {
            return re.json('Error del[01]')
        }
        if (results) {
            let filePath = `./public/images/banners/${results[0].banner_picture}`;
            conn.query('DELETE FROM banner WHERE banner_id = ?', [id], async (error, results) => {
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