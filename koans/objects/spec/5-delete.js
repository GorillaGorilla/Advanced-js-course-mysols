/*jslint nomen: true*/
/*global beforeEach, describe, expect, it, window, __*/
var a = 1;
b = 2;
eval('var c = 3;');
eval('d = 4;');
describe('Delete', function () {
	var samurai;
	beforeEach(function () {
		samurai = {
			name: 'Myamoto',
			address: {
				street: 'Samurai Way',
				postcode: '18+'
			}
		};
	});
	it('1 - should understand delete operator', function () {
		var result;
		result = delete samurai.name;
		expect(result).toBe(true);
		expect(samurai.name).toBe(undefined);
	});
	it('2 - should understand delete operator vs. setting property value to undefined', function () {
		var object = {
			propertyName: 'propertyValue'
		}, properties, name;

		properties = '';
		object.propertyName = undefined;
		expect(object.propertyName).toBe(undefined);
		for (name in object) {
			properties += name;
		}
		expect(properties).toBe('propertyName');

		properties = '';
		delete object.propertyName;
		expect(object.propertyName).toBe(undefined);
		for (name in object) {
			properties += name;
		}
		expect(properties).toBe('');
		//Discuss this with your pair
		//Imagine using object as a read through cache - how would you manage the size of the cache?
	});
	it('3 - should understand how execution context affects delete operator', function () {
		expect(a).toBe(1);
		expect(window.a).toBe(1);
		expect(delete a).toBe(false);
		expect(b).toBe(2);
		expect(window.b).toBe(2);
		expect(delete b).toBe(true);
		expect(c).toBe(3);
		expect(window.c).toBe(3);
		expect(delete c).toBe(true);
		expect(d).toBe(4);
		expect(window.d).toBe(4);
		expect(delete d).toBe(true);
	});
	it('4 - should understand how execution context affects delete operator', function () {
		var e = 1;
		f = 2;
		eval('var g = 3;');
		eval('h = 4;');
		expect(e).toBe(1);
		expect(window.e).toBe(undefined);
		expect(delete e).toBe(false);
		expect(f).toBe(2);
		expect(window.f).toBe(2);
		expect(delete f).toBe(true);
		expect(g).toBe(3);
		expect(window.g).toBe(undefined);
		expect(delete g).toBe(true);
		expect(h).toBe(4);
		expect(window.h).toBe(4);
		expect(delete h).toBe(true);
	});
	it('5 - should understand delete operator', function () {
		samurai.samurai = samurai;
		delete samurai.samurai.samurai;
		expect(samurai.samurai).toBe(undefined);
	});
	it('6 - should understand delete operator', function () {
		samurai.samurai = samurai;
		delete samurai.samurai.name;
		expect(samurai.name).toBe(undefined);
	});
});
