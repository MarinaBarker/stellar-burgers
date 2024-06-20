import { TUser } from '@utils-types';
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  TRegisterData,
  getUserApi,
  TLoginData,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { setCookie } from '../../utils/cookie';
import { RootState } from '../store';

export interface TUserState {
  user: TUser;
  isAuth: boolean;
  isAuthChecked: boolean;
  error: string | null;
}

export const initialState: TUserState = {
  user: {
    email: '',
    name: ''
  },
  error: null,
  isAuth: false,
  isAuthChecked: false
};

export const register = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const login = createAsyncThunk(
  'users/loginUser',
  async (data: TLoginData) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response;
    } catch (error) {
      console.log('Неудалось войти. Ошибка:', error);
      throw error;
    }
  }
);

export const apiGetUser = createAsyncThunk('users/getUser', async () => {
  const response = await getUserApi();
  return response;
});

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user: TRegisterData) => {
    const response = await updateUserApi(user);
    return response;
  }
);

export const logout = createAsyncThunk('users/logoutUser', async () => {
  const response = await logoutApi();
  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    getUser: (state, action) => {
      state.user = action.payload;
    }
  },
  selectors: {
    isAuth: (state) => state.isAuth
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(register.pending, (state) => {
        state.error = '';
      });

    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = false;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
        state.error = '';
      });
    builder
      .addCase(apiGetUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = '';
      })
      .addCase(updateUser.pending, (state) => {
        state.error = '';
      });
    builder
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.user = { email: '', name: '' };
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = '';
      })
      .addCase(logout.pending, (state, action) => {
        state.error = null;
      });
  }
});

export const { isAuth } = userSlice.selectors;
export const { authChecked, getUser } = userSlice.actions;
export const getUserSelector = (store: RootState) => store.user.user;
export const userReduce = userSlice.reducer;
