import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
import { login, register, logout } from "./actions";

interface UserState{
  user: TUser | null,
  isAuth : boolean,
  isAuthChecked : boolean, 
  userError: string | null,
  userRequest: boolean, 
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isAuthChecked: false,
  userError: '',
  userRequest: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) =>{
      state.isAuthChecked = action.payload
    }
  },
  extraReducers: (builder) =>{
    builder
    .addCase(register.pending, (state) => {
      state.userRequest = true, 
      state.userError = ''
    })
    .addCase(register.rejected, (state, action) => {
      state.userRequest = false;
      state.isAuthChecked = true;
      state.userError = action.error.message || null;
    })
    .addCase(register.fulfilled, (state, action) =>{
      state.user = action.payload
      state.isAuth = true;
      state.userRequest = false;
      state.isAuthChecked = true;
    })

    .addCase(login.pending, (state) => {
      state.userRequest = true, 
      state.userError = ''
    })
    .addCase(login.rejected, (state, action) => {
      state.userRequest = false;
      state.isAuthChecked = true;
      state.userError = action.error.message || null;
    })
    .addCase(login.fulfilled, (state, action) =>{
      state.user = action.payload
      state.isAuth = true;
      state.userRequest = false;
      state.isAuthChecked = true;
    })
    .addCase(logout.fulfilled, (state) =>{
      state.user = null
    })
    
  }
})

export default authSlice.reducer
export const {setUser, setIsAuthChecked} = authSlice.actions
