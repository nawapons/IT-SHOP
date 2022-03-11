const conn = require('../database');
module.exports = {
    getBanner: (req, res) => {
        if(req.session.role == "Admin"){
            res.render("admin/banner");
        }else if(req.session.role == "Emp"){
            res.render("emp/banner");
        }else{
            res.render('/');
        }
    }
}