import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type TIngredientState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
  status: 'failed' | 'success' | 'loading' | 'idle';
};

export const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null,
  status: 'idle'
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: (state) => state.ingredients,
    getLoadingIngredients: (state) => state.loading,

    getIngredientsBuns: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    getIngredientsMains: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    getIngredientsSauces: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.status = 'failed';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ingredients = action.payload;
        state.status = 'success';
      });
  }
});

export const {
  getLoadingIngredients,
  getIngredientsState,
  getIngredientsBuns,
  getIngredientsMains,
  getIngredientsSauces
} = ingredientSlice.selectors;
export const ingredientsReduce = ingredientSlice.reducer;
