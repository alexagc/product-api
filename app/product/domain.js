const model = require('./model');

async function findProducts () {
  const products = await model.find({}, '-_id -__v');
  return products;
}

async function insertProduct (product) {
  const newProduct = await model.create(product);
  return newProduct;
}

async function findProduct (id) {
  const product = await model.find({ id }, '-_id -__v');
  return product || {};
}

async function deleteProduct (id) {
  await model.deleteOne({ id });
}

module.exports = {
  findProducts,
  findProduct,
  insertProduct,
  deleteProduct
};
