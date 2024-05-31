import { configureStore } from '@reduxjs/toolkit';
import { getFeeds } from '../actions';
import feedsSlice from '../reducers/feeds-slice';

describe('Проверка асинхронных запросов feeds', () => {
  const mockOrders = [
    { id: 1, data: 'test1' },
    { id: 2, data: 'test2' }
  ];

  test('Проверка запроса pending', () => {
    const store = configureStore({
      reducer: { feedsSlice }
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    store.dispatch(getFeeds());
    const states = store.getState().feedsSlice;
    expect(states.isLoading).toBe(true);
    expect(states.orders).toBeNull();
    expect(states.error).toBeUndefined();
  });

  test('Проверка запроса fulfilled', async () => {
    const store = configureStore({
      reducer: { feedsSlice }
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

    await store.dispatch(getFeeds());
    const states = store.getState().feedsSlice;
    expect(states.orders?.orders).toEqual(mockOrders);
    expect(states.isLoading).toBe(false);
    expect(states.error).toBeUndefined;
  });

  test('Проверка запроса reject', async () => {
    const store = configureStore({
      reducer: { feedsSlice }
    });

    const errorMessage = 'Ошибка запроса';

    global.fetch = jest.fn(() =>
      Promise.reject(new Error(errorMessage))
    ) as jest.Mock;

    await store.dispatch(getFeeds());
    const states = store.getState().feedsSlice;
    expect(states.orders).toBeNull;
    expect(states.isLoading).toBe(false);
    expect(states.error).toEqual(errorMessage);
  });
});
