import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';

export interface ConstructorBurgerState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: ConstructorBurgerState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action) {
      state.bun = action.payload;
    },
    addBurger: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({ ...action.payload });
      }
    },
    removeBurger(state, action) {
      state.ingredients.splice(action.payload, 1);
    },
    handleBurgerPosition: (state, action) => {
      const { index, step } = action.payload;
      [state.ingredients[index], state.ingredients[index + step]] = [
        state.ingredients[index + step],
        state.ingredients[index]
      ];
    },
    moveUpIngredient: (state, action) => {
      const ingredient = state.ingredients[action.payload];

      state.ingredients.splice(action.payload, 1);
      state.ingredients.splice(action.payload - 1, 0, ingredient);
    },
    moveDownIngredient: (state, action) => {
      const ingredient = state.ingredients[action.payload];

      state.ingredients.splice(action.payload, 1);
      state.ingredients.splice(action.payload + 1, 0, ingredient);
    },
    clearBurger: (state) => (state = initialState)
  },
  selectors: {
    getConstructor: (state) => state
  }
});

export const { getConstructor } = burgerConstructorSlice.selectors;
export const {
  addBurger,
  removeBurger,
  clearBurger,
  handleBurgerPosition,
  setBun,
  moveDownIngredient,
  moveUpIngredient
} = burgerConstructorSlice.actions;
export const burgerReduce = burgerConstructorSlice.reducer;
