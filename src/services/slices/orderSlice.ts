import { TOrder } from '@utils-types';
import { TFeedsResponse, getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi, getFeedsApi } from '@api';
import { RootState } from '../store';

export interface InitialState {
  items: TOrder[];
  feed: TFeedsResponse | null;
  feedItems: TOrder[];
  modalOrder: TOrder | null;
  loading: boolean;
  error: string | undefined;
  orderRequest: boolean;
  orderModalData: null | TOrder;
}

const initialState: InitialState = {
  items: [],
  modalOrder: null,
  feedItems: [],
  feed: null,
  loading: false,
  error: undefined,
  orderRequest: false,
  orderModalData: null
};

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

export const getFeeds = createAsyncThunk('feed/get', async () => {
  const response = await getFeedsApi();
  return response;
});

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrder',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response;
  }
);

export const createOrder = createAsyncThunk(
  'orders/create',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderModalData(state) {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    getFeedItems: (state) => state.feedItems,
    getOrderItems: (state) => state.items,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.pending, (state, action) => {
        state.orderRequest = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.modalOrder = action.payload.orders[0];
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.feed = action.payload;
        state.feedItems = action.payload.orders;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.feed = null;
      });
  }
});

export const {
  getFeedItems,
  getOrderItems,
  getOrderRequest,
  getOrderModalData
} = orderSlice.selectors;
export const { resetOrderModalData } = orderSlice.actions;
export const orderReduce = orderSlice.reducer;
