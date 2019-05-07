const router = require('express').Router();
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

const domain = require('./domain');

router.get('/', async (req, res) => {
  const products = await domain.findProducts();
  res.status(httpStatus.OK).send(products);
});

router.get('/:id', async (req, res) => {
  const product = await domain.findProduct(req.params.id);
  res.status(httpStatus.OK).send(product);
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
      res.status(httpStatus.CREATED).send(product);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
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
    res.status(httpStatus.OK).send();
  }
);

module.exports = router;
