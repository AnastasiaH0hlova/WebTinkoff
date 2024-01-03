"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    const fio_mas = fio.split(' ');
    return fio_mas[1] + ' ' + fio_mas[0];
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return Array.from(new Set(array))
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
// присмотритесь к методу .reduce
function calculateSalaryDifference(array) {
    if (!array.length) return false;

    const max = array.reduce(function(max, item) {
        return Math.max(item, max)

    })

    const min = array.reduce(function(min, item) {
        return Math.min(item, min)
    })

    return max / min;

}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor() {
        this.dictionary = new Map();
    }


    addWord(word, description) {
        if (word?.length && typeof (word) === "string" && description?.length && typeof (description) === "string") {
            this.dictionary.set(word, description);
            return true;
        }
        return false;
    }
    getWord(word) {
        if (word?.length && typeof (word) === "string") {
            return this.dictionary.get(word) ?? false;
        }
        return false;
    }
    deleteWord(word) {
        if (word?.length && typeof (word) === "string") {
            if(!this.dictionary.get(word)) return false;
            this.dictionary.delete(word)
            return true
        }
        return false;
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};