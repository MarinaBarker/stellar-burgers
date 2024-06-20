import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { RootState } from '../store';

export interface FeedState {
  error: boolean;
  loading: boolean;
  total: number;
  orders: TOrder[];
  totalToday: number;
}

export const initialState: FeedState = {
  error: false,
  loading: false,
  total: 0,
  orders: [],
  totalToday: 0
};

export const getFeeds = createAsyncThunk('feed/get', async () => getFeedsApi());

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        //state.error = null;
        state.error = false;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        //state.error = action.error.message as string;
        state.error = true;
      });
  }
});

export const feedReduce = feedSlice.reducer;
export const getFeedOrders = (state: RootState) => state.feed.orders;
export const getFeedTotal = (state: RootState) => state.feed.total;
export const getFeedTotalToday = (state: RootState) => state.feed.totalToday;
