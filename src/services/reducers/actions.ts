import { getIngredientsApi, getFeedsApi, loginUserApi, TLoginData, registerUserApi, TRegisterData, getUserApi, logoutApi } from '@api';


import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from './auth-slice';
import { getCookie, deleteCookie, setCookie } from '../../utils/cookie';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll', 
  async () =>{
    return getIngredientsApi();
  }
)

export const getFeeds = createAsyncThunk(
  'feeds/getAll',
  async () => {
    return getFeedsApi();
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}: TLoginData) => {
     const res = await loginUserApi({email, password})
     const accessToken = res.accessToken.split(' ')[1];
     
     localStorage.setItem('refreshToken', res.refreshToken);
     setCookie('accessToken', accessToken);
     return res.user
  }
)

export const checkUserAuth = createAsyncThunk(
  'auth/check',
  async (_, { dispatch }) => {
    console.log('debug1')
    if (getCookie('accessToken')) {
      try {
        console.log('debug2')
        const res = await getUserApi();
        dispatch(setUser(res.user));
      } catch (error) {
        console.log('debug3')
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

export const logout = createAsyncThunk(
  'auth/logout',
  async() =>{
    logoutApi();
    localStorage.removeItem('refreshToken'),
    deleteCookie('accessToken')
  })


export const register = createAsyncThunk(
  'auth/register',
  async ({email, password, name}: TRegisterData) => {
    const res = await registerUserApi({email, password, name});
    const accessToken = res.accessToken.split(' ')[1];

    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', accessToken);
    return res.user
  }
)
