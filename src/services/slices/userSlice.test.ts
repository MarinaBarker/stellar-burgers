import { userReduce, authChecked, getUser } from './userSlice';

describe('редьюсер слайса user', () => {
  const initialState = {
    isAuth: false,
    isAuthChecked: false,
    user: {
      email: '',
      name: ''
    },
    error: null
  };

  test('проверка аутентификации', () => {
    const newState = userReduce(initialState, authChecked());
    const { isAuthChecked } = newState;
    expect(isAuthChecked).toBe(true);
  });

  test('установка пользователя', () => {
    const expectedResult = {
      name: 'Name',
      email: 'test@mail.ru'
    };
    const newState = userReduce(
      initialState,
      getUser(expectedResult)
    );
    const { user } = newState;
    expect(user).toEqual(expectedResult);
  });

  test('регистрация пользователя', () => {
    const expectedResult = {
      name: 'Name',
      email: 'example@mail.ru'
    };
    const action = {
      type: 'user/registerUser/fulfilled',
      payload: expectedResult
    };
    const newState = userReduce(initialState, action);
    expect(newState).toEqual(initialState);
  });

  test('вход пользователя', () => {
    const expectedResult = {
      name: 'Name',
      email: 'example@mail.ru'
    };
    const action = {
      type: 'user/loginUser/fulfilled',
      payload: expectedResult
    };
    const newState = userReduce(initialState, action);
    const { user } = newState;
    expect(user).toEqual(initialState.user);
  });

  test('обновление данных пользователя', () => {
    const expectedResult = {
      name: 'Name',
      email: 'example@mail.ru'
    };
    const action = {
      type: 'user/updateUser/fulfilled',
      payload: { user: expectedResult, success: true }
    };
    const newState = userReduce(initialState, action);
    const { user } = newState;
    expect(user).toEqual(initialState.user);
  });

  test('выход пользователя', () => {
    const action = {
      type: 'user/logout/fulfilled'
    };
    const newState = userReduce(initialState, action);
    const { user } = newState;
    expect(user).toBe(initialState.user);
  });
});
