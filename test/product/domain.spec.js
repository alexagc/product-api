const productModel = require('../../app/product/model');
const productDomain = require('../../app/product/domain');

describe('Products somain', () => {
  test('Should return products when findProducts its called', async () => {
    spyOn(productModel, 'find').and.returnValue(Promise.resolve([{ id: '1', name: 'test', description: 'test' }]));

    const result = await productDomain.findProducts();

    expect(result).toEqual([{ id: '1', name: 'test', description: 'test' }]);

    expect(productModel.find).toBeCalledWith({}, '-_id -__v');
  });

  test('Should return product when findProduct its called', async () => {
    spyOn(productModel, 'find').and.returnValue(Promise.resolve([{ id: '1', name: 'test', description: 'test' }]));

    const result = await productDomain.findProduct('1234');

    expect(result).toEqual([{ id: '1', name: 'test', description: 'test' }]);

    expect(productModel.find).toBeCalledWith({ id: '1234' }, '-_id -__v');
  });

  test('Should return emty product when findProduct its called with no result', async () => {
    spyOn(productModel, 'find').and.returnValue(Promise.resolve());

    const result = await productDomain.findProduct('1234');

    expect(result).toEqual({});

    expect(productModel.find).toBeCalledWith({ id: '1234' }, '-_id -__v');
  });

  test('Should return product create when insertProduct its called', async () => {
    spyOn(productModel, 'create').and.returnValue(Promise.resolve([{ id: '1', name: 'test', description: 'test' }]));

    const result = await productDomain.insertProduct({ name: 'test', description: 'test' });

    expect(result).toEqual([{ id: '1', name: 'test', description: 'test' }]);

    expect(productModel.create).toBeCalledWith({ name: 'test', description: 'test' });
  });

  test('Should delete product when findProduct its called', async () => {
    spyOn(productModel, 'deleteOne').and.returnValue(Promise.resolve());

    await productDomain.deleteProduct('1234');

    expect(productModel.deleteOne).toBeCalledWith({ id: '1234' });
  });
});
