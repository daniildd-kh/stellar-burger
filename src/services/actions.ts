import {
  getIngredientsApi,
  getFeedsApi,
  loginUserApi,
  TLoginData,
  registerUserApi,
  TRegisterData,
  getUserApi,
  logoutApi,
  updateUserApi,
  orderBurgerApi,
  getOrderByNumberApi,
  getOrdersApi
} from '@api';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from './reducers/auth-slice';
import { getCookie, deleteCookie, setCookie } from '../utils/cookie';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

export const getFeeds = createAsyncThunk('feeds/getAll', getFeedsApi);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: TLoginData) => {
    const res = await loginUserApi({ email, password });
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'auth/check',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      try {
        const res = await getUserApi();
        dispatch(setUser(res.user));
      } catch (error) {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      } finally {
        dispatch(setIsAuthChecked(true));
      }
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  logoutApi().then(() => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  });
});

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, name }: TRegisterData) => {
    const res = await registerUserApi({ email, password, name });
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res.user;
  }
);

export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const ordersUser = createAsyncThunk('user/orders', getOrdersApi);

export const orderByNumber = createAsyncThunk(
  'feeds/getByNumber',
  async (data: number) => {
    const res = await getOrderByNumberApi(data);
    return res.orders;
  }
);

export const orderBurger = createAsyncThunk(
  'order/burger',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res;
  }
);
