import { configureStore } from '@reduxjs/toolkit';
import { getIngredients } from '../actions';
import ingredientsSlice from '../reducers/ingredients-slice';

describe('Проверка асинхронных запросов ingredients', () => {
  const store = configureStore({
    reducer: { ingredientsSlice }
  });

  const mockIngredients = [
    { id: 1, data: 'test1' },
    { id: 2, data: 'test2' }
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            data: []
          })
      })
    ) as jest.Mock;

    store.dispatch(getIngredients());
  });

  test('Проверка запроса pending', () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    store.dispatch(getIngredients());
    const states = store.getState().ingredientsSlice;
    expect(states.isLoading).toBe(true);
    expect(states.ingredients).toEqual([]);
    expect(states.error).toBeUndefined();
  });

  test('Проверка запроса fulfilled', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            data: mockIngredients
          })
      })
    ) as jest.Mock;

    await store.dispatch(getIngredients());
    const states = store.getState().ingredientsSlice;
    expect(states.ingredients).toEqual(mockIngredients);
    expect(states.isLoading).toBe(false);
    expect(states.error).toBeUndefined;
  });

  test('Проверка запроса reject', async () => {
    const errorMessage = 'Ошибка запроса';

    global.fetch = jest.fn(() =>
      Promise.reject(new Error(errorMessage))
    ) as jest.Mock;

    await store.dispatch(getIngredients());
    const states = store.getState().ingredientsSlice;
    expect(states.ingredients).toEqual([]);
    expect(states.isLoading).toBe(false);
    expect(states.error).toEqual(errorMessage);
  });
});
