/*jslint nomen: true*/
/*global beforeEach, describe, expect, it, __*/
describe('Retrieving properties', function () {
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
	it('1 - should know how to use . and [] operators to retrieve property values', function () {
		expect(samurai.name).toBe('Myamoto');
		expect(samurai['name']).toBe('Myamoto');
	});
	it('2 - should know that property names are case-sensitive', function () {
		expect(samurai.Name).toBe(undefined);
	});
	it('3 - should know how to use variable property name', function () {
		var propertyName = 'name';
		expect(samurai.propertyName).toBe(undefined);
		expect(samurai[propertyName]).toBe('Myamoto');
	});
	it('4 - should know default operator ||', function () {
		samurai.title = '';
		expect(samurai.address.city || 'unknown city').toBe('unknown city');
		expect(samurai.address.postcode || 'unknown postcode').toBe('18+');
		expect(samurai.title || 'Mr.').toBe('Mr.');
	});
	it('5 - should know guard operator &&', function () {
		var samurai2, samurai3 = {
			address: {
				postcode: '18+'
			}
		};
		expect(samurai && samurai.address && samurai.address.street).toBe('Samurai Way');
		expect(samurai2 && samurai2.address && samurai2.address.street).toBe(undefined);
		expect(samurai3 && samurai3.address && samurai3.address.street).toBe(undefined);
	});
	it('6 - should know how to combine default and guard operators', function () {
		var samurai2, samurai3 = {
			address: {
				postcode: '18+'
			}
		};
		expect(samurai && samurai.address && samurai.address.street || 'N/A').toBe('Samurai Way');
		expect(samurai2 && samurai2.address && samurai2.address.street || 'N/A').toBe('N/A');
		expect(samurai3 && samurai3.address && samurai3.address.street || 'N/A').toBe('N/A');
	});
	it('7 - should understand hasOwnProperty', function () {
		expect(samurai.hasOwnProperty('name')).toBe(true);
		expect(samurai.toString === undefined).toBe(false);
		expect(samurai.hasOwnProperty('toString')).toBe(false);
	});
	it('8 - should understand propertyIsEnumerable', function () {
		expect(samurai.propertyIsEnumerable('name')).toBe(true);
		expect(samurai.propertyIsEnumerable('toString')).toBe(false);
	});
});
