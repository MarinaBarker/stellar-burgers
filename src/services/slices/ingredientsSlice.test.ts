import { ingredientsReduce, TIngredientState, getIngredients } from './ingredientsSlice';

const ingredientsData = [
  {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Булка 1',
    price: 1255,
    proteins: 80,
    type: 'bun',
    __v: 0,
    _id: '1'
  },
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Ингредиент 1',
    price: 424,
    proteins: 420,
    type: 'main',
    __v: 0,
    _id: '2'
  }
];

describe('Тестирование работы среза ингредиентов', () => {
  const initialState: TIngredientState = {
    ingredients: [],
    loading: false,
    status: 'idle',
    error: null
  };

  it('проверка изменения статуса запроса и ошибки при pending', () => {
    const currentState = ingredientsReduce(
      { ...initialState, error: 'Error message' },
      getIngredients.pending('')
    );

    expect(currentState).toEqual({
      ...initialState,
      status: 'loading',
      error: null,
      loading: true
    });
  });

  it('проверка изменения статуса запроса и ошибки при rejected', () => {
    const currentState = ingredientsReduce(
      { ...initialState, status: 'loading' },
      getIngredients.rejected(new Error('Error message'), '')
    );

    expect(currentState).toEqual({
      ...initialState,
      status: 'failed',
      error: 'Error message',
      loading: false
    });
  });

  it('проверка изменения статуса запроса, ошибки, сохранения ингредиентов при fulfilled', () => {
    const currentState = ingredientsReduce(
      {
        ...initialState,
        error: 'Error message',
        status: 'loading'
      },
      getIngredients.fulfilled(ingredientsData, '')
    );

    expect(currentState).toEqual({
      ...initialState,
      ingredients: ingredientsData,
      status: 'success',
      error: null
    });
  });
});
