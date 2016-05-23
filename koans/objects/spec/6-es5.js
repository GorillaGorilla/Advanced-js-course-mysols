describe('Some ES5 features', function () {
  it('should understand Object.create', function () {
    var numEnumerableProperties = 0,
      propertyName,
      myObject = Object.create({}, {
        firstName: {
          value: 'Myamoto',
          writable: true,
          enumerable: false,
          configurable: false
        }
      });
    expect(myObject.firstName).toBe('Myamoto');
    for (propertyName in myObject) {
      numEnumerableProperties++;
    }
    expect(numEnumerableProperties).toBe(0);
    try {
      myObject.firstName = 'Hattori';
    } catch (e) {
    }
    expect(myObject.firstName).toBe('Hattori');
    try {
      delete myObject.firstName;
    } catch (e) {
    }
    expect(myObject.firstName).toBe('Hattori');
  });
  it('should understand Object.seal', function () {
    var samurai = {
      name: 'Myamoto'
    };
    Object.seal(samurai);

    samurai.name = 'Hattori';
    expect(samurai.name).toBe('Hattori');

    samurai.address = '1 Ninja Way';
    expect(samurai.address).toBe(undefined);
  });
  it('should understand Object.freeze', function () {
    var samurai = {
      name: 'Myamoto'
    };
    Object.freeze(samurai);

    samurai.name = 'Hattori';
    expect(samurai.name).toBe('Myamoto');

    samurai.address = '1 Ninja Way';
    expect(samurai.address).toBe(undefined);
  });
});
