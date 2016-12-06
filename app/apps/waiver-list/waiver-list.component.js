'use strict';

/* Register `waiverList` component, along with its associated controller and template */
angular.
  module('waiverList', ['angular.filter','ngMaterial']).
	component('waiverList', {
		// take a look at the $templateRequest and $templateCache services for more info on how Angular manages external templates. 
		templateUrl: '/apps/waiver-list/waiver-list.template.html',
		controller: function WaiverListCtrl($http) {
			var self = this;
			self.sortProp = 'status_order';
			var waiversFullSet = [];//  used for reset when clearing all filters?
			self.waiversFiltered = [];// will hold full set of waiver entries minus any/all applied filters, not including keywords query
			var selected = false;// tracks when given filter reduces set
			var filterAfterUsStates = [];
			self.selectedUsStates = [];
			var filterAfterAuthorities = [];
			self.selectedAuthorities = [];
			var filterAfterStatus = [];
			self.selectedStatus = [];
			
			$http.get('/apps/data/waivers_faceted.json').then(function(response) {
				self.waivers = response.data;
				self.waiversFullSet = self.waivers.entries;// private clone of starting set (self.waivers.entries)
				self.waiversFiltered = self.waivers.entries;// initialize the set (self.waivers.entries) used in page display
				self.usStatesObj = self.waivers.usStatesFilterList;
				self.authoritiesObj = self.waivers.authorityFilterList;// CONST
				self.statusObj = self.waivers.statusFilterList;// CONST		
			self.pageSize = 15;
			self.currentPage = 1;
			//setItemsPerPage();
				self.checkAllUsStates();
				self.checkAllAuthorities();
				self.checkAllStatus();
			});

var setItemsPerPage = function() {
	self.options = [];
	self.options.push("all");
	self.options.push("25");
	self.options.push("10");
	self.selectedItem = self.options[2];
}// end setItemsPerPage

			self.clearFilters = function clearFilters() {
				self.keywords = '';
				self.sortProp = 'status_order';
				self.checkAllUsStates();
				self.checkAllAuthorities();
				self.checkAllStatus();
				filterByUsStates();
				//self.waiversFiltered = [];
				//self.waiversFiltered = waiversFullSet;
			} // end self.clearFilters

/* TO DO: 
- 'select all states' checkbox WORKING
- 'select all Waiver Authorities' checkbox WORKING
- 'select all status' checkbox WORKING
- added pagination references to index.html, but not using data-dir-paginate in template

Still to fix,
- Invoke pagination in waiver-list.template.html using 'data-dir-paginate' in place of 'data-ng-repeat'
- SHOULD Headline BE HARDCODED IN THIS TEMPLATE OR A VARIABLE GRABBING VALUE FROM JSON?
- SHOULD the opening paragraphs BE HARD-CODED IN THIS TEMPLATE OR A VARIABLE GRABBING VALUE FROM JSON? 

  */

			var filterByUsStates = function() {
				self.waiversFiltered=[];// this is the displayed set
				filterAfterUsStates = [];
				var entryAuthoritiesArr=[];
				filterAfterAuthorities = [];
				filterAfterStatus = [];
				selected = false;
				/* Being the first filter checked, must intiate w/ full set of waivers, else only reductive, never additive */
				if(self.waiversFullSet.length>0) {
					angular.forEach(self.waiversFullSet, function(waiverEntry, indexW){
						angular.forEach(self.selectedUsStates, function(usState, indexS){
							if(!selected){selected = true;}// found at lease one application of the filter
							if(waiverEntry.state_full_name === usState) {
								filterAfterUsStates.push(waiverEntry);
							}
						});
					});
				}
				if(!selected){
					filterAfterUsStates = waiversFullSet;
				}
				//self.waiversFiltered = filterAfterUsStates;
				
				//alert(filterAfterUsStates.length);
				//self.waiversFiltered=[];// this is the displayed set
				selected = false;
				if(filterAfterUsStates.length>0) {
					angular.forEach(filterAfterUsStates, function(waiverEntry, indexW){
						//waiverEntry.waiver_authority *** comma-separated string of values***
						entryAuthoritiesArr=[];
						entryAuthoritiesArr=waiverEntry.waiver_authority.split(",");
						angular.forEach(entryAuthoritiesArr, function(eaName, eaIndex){
							angular.forEach(self.selectedAuthorities, function(saName, indexS){
								if(!selected){selected = true;}// found at lease one application of the filter
								if(eaName === saName) {
									filterAfterAuthorities.push(waiverEntry);
								}
							});
						});
					});
				}
				if(!selected){
					filterAfterAuthorities = filterAfterUsStates;
				}
				
				selected = false;
				//alert(filterAfterAuthorities.length);
				if(filterAfterAuthorities.length>0) {
					//alert("before status LOOP");
					angular.forEach(filterAfterAuthorities, function(waiverEntry, indexW){
						angular.forEach(self.selectedStatus, function(theStatus, indexSt){
							if(!selected){selected = true;}// found at lease one application of the filter
							if(waiverEntry.status === theStatus) {
								filterAfterStatus.push(waiverEntry);
							}
						});
					});
				}
				if(!selected){
					filterAfterStatus = filterAfterAuthorities;
				}
				self.waiversFiltered = filterAfterStatus;
				
				return;
			}// end filterByUsStates()


/* U.S. States */
			self.checkAllUsStates = function() {
				var usStatesArr=[];
				self.selectedUsStates = [];
				angular.forEach(self.usStatesObj, function(usState, usIndex){
					usStatesArr.push(usState.state_full_name);
				});
				self.selectedUsStates = usStatesArr;
			}// end self.checkAllUsStates

			self.toggleUsStates = function (item, list) {
				// item: usstate.state_full_name, 
				// list: $ctrl.selectedUsStates
				var idx = list.indexOf(item);
				if (idx > -1) {
					list.splice(idx, 1);
				}
				else {
					list.push(item);
				}
				filterByUsStates();
				//filterByAuthorities();
			};// end self.toggleUsStates

			self.existsUsStates = function (item, list) {
				return list.indexOf(item) > -1;
			};// end self.existsUsStates

			self.isIndeterminateUsStates = function() {
				return (self.selectedUsStates.length !== 0 && self.selectedUsStates.length !== self.usStatesObj.length);
			};// end self.isIndeterminateUsStates

			self.isCheckedUsStates = function() {
				return self.selectedUsStates.length === self.usStatesObj.length;
			};// end self.isCheckedUsStates

			self.toggleUsStatesAll = function() {
				if (self.selectedUsStates.length === self.usStatesObj.length) {
					self.selectedUsStates = [];
				} else if (self.selectedUsStates.length === 0 || self.usStatesObj.length > 0) {
					self.checkAllUsStates();
				}
				filterByUsStates();
				//filterByAuthorities();
			};// end self.toggleUsStatesAll

/* Waiver Authorities */
			self.checkAllAuthorities = function() {
				var authoritiesArr=[];
				self.selectedAuthorities = [];
				angular.forEach(self.authoritiesObj, function(waAuth, waIndex){
					authoritiesArr.push(waAuth.Name);
				});
				self.selectedAuthorities = authoritiesArr;
			}// end self.checkAllAuthorities

			self.toggleAuthorities = function (item, list) {
				// item: waAuth.Name 
				// list: $ctrl.selectedAuthorities
				var idx = list.indexOf(item);
				if (idx > -1) {
					list.splice(idx, 1);
				}
				else {
					list.push(item);
				}
				filterByUsStates();
			};// end self.toggleAuthorities

			self.existsAuthorities = function (item, list) {
				return list.indexOf(item) > -1;
			};// end self.existsStatus

			self.isIndeterminateAuthorities = function() {
				return (self.selectedAuthorities.length !== 0 && self.selectedAuthorities.length !== self.authoritiesObj.length);
			};// end self.isIndeterminateAuthorities

			self.isCheckedAuthorities = function() {
				return self.selectedAuthorities.length === self.authoritiesObj.length;
			};// end self.isCheckedAuthorities

			self.toggleAuthoritiesAll = function() {
				if (self.selectedAuthorities.length === self.authoritiesObj.length) {
					self.selectedAuthorities = [];
				} else if (self.selectedAuthorities.length === 0 || self.authoritiesObj.length > 0) {
					self.checkAllAuthorities();
				}
				filterByUsStates();
			};// end self.toggleAuthoritiesAll

/* Status */
			self.checkAllStatus = function() {
				var statusArr=[];
				self.selectedStatus = [];
				angular.forEach(self.statusObj, function(stat, statIndex){
					statusArr.push(stat.Name);
				});
				self.selectedStatus = statusArr;
			}// end self.checkAllStatus

			self.toggleStatus = function (item, list) {
				// item: waStatus.Name 
				// list: $ctrl.selectedStatus
				var idx = list.indexOf(item);
				if (idx > -1) {
					list.splice(idx, 1);
				}
				else {
					list.push(item);
				}
				filterByUsStates();
			};// end self.toggleStatus

			self.existsStatus = function (item, list) {
				return list.indexOf(item) > -1;
			};// end self.existsStatus

			self.isIndeterminateStatus = function() {
				return (self.selectedStatus.length !== 0 && self.selectedStatus.length !== self.statusObj.length);
			};// end self.isIndeterminateStatus

			self.isCheckedStatus = function() {
				return self.selectedStatus.length === self.statusObj.length;
			};// end self.isCheckedStatus

			self.toggleAllStatus = function() {
				if (self.selectedStatus.length === self.statusObj.length) {
					self.selectedStatus = [];
				} else if (self.selectedStatus.length === 0 || self.statusObj.length > 0) {
					self.checkAllStatus();
				}
				filterByUsStates();
			};// end self.toggleAllStatus
		}
});