'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('waiverApp Application', function() {

  describe('waiverList', function() {

    beforeEach(function() {
      browser.get('/waivers/index.html');
    });

    it('should filter the waivers list as a user types into the Keywords search box', function() {
      var waiverList = element.all(by.repeater('waiver in $ctrl.waivers'));
      var query = element(by.model('$ctrl.keywords'));

      expect(waiverList.count()).toBe(4);

      query.sendKeys('healthy');
      expect(waiverList.count()).toBe(1);

      query.clear();
      query.sendKeys('alabama');
      expect(waiverList.count()).toBe(2);
    });

  });

});