/*jslint nomen: true*/
/*global describe, expect, it, __*/
describe('function expression and function declaration', function () {
	it('1 - should understand function expression', function () {
		expect(typeof f).toBe('undefined');
		var f = function () {
			return 123;
		}, g = f;
		expect(typeof f).toBe('function');
		expect(f()).toBe(123);
		expect(f === g).toBe(true);
	});
	it('2 - should understand function declaration', function () {
		expect(typeof f).toBe('function');
		function f() {
			return 123;
		}
		expect(typeof f).toBe('function');
		expect(f()).toBe(123);
	});
	it('3 - should understand function declaration', function () {
		//Try running this test in IE 6-7 too; note different behaviour
		//Discuss with your pair
		var f, result;
		expect(typeof f).toBe('undefined');
		expect(typeof g).toBe('undefined');
		f = function g() {
			return 123;
		};
		expect(typeof f).toBe('function');
		expect(typeof g).toBe('undefined');
		expect(f()).toBe(123);
		try {
			result = g();
		} catch (error) {
			result = 'error';
		}
		expect(result).toBe('error');
		if (typeof g !== 'undefined') {
			expect(f === g).toBe(true);
		}
	});
	it('4 - should understand function declaration', function () {
		//Try running this test in IE 6-7 too
		//Discuss with your pair
		var result = 1;
		if (function f() {}) {
			result += typeof f;
		}
		expect(result).toBe('1undefined');
	});
	it('5 - should understand function expression and declaration', function () {
		var f = function factorial(number) {
			return number ? number * factorial(number - 1) : 1;
		}, result;
		try {
			result = f(3);
		} catch (error) {
			result = 'error';
		}
		expect(result).toBe(6);
		expect(typeof factorial).toBe('undefined');
	});
	it('6 - should understand the impact of anonymous functions on stack traces', function () {
		//uncomment the line below and run the test; check the call stack
		//debugger;
	});
	it('7 - should understand the impact of anonymous functions on stack traces', function noLongerAnonymousFunction() {
		//uncomment the line below and run the test; check the call stack; compare with previous one
		//debugger;
	});
});
