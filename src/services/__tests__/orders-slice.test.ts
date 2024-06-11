import { configureStore } from '@reduxjs/toolkit';
import { ordersUser, orderByNumber } from '../actions';
import ordersSlice from '../reducers/orders-slice';
import orderNumberSlice from '../reducers/order-number-slice';

describe('Проверка асинхронных запросов ordersUser', () => {
  const mockOrders = [
    { id: 1, data: 'test1' },
    { id: 2, data: 'test2' }
  ];

  test('Проверка запроса fulfilled', async () => {
    const store = configureStore({
      reducer: { ordersSlice }
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            orders: mockOrders
          })
      })
    ) as jest.Mock;

    await store.dispatch(ordersUser());
    const states = store.getState().ordersSlice;
    expect(states.orders).toEqual(mockOrders);
  });
});

describe('Проверка асинхронных запросов orderByNumberUser', () => {
  const mockOrders = [
    { id: 1, data: 'test1' },
    { id: 2, data: 'test2' }
  ];

  test('Проверка запроса fulfilled', async () => {
    const store = configureStore({
      reducer: { orderNumberSlice }
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            orders: mockOrders
          })
      })
    ) as jest.Mock;

    await store.dispatch(orderByNumber(0));
    const states = store.getState().orderNumberSlice;
    expect(states.selectedOrders).toEqual(mockOrders);
  });
});
