'use strict';
/* tests in Jasmine v2.5.2 */

describe('waiverList', function() {

// Load the module that contains the `waiverList` component before each test
beforeEach(module('waiverList'));

// Test the controller
describe('WaiverListCtrl', function() {
	var ctrl;

    beforeEach(inject(function($componentController) {
      ctrl = $componentController('waiverList');
	}));

	it('should create a `waivers` model with 4 waiver records', function() {
		expect(ctrl.waivers.length).toBe(4);
	});

	it('should set a default value for the `sortProp` model', function() {
		expect(ctrl.sortProp).toBe('status_order');
	});

});

});