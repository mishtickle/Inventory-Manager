const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.showCategories = asyncHandler(async (req, res) => {
    const categories = await db.showCategories();
    res.render('index', { title: "Categories:", categories })
});

exports.showItems = asyncHandler(async(req, res) => {
    var category = req.query.q;
    var categoryId = await db.getCategoryId(category);
    const items = await db.showItemsByCategory(categoryId);
    res.render('items', {title: category, items})
})

exports.addCategoryPage = asyncHandler(async (req, res) => {
    res.render('addCategory');
})

exports.handlePostAdd = asyncHandler(async (req, res) => {
    let newCategory = req.body.addCategory;
    await db.addCategory(newCategory)
    res.redirect('/');
})

exports.deleteCategoryGet = asyncHandler (async (req, res) => {
    let category = req.query.q;
    res.render('deleteCategory', {category});
})

exports.deleteCategoryPost = asyncHandler (async (req, res) => {
    let category = req.query.q;
    await db.deleteCategory(category);
    res.redirect('/');
})
