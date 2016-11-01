/* tests in Jasmine v2.5.2 */

describe('waiverControllers', function() {

beforeEach(module('waiverApp'));

it('should create a 'waivers' model with 3 phones', inject(function($controller) {
var scope = {};
var ctrl = $controller('waiverControllers', {$scope: scope});

expect(scope.waivers.length).toBe(1);
});

});