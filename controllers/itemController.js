const pool = require("../db/pool");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.updateItemGet = asyncHandler(async (req, res) => {
    const itemId = req.query.q;
    const item = await db.showItem(itemId);
    const categories = await db.showCategories();
    res.render('updateitem', { title: "Item", item, categories, itemId })
});

exports.updateItemPost = asyncHandler(async (req, res) => {
    const itemId = req.query.q
    const item = req.body.item;
    const quantity = req.body.quantity;
    const category = req.body.category;
    await db.updateItem(itemId, item, quantity, category);
    res.redirect('/');
})

exports.addItemGet = asyncHandler(async (req, res) => {
    const categories = await db.showCategories();
    res.render('addItem', {title: "Add item", categories})
})

exports.addItemPost = asyncHandler (async (req, res) => {
    let item = req.body.item;
    let quantity = req.body.quantity;
    let category = req.body.category;
    await db.addItemPost(item, quantity, category);
    res.redirect('/');
})

exports.deleteItemGet = asyncHandler (async (req, res) => {
    const itemId = req.query.q;
    const item = await db.showItem(itemId);
    res.render('deleteItem', {item, itemId});
})

exports.deleteItemPost = asyncHandler (async (req,res) => {
    let itemId = req.query.q;
    console.log(itemId);
    await db.deleteItemPost(itemId);
    res.redirect('/')
})