'use strict';
/* tests in Jasmine v2.5.2 */

describe('waiverList', function() {

// Load the module that contains the `waiverList` component before each test
beforeEach(module('waiverList'));

// Test the controller
describe('WaiverListCtrl', function() {
	var $httpBackend, ctrl;

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service and assign it to a variable with the same name
    // as the service while avoiding a name conflict.
	beforeEach(inject(function($componentController, _$httpBackend_) {
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('/apps/data/waivers_faceted.json').respond([{"uid": "8122", "state": "AL", "state_full_name": "Alabama", "program_name_and_number": "Alabama Plan First", "waiver_authority": "1115", "status": "Approved"}]);
		ctrl = $componentController('waiverList');
	}));

	it('should create a `waivers` property with 509 waiver records fetched using $http', function() {
		expect(ctrl.waivers).toBeUndefined();

		$httpBackend.flush();
		expect(ctrl.waivers).toEqual([{"uid": "8122", "state": "AL", "state_full_name": "Alabama", "program_name_and_number": "Alabama Plan First", "waiver_authority": "1115", "status": "Approved"}]);
	});

	it('should set a default value for the `sortProp` model', function() {
		expect(ctrl.sortProp).toBe('status_order');
	});

});

});