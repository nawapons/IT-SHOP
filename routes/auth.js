const express = require('express');
const authController =require('../controller/auth');
const productController = require('../controller/product');
const userController = require('../controller/user');
const bannerController = require('../controller/banner');
const cartController = require('../controller/cart');
const bankController = require('../controller/bank');
const buyController = require('../controller/payment');
const router = express.Router();

router.post('/register',authController.register)
router.post('/login',authController.login)
router.post('/addproduct',productController.add)
router.post('/addtype',productController.addtype)
router.post('/delproduct',productController.delproduct)
router.post('/getShowProduct',productController.getShowProduct)
router.post('/editproduct',productController.editproduct)
router.post('/addUser',userController.addUser)
router.post('/editUser',userController.editUser)
router.post('/delUser',userController.delUser)
router.get('/detail/:product_id',productController.detailProduct)
router.post('/addBanner',bannerController.addBanner)
router.post('/editBanner',bannerController.editBanner)
router.post('/delBanner',bannerController.delBanner)
router.post('/addCart',cartController.cartProduct)
router.post('/removeCart',cartController.removeCart)
router.post('/addAddress',userController.addAddress)
router.post('/editAddress',userController.editAddress)
router.post('/addBank',bankController.addBank)
router.post('/delBank',bankController.delBank)
router.post('/editBank',bankController.editBank)
router.post('/slipPayment',buyController.buyConfirm)
router.post('/orderems',buyController.orderConfirm)
router.post('/cancelorder',buyController.cancelOrder)
// router.post('/getreceipt',receipt.getReceipt)
module.exports = router;