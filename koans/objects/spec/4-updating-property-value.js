/*jslint nomen: true*/
/*global beforeEach, describe, expect, it, __*/
describe('Updating property value', function () {
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
	it('1 - should know how to update primitive values', function () {
		var samurai2 = {
			name: samurai.name
		};
		samurai2.name = 'Hattori';
		expect(samurai2.name).toBe('Hattori');
		expect(samurai.name).toBe('Myamoto');
	});
	it('2 - should know how to update object values', function () {
		var samurai2 = {
			address: samurai.address
		};
		samurai2.address.street = 'Ninja Way';
		expect(samurai2.address.street).toBe('Ninja Way');
		expect(samurai.address.street).toBe('Ninja Way');
	});
	it('3 - should understand references', function () {
		samurai.samurai = samurai;
		expect(samurai.samurai.samurai.samurai.samurai.name).toBe('Myamoto');
	});
});