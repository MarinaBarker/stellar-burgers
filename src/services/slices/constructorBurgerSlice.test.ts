import {
    burgerReduce,
    ConstructorBurgerState,
    addBurger,
    removeBurger,
    moveUpIngredient,
    moveDownIngredient,
    clearBurger
  } from './constructorBurgerSlice';
  
  const bun = {
    id: '1',
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
  };
  
  const ingredient1 = {
    id: 2,
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
  };
  
  const ingredient2 = {
    id: '3',
    calories: 442,
    carbohydrates: 2,
    fat: 140,
    image: 'https://code.s3.yandex.net/react/code/meat-05.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-05-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-05-mobile.png',
    name: 'Ингредиент 2',
    price: 44,
    proteins: 420,
    type: 'main',
    __v: 0,
    _id: '3'
  };
  
  describe('Тестирование работы среза конструктора бургера', () => {
    const initialState: ConstructorBurgerState = {
        bun: null,
        ingredients: []
    };
  
    it('проверка добавления булки', () => {
      const currentState = burgerReduce(
        initialState,
        addBurger(bun)
      );
  
      expect(currentState.bun).toEqual(bun);
    });
  
    it('проверка добавления начинки', () => {
      const currentState = burgerReduce(
        initialState,
        addBurger(ingredient1)
      );
  
      expect(currentState.ingredients[0]).toEqual(ingredient1);
    });
  
    it('проверка удаления начинки', () => {
      const initialState: ConstructorBurgerState = {
          bun: null,
          ingredients: [{ ...ingredient1, id: '123' }]
      };
  
      const currentState = burgerReduce(
        initialState,
        removeBurger(0)
      );
  
      expect(currentState.ingredients).toEqual([]);
    });
  
    it('проверка перемещения ингредиента вверх', () => {
      const initialState: ConstructorBurgerState = {
          bun: null,
          ingredients: [
            { ...ingredient1, id: '1' },
            { ...ingredient2, id: '2' }
          ]
      };
  
      const currentState = burgerReduce(
        initialState,
        moveUpIngredient(1)
      );
  
      expect(currentState.ingredients).toEqual([
        { ...ingredient2, id: '2' },
        { ...ingredient1, id: '1' }
      ]);
    });
  
    it('проверка перемещения ингредиента вниз', () => {
      const initialState: ConstructorBurgerState = {
          bun: null,
          ingredients: [
            { ...ingredient1, id: '1' },
            { ...ingredient2, id: '2' }
          ]
      };
  
      const currentState = burgerReduce(
        initialState,
        moveDownIngredient(0)
      );
  
      expect(currentState.ingredients).toEqual([
        { ...ingredient2, id: '2' },
        { ...ingredient1, id: '1' }
      ]);
    });
  
    it('проверка очистки ', () => {
      const initialState: ConstructorBurgerState = {
          bun: bun,
          ingredients: [
            { ...ingredient1, id: '1' },
            { ...ingredient2, id: '2' }
          ]
      };
  
      const currentState = burgerReduce(
        initialState,
        clearBurger()
      );
  
      expect(currentState).toEqual({
        bun: null,
        ingredients: []
      });
    });
  });
