'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('waiverApp Application', function() {

  describe('waiverList', function() {

    beforeEach(function() {
      browser.get('waivers/index.html');
    });

    it('should filter the waivers list as a user types into the Keywords search box', function() {
      var waiverList = element.all(by.repeater('waiver in $ctrl.waivers'));
      var query = element(by.model('$ctrl.keywords'));

      expect(waiverList.count()).toBe(509);

      query.sendKeys('healthy');
      expect(waiverList.count()).toBe(14);

      query.clear();
      query.sendKeys('alabama');
      expect(waiverList.count()).toBe(11);
    });

    it('should be possible to control waiver list order via the drop-down menu', function() {
      //var queryField = element(by.model('$ctrl.keywords'));
      var orderSelect = element(by.model('$ctrl.sortProp'));
      var nameOption = orderSelect.element(by.css('option[value="state_full_name"]'));
      var waiverlistNameColumn = element.all(by.repeater('waiver in $ctrl.waivers').column('waiver.state'));

      function getNames() {
        return waiverlistNameColumn.map(function(elem) {
          return elem.getText();
        });
      }

      //queryField.sendKeys('tablet');   // Let's narrow the dataset to make the assertions shorter

      // expect an empty string followed by the state value b/c 'waiver.state' in template twice due to positioning with showMore/showLess
	  expect(getNames()).toEqual([
        '','State GA',
        '','State AL',
        '','State AL',
        '','State CT'
      ]);

      nameOption.click();

      // expect an empty string followed by the state value b/c 'waiver.state' in template twice due to positioning with showMore/showLess
	  expect(getNames()).toEqual([
        '','State AL',
        '','State AL',
        '','State CT',
        '','State GA'
      ]);
});

  });

});