var express = require('express');
var itemController = require('../controllers/itemController.js');
var categoryController = require('../controllers/categoryController.js');
var router = express.Router();

/* GET home page. */
router.get('/', categoryController.showCategories);
router.get('/category', categoryController.showItems);
router.get('/addcategory', categoryController.addCategoryPage);
router.post('/addcategory', categoryController.handlePostAdd);
router.get('/additem', itemController.addItemGet);
router.post('/additem', itemController.addItemPost);
router.get('/updateitem', itemController.updateItemGet);
router.post('/updateitem', itemController.updateItemPost);
router.get('/deleteitem', itemController.deleteItemGet);
router.post('/deleteitem', itemController.deleteItemPost);
router.get('/deletecategory', categoryController.deleteCategoryGet);
router.post('/deletecategory', categoryController.deleteCategoryPost);


module.exports = router;
