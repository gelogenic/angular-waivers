'use strict';

// Register `waiverList` component, along with its associated controller and template */
angular.
  module('waiverList', []).
	component('waiverList', {
		// take a look at the $templateRequest and $templateCache services for more info on how Angular manages external templates. 
		templateUrl: '/apps/waiver-list/waiver-list.template.html',
		controller: function WaiverListCtrl($http) {
			var self = this;
			self.sortProp = 'status_order';
			self.clearFilters = function clearFilters() {
				self.keywords = '';
				self.sortProp = 'status_order';
			};
			
			$http.get('/apps/data/waivers_faceted.json').then(function(response) {
				self.waivers = response.data;
			});

		}
});