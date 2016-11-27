'use strict';

describe('flights E2E Tests:', function () {
  describe('Test flights page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3000/flights');
      expect(element.all(by.repeater('flight in flights')).count()).toEqual(0);
    });
  });
});
