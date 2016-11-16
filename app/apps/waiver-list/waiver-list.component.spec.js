'use strict';
/* tests in Jasmine v2.5.2 */

describe('waiverList', function() {

// Load the module that contains the `waiverList` component before each test
beforeEach(module('waiverList'));

// Test the controller
describe('WaiverListCtrl', function() {

it('should create a `waivers` model with 4 waiver records', inject(function($componentController) {

var ctrl = $componentController('waiverList');

expect(ctrl.waivers.length).toBe(4);
expect(ctrl.sortProp).toBe('status_order');
}));

});

});