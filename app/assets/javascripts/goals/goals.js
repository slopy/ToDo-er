angular.module('todoer')

.factory('goals', [
	'$http',
	function($http){

	var obj = {
		goals: [],
        active_goals: [],
        waiting_goals: [],
        achieved_goals: [],
		};

	obj.getAll = function() {
		return $http.get('/goals.json').success(function(data){
			angular.copy(data, obj.goals);

            var active_goals = []
            var waiting_goals = []
            var achieved_goals = []

            angular.forEach(data ,function(goal){

                if (goal.done == true) {
                    achieved_goals.push(goal)
                } else {
                
                    if ((goal.active == true) && (goal.done != true)) {
                        active_goals.push(goal)
                    } else {
                        waiting_goals.push(goal)
                    }
              
                }
                
                angular.copy(active_goals, obj.active_goals);
                angular.copy(waiting_goals, obj.waiting_goals);
                angular.copy(achieved_goals, obj.achieved_goals);
            }) // end of foreach


		}); // end of success
	}; // end of getAll

	obj.create = function(goal) {
		return $http.post('/goals.json', goal).success(function(data){
			obj.goals.push(data);
		});
	};

    obj.show = function(id) {
        return $http.get('/goals/' + id + '.json').success(function(data){
            angular.copy(data, obj.goals);
        })
    }
	
    obj.toggleActiveState =function(id) {
        return $http.get('/active_change/' + id + '.json').success(function(data){
            angular.copy(data, obj.goals);
        })
    }

    obj.toggleDoneState =function(id) {
        return $http.get('/done_change/' + id + '.json').success(function(data){
            angular.copy(data, obj.goals);
        })
    }

	return obj;


}]) // end of factory


