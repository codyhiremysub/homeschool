import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  message: undefined,
  mfaMessage: undefined,
  user_type: undefined,
  error: false,
  userId: undefined,
  user: {},
  token: undefined,
  email: undefined,
  resetMessage: undefined,
};

const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    login(state, action) {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    },
    logout(state) {
      Object.assign(state, initialState);
    },
    deleteAccount(state) {
      Object.assign(state, initialState);
    },
    mfaLogin(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = false;
      state.message = undefined;
      state.mfaMessage = undefined;
    },
    clearAuthMessages(state) {
      state.error = false;
      state.message = undefined;
      state.mfaMessage = undefined;
      state.resetMessage = undefined;
    },
    forgotPassword(state, action) {
      state.email = action.payload.email;
      state.loading = false;
      state.error = false;
      state.message = undefined;
      state.resetMessage = action.payload.message;
    },
    resetPasswordCode(state) {
      state.loading = false;
      state.error = false;
      state.message = undefined;
    },
    resendCode(state) {
      state.loading = false;
      state.error = false;
      state.message = undefined;
    },
    updateAccount(state, action) {
      state.user = action.payload;
    },
  },
});

export const {
  login,
  logout,
  deleteAccount,
  mfaLogin,
  clearAuthMessages,
  forgotPassword,
  resetPasswordCode,
  resendCode,
  updateAccount,
} = authSlice.actions;

export default authSlice.reducer;
