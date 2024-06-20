import { configureStore} from '@reduxjs/toolkit';
import { orderReduce, getOrders } from './orderSlice';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { expect, describe } from '@jest/globals';

// Мокируем API функцию
jest.mock('@api', () => ({
  getOrdersApi: jest.fn(),
}));

describe('Срез orderConstructor', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        orders: orderReduce,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Очищаем все моки после каждого теста
  });

  it('должен корректно обрабатывать успешный запрос getOrders', async () => {
    const mockOrders: TOrder[] = [
      { _id: '1', status: 'done', name: 'Order 1', createdAt: '2023-06-18T00:00:00Z', updatedAt: '2023-06-18T00:00:00Z', number: 1, ingredients: ['ingredient1', 'ingredient2'] },
      { _id: '2', status: 'pending', name: 'Order 2', createdAt: '2023-06-18T00:00:00Z', updatedAt: '2023-06-18T00:00:00Z', number: 2, ingredients: ['ingredient3', 'ingredient4'] },
    ];

    // Устанавливаем мок для getOrdersApi, чтобы вернуть успешный ответ
    (getOrdersApi as jest.Mock).mockResolvedValueOnce(mockOrders);

    // Диспатчим getOrders и ожидаем его выполнение
    await store.dispatch(getOrders());

    // Получаем текущее состояние хранилища
    const state = store.getState().orders;

    // Проверяем, что состояние хранилища обновилось правильно
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(false);
  });

  it('должен корректно обрабатывать ошибочный запрос getOrders', async () => {
    const errorMessage = 'Ошибка API';
    // Устанавливаем мок для getOrdersApi, чтобы вернуть ошибку
    (getOrdersApi as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Диспатчим getOrders и ожидаем его выполнение
    await store.dispatch(getOrders());

    // Получаем текущее состояние хранилища
    const state = store.getState().orders;

    // Проверяем, что состояние хранилища обновилось правильно
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(true);
  });
});
