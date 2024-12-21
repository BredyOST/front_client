// Импортируем тестируемые функции
import { getThisCookie, destroyThisCookie } from '@/helpers/lib/cookie/cookie';
// Подключаем моки
import {parseCookies, destroyCookie} from 'nookies';
// Мокаем зависимости
jest.mock('nookies', () => ({
    parseCookies: jest.fn(),
    destroyCookie: jest.fn()
}));

describe('Cookie helper functions', () => {
    beforeEach(() => {
        // Очистим моки перед каждым тестом
        jest.clearAllMocks();
    });

    test('getThisCookie should call parseCookies and return its result', () => {
        // Задаем возвращаемое значение для parseCookies
        (parseCookies as jest.Mock).mockReturnValue({ testCookie: 'value' });
        const result = getThisCookie();
        // Проверяем, что parseCookies была вызвана
        expect(parseCookies).toHaveBeenCalledTimes(1);
        // Проверяем результат
        expect(result).toEqual({ testCookie: 'value' });
    });

    test('destroyThisCookie should call destroyCookie with correct arguments', () => {
        // Аргументы для destroyThisCookie
        const name = 'testCookie';
        const path = '/';

        // Вызываем destroyThisCookie
        destroyThisCookie(null, name, path);

        // Проверяем, что destroyCookie была вызвана с правильными аргументами
        expect(destroyCookie).toHaveBeenCalledWith(null, name, path);
    });
});
