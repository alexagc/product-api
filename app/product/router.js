const router = require('express').Router();
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

const domain = require('./domain');

router.get('/', async (req, res) => {
  const products = await domain.findProducts();
  res.send(products).status(httpStatus.OK);
});

router.get('/:id', async (req, res) => {
  const product = await domain.findProduct(req.params.id);
  res.send(product).status(httpStatus.OK);
});

router.post(
  '/',
  basicAuth({
    users: { admin: 'supersecret' }
  }),
  bodyParser.json(),
  async (req, res) => {
    try {
      const product = await domain.insertProduct(req.body);
      res.send(product).status(httpStatus.CREATED);
    } catch (error) {
      res.send(error).status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
);

router.delete(
  '/:id',
  basicAuth({
    users: { admin: 'supersecret' }
  }),
  async (req, res) => {
    await domain.deleteProduct(req.params.id);
    res.send().status(httpStatus.OK);
  }
);

module.exports = router;
