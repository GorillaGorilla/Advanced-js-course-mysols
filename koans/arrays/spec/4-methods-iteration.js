/*global describe, expect, it, __*/
describe('Arrays - iteration methods', function () {
	it('1 - should understand filter', function () {
		var array = [1, 2, 3, 4, 5, 4, 3, 2, 1];
		expect(array.filter(function (element) {
			return element <= 3;
		})).toEqual([1,2,3,3,2,1]);
	});
	it('2 - should understand filter with this', function () {
		var array = [1, 2, 3, 4, 5, 4, 3, 2, 1], THIS = {};
		expect(array.filter(function (element) {
			if (this[element]) {
				return false;
			} else {
				this[element] = true;
				return true;
			}
			//return this[element] ? false : this[element] = true;
		}, THIS)).toEqual([1,2,3,4,5]);
		expect(THIS).toEqual({1: true,2: true,3: true,4: true,5: true});
	});
	it('3 - should understand forEach', function () {
		var array = [1, 2, 3, 4, 5], result = 0;
		array.forEach(function (element) {
			result += element;
		});
		expect(result).toBe(__);
	});
	it('4 - should understand forEach with this', function () {
		var array = [1, 2, 3, 4, 5, 4, 3, 2, 1], result = 0;
		array.forEach(function (element) {
			if (!this[element]) {
				result += element;
			}
			this[element] = true;
		}, {});
		expect(result).toBe(__);
	});
	it('5 - should understand every', function () {
		var array = [1, 2, 3, 4, 5];
		expect(array.every(function (element, index) {
			return element > index;
		})).toEqual(__);
	});
	it('6 - should understand map', function () {
		var array = ['Myamoto', 'Hattori', 'Dave'];
		expect(array.map(function (element, index) {
			return index + ' - ' + element;
		})).toEqual(__);
	});
	it('7 - should understand some', function () {
		var array = [1, 2, 3, 4, 5], isNegative = function (element) {
			return element < 0;
		};
		expect(array.some(isNegative)).toBe(__);
		array[2] = -array[2];
		expect(array.some(isNegative)).toBe(__);
	});
	it('8 - should understand reduce', function () {
		var array = [1, 2, 3, 4, 5], product = function (previousValue, currentValue) {
			return previousValue * currentValue;
		};
		expect(array.reduce(product, 1)).toBe(__);
	});
	it('9 - should understand reduceRight', function () {
		var array = [1, 2, 3, 4, 5], product = function (previousValue, currentValue) {
			return previousValue * currentValue;
		};
		expect(array.reduceRight(product, 1)).toBe(__);
	});
	it('10 - should understand map and reduce', function () {
		var result = new Array(10).join(',.').split(',')
			.map(function (value, index) {
				return index;
			})
			.reduce(function (previousValue, value) {
				return previousValue + value * value;
			}, 0);
		expect(result).toBe(__);
	});
	it('11 - should understand map and parseInt', function () {
		var result = ['1', '2', '3'].map(parseInt);
		var result2 = ['1', '2', '3'].map(function(element){return parseInt(element)})
		expect(result).toEqual([1,2,3]);

		//discuss with your pair
	});
});
