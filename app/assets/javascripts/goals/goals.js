angular.module('todoer')

.factory('goals', [
	'$http',
	function($http){

	var obj = {
		goals: []
		};
	
	obj.getAll = function() {
		return $http.get('/goals.json').success(function(data){
			angular.copy(data, obj.goals);
		});
	};

	obj.create = function(goal) {
		return $http.post('/goals.json', goal).success(function(data){
			obj.goals.push(data);
		});
	};

	return obj;

}]) // end of factory


