const pool = require('./pool');

async function showItem(itemId) {
    const { rows } = await pool.query("SELECT item, quantity, category_id FROM items WHERE item_id = ($1);", [itemId]);
    return rows;
}

async function updateItem(item_id, item, quantity, category){
    let categoryId = await getCategoryId(category);
    await pool.query("UPDATE items SET item = ($1), quantity = ($2), category_id = ($3) WHERE item_id = ($4) RETURNING *;", [item, quantity, categoryId, item_id] )
}

async function showCategories() {
    const { rows } = await pool.query("SELECT category FROM categories;");
    return rows;
}

async function getCategoryId(category){
    const plainTextCategory = decodeURIComponent(category);
    const { rows } = await pool.query("SELECT category_id FROM categories WHERE category = ($1);", [plainTextCategory])
    const categoryId = rows[0].category_id;
    return categoryId;
}

async function showItemsByCategory(categoryId){
    const { rows } = await pool.query("SELECT item_id, item, quantity FROM items WHERE category_id = ($1);", [categoryId])
    return rows;
}

async function deleteCategory(category){
    await pool.query("DELETE FROM categories WHERE category = $1", [category]);
}

async function addCategory(newCategory){
    await pool.query("INSERT INTO categories (category) VALUES ($1);", [newCategory]);
    let { rows } = await pool.query("SELECT * FROM categories;");
    console.log(rows);
}

async function addItemPost(item, quantity, category){
    let categoryId = await getCategoryId(category);
    await pool.query("INSERT INTO items (item, quantity, category_id) VALUES ($1, $2, $3);", [item, quantity, categoryId]);
}

async function deleteItemPost(itemId){
    await pool.query("DELETE FROM items WHERE item_id = $1;", [itemId]);
}
  
  module.exports = {
    showItem,
    showCategories,
    showItemsByCategory,
    getCategoryId,
    addCategory,
    addItemPost,
    updateItem,
    deleteItemPost,
    deleteCategory
  };
  