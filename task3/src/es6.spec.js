const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(!!dic, true);
        });

        it('словарь возвращает значение', () => {
            const dic = new core.Dictionary();
            dic.addItem("1", "one");
            assert.strictEqual(dic.getItem("1"), "one");
            assert.strictEqual(dic.getItem("2"), false);
        });

        it('словарь позволяет добавлять значения', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(dic.addItem("1", "one"), true);
            assert.strictEqual(dic.addItem(123, "one"), false);
            assert.strictEqual(dic.addItem("1", 1), false);
        });

        it('словарь позволяет удалять значения', () => {
            const dic = new core.Dictionary();
            dic.addItem("1", "one")
            dic.addItem("2", "two")
            assert.strictEqual(dic.deleteItem("1"), true);
            assert.strictEqual(dic.deleteItem("asd"), false);
            assert.strictEqual(dic.deleteItem(2), false);
        });

    });
});