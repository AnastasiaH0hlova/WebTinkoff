//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    // n | 0 - побитовым ИЛИ отбрасываем дробную часть
    return (n | 0) === n
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    let arr = [];
    for (let i = 2; i <= 20; i += 2) {
        arr.push(i);
    }
    return arr;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let sum = 0;
    for (let i = 0; i <= n; ++i) {
        sum += i;
    }
    return sum
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    if (n === 1) return 1;
    return n + recSumTo(n - 1);
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    if (!n) return 1;
    return n * factorial(n - 1)
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    // Объяснение для меня, а то я не выкуплю в следующий раз, когда посмотрю код

    // для каждой степени 2 ровно 1 бит равен 1 (бит в индексе базы данных журнала этого числа-2). 
    // Таким образом, при вычитании из него 1 этот бит преобразуется в 0, а все предыдущие биты - в 1. 
    // Это делает эти 2 числа обратными друг другу, поэтому при их объединении мы получим 0 в результате.

    // decimal |   8 = 2**3   |  8 - 1 = 7   |   8 & 7 = 0
    // |                      |              |
    // binary  |   1 0 0 0    |   0 1 1 1    |    1 0 0 0
    // |                      |              |  & 0 1 1 1
    // index   |   3 2 1 0    |              |    -------
    //                                            0 0 0 0

    return !(n & (n - 1)) && n > 0;
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    if (n === 1 || n === 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2)
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    let storedValue = initialValue;
    return function(newValue) {

        if (operatorFn && typeof operatorFn === 'function') {
            storedValue = operatorFn(storedValue, newValue);
        }
        return storedValue;
    }
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
    let storedValue = start ?? 0;
    storedValue -= step ?? 1;

    return function() {
        return storedValue += step ? ? 1;
    }

}


/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {

    // проверяем точное равенство объектов (являются ли они одним и тем же)
    if (Object.is(firstObject, secondObject))
        return true;

    // если не являются объектами, то проверяем два примитивных типа
    if (firstObject !== Object(firstObject) && secondObject !== Object(secondObject))
        return firstObject === secondObject;

    // если два переданных параметра являются объектами
    if ((typeof firstObject == "object" && firstObject != null) && (typeof secondObject == "object" && secondObject != null)) {

        // проверяем количество свойств у каждого из них
        if (Object.keys(firstObject).length != Object.keys(secondObject).length)
            return false;

        // сравниваем каждое свойство первого объекта с каждым свойством второго
        for (let prop in firstObject) {
            if (secondObject.hasOwnProperty(prop)) {
                // также вызываем deepEqual (вдруг свойства объекта являются другие объекты)
                if (!deepEqual(firstObject[prop], secondObject[prop]))
                    return false;
            } else
                return false;
        }

        return true;

    }

    return false;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
