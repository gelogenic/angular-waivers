'use strict';

/* App Module */

var waiverApp = angular.module('waiverApp', [
  'ngRoute'
]);

waiverApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/waivers', {
        templateUrl: 'waivers/waivers-list.html',
        controller: 'WaiverListCtrl'
      }).
      otherwise({
        redirectTo: '/waivers'
      });
  }]);

waiverApp.controller('WaiverListCtrl', function($scope) {
  $scope.waivers = [
	
	{
		"uid": "8131",
		"state": "AL",
		"state_full_name": "Alabama",
		"program_name_and_number": "Alabama Individuals w/HIV/AIDS & Related Illnesses (40382.R02.00)",
		"topics": "",
		"waiver_authority": "1915 (c)",
		"status": "Approved",
		"status_order": "2",
		"summary": "Provides for case management, homemaker, personal care, respite, companion, skilled nursing for HIV/AIDS age 21 w/no max age",
		"approval_date": "10/01/2004",
		"effective_date": "10/01/2012",
		"expiration_date": "09/30/2017",
		"pending_documents": "",	
		"current_documents": [
			{
			  "current_document_date": "10/01/2012", 
			  "current_title": "Approved Application", 
			  "current_document_url": "http://www.medicaid.gov/Medicaid-CHIP-Program-Information/By-Topics/Waivers/Downloads/AL40382.zip"
			},
			{
			  "current_document_date": "10/01/2012", 
			  "current_title": "Waiver Description", 
			  "current_document_url": "http://www.medicaid.gov/Medicaid-CHIP-Program-Information/By-State/Waiver-Descript-Factsheet/AL-Waiver-Factsheet.html#AL40382"
			}
		],
		"administrative_documents": ""	

	}
  ];

  $scope.sortProp = 'status_order';
});