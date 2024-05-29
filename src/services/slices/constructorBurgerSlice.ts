import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';

export interface ConstructorBurgerState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorBurgerState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBurger: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({ ...action.payload });
      }
    },
    removeBurger: (state, action) => {
      const { index } = action.payload;
      state.ingredients.splice(index, 1);
    },
    handleBurgerPosition: (state, action) => {
      const { index, step } = action.payload;
      [state.ingredients[index], state.ingredients[index + step]] = [
        state.ingredients[index + step],
        state.ingredients[index]
      ];
    },
    clearBurger: (state) => (state = initialState)
  },
  selectors: {
    getConstructor: (state) => state
  }
});

export const { getConstructor } = burgerConstructorSlice.selectors;
export const { addBurger, removeBurger, clearBurger, handleBurgerPosition } =
  burgerConstructorSlice.actions;
export const burgerReduce = burgerConstructorSlice.reducer;
