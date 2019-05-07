const request = require('supertest');
const express = require('express');

const productRouter = require('../../app/product/router');
const productDomain = require('../../app/product/domain');

const app = express();
app.use('/', productRouter);

describe('Products router', () => {
  test('Should response 200 when get products', async () => {
    spyOn(productDomain, 'findProducts').and.returnValue(
      Promise.resolve([{ id: '1', name: 'test', description: 'test' }])
    );

    const response = await request(app)
      .get('/')
      .expect(200);

    expect(response.body).toEqual([{ id: '1', name: 'test', description: 'test' }]);

    expect(productDomain.findProducts).toBeCalled();
  });

  test('Should response 200 when get product', async () => {
    spyOn(productDomain, 'findProduct').and.returnValue(
      Promise.resolve([{ id: '1', name: 'test', description: 'test' }])
    );

    const response = await request(app)
      .get('/1234')
      .expect(200);

    expect(response.body).toEqual([{ id: '1', name: 'test', description: 'test' }]);

    expect(productDomain.findProduct).toBeCalledWith('1234');
  });

  test('Should response 401 when delete product without auth', async () => {
    spyOn(productDomain, 'deleteProduct').and.returnValue(Promise.resolve());

    const response = await request(app)
      .delete('/1234')
      .expect(401);

    expect(productDomain.deleteProduct).not.toBeCalled();
  });

  test('Should response 200 when delete product with auth', async () => {
    spyOn(productDomain, 'deleteProduct').and.returnValue(Promise.resolve());

    const response = await request(app)
      .delete('/1234')
      .set('Authorization', 'Basic YWRtaW46c3VwZXJzZWNyZXQ=')
      .expect(200);

    expect(productDomain.deleteProduct).toBeCalledWith('1234');
  });

  test('Should response 401 when create product without auth', async () => {
    spyOn(productDomain, 'insertProduct').and.returnValue(Promise.resolve());

    const response = await request(app)
      .post('/')
      .expect(401);

    expect(productDomain.insertProduct).not.toBeCalled();
  });

  test('Should response 201 when create product with auth', async () => {
    spyOn(productDomain, 'insertProduct').and.returnValue(
      Promise.resolve({ id: '1', name: 'test', description: 'test' })
    );

    const response = await request(app)
      .post('/')
      .set('Authorization', 'Basic YWRtaW46c3VwZXJzZWNyZXQ=')
      .send({ id: '1', name: 'test', description: 'test' })
      .expect(201);

    expect(productDomain.insertProduct).toBeCalledWith({ id: '1', name: 'test', description: 'test' });
  });

  test('Should response 500 when create product with auth', async () => {
    spyOn(productDomain, 'insertProduct').and.callFake(() => Promise.reject({ error: 'test' }));

    const response = await request(app)
      .post('/')
      .set('Authorization', 'Basic YWRtaW46c3VwZXJzZWNyZXQ=')
      .send({ id: '1', description: 'test' })
      .expect(500);

    expect(response.body).toEqual({ error: 'test' });
    expect(productDomain.insertProduct).toBeCalledWith({ id: '1', description: 'test' });
  });
});
