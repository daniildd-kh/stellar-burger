import { RootState } from "./store";

export const getErrorMessage = (state: RootState) => state.authSlice.userError;
export const getUser = (state:RootState) => state.authSlice.user;
