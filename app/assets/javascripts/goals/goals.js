angular.module('todoer')

.factory('goals', [
	'$http',
	function($http){

	var obj = {
        goal: {},
        errors: {},

        goals: [],
        waiting_goals: [],
        active_goals: [],
        achieved_goals: []
		};

    obj.getAll = function() {
        return $http.get('/goals.json').success(function(data){
            angular.copy(data.goals, obj.goals);
            angular.copy(data.active_goals, obj.active_goals);
            angular.copy(data.waiting_goals, obj.waiting_goals);
            angular.copy(data.achieved_goals, obj.achieved_goals);
        }); // end of success
    }; // end of getAll

    obj.create = function(scope,goal) {
        return $http.post('/goals.json', goal).success(function(data,status){
            obj.goals.splice(0, 0,data)
            obj.waiting_goals.splice(0, 0,data)
            scope.errors = {}
            angular.copy({}, obj.errors)
            scope.title = ""
            scope.description = ""

            $.fancybox.close()
        }).error(function(data){
            angular.copy(data.errors, obj.errors)
            angular.copy(data.goal, obj.goal)

        });
    }

    obj.show = function(id) {
        return $http.get('/goals/' + id + '.json').success(function(data){
            obj.goal = data;
        })
    }
    
    obj.toggleActiveState =function(goal) {
        return $http.get('/active_change/' + goal.id + '.json').success(function(data){

            if (data.active == true) {
                obj.waiting_goals.splice(obj.waiting_goals.indexOf(goal), 1); 
                obj.active_goals.splice(0, 0,data)
            } else {
                obj.active_goals.splice(obj.active_goals.indexOf(goal), 1); 
                obj.waiting_goals.splice(0, 0,data)
            }
        })
    }

    obj.toggleDoneState =function(goal) {
        return $http.get('/done_change/' + goal.id + '.json').success(function(data){
             if (data.done == true) {
                obj.active_goals.splice(obj.active_goals.indexOf(goal), 1); 
                obj.achieved_goals.splice(0, 0,data)
            } else {
                obj.achieved_goals.splice(obj.achieved_goals.indexOf(goal), 1); 
                obj.active_goals.splice(0, 0,data)
            }
        })
    }

    obj.updateGoal = function(scope,goal){
        return $http.put('/goals/' + goal.id + '.json', data = {title: goal.title, description: goal.description})
        .success(function(data){
            
            if (data.goal.done == true) {
            obj.achieved_goals[findWithAttr(obj.achieved_goals,"id",data.goal.id)] = data.goal
            }
            else {
                if (data.goal.active == true) {
                    obj.active_goals[findWithAttr(obj.active_goals,"id",data.goal.id)] = data.goal
                } 
                else {
                    obj.waiting_goals[findWithAttr(obj.waiting_goals,"id",data.goal.id)] = data.goal
                }
            } 
            scope.errors = {}
            $.fancybox.close();

        }).error(function(data){
            
            scope.errors = data.errors
            angular.copy(data.goal, obj.goal)
        })
    } // edn of updateGoa


    function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
        }
    }

    return obj;

}]) // end of factory


