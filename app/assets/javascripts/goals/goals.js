app.factory('goals', [
'$http',
'versionUrl',
function($http,versionUrl){

	var obj = {
        goal: {},
        prev_goal: {},
        next_goal: {},
        errors: {},

        goals: [],
        waiting_goals: [],
        active_goals: [],
        achieved_goals: [],
        categories: []
		};

    obj.getAll = function() {
        return $http.get('/api/' + versionUrl + 'goals.json').success(function(data){
            angular.copy(data.goals, obj.goals);
            angular.copy(data.active_goals, obj.active_goals);
            angular.copy(data.waiting_goals, obj.waiting_goals);
            angular.copy(data.achieved_goals, obj.achieved_goals);
            angular.copy(data.categories, obj.categories);
        }); // end of success
    }; // end of getAll

    obj.create = function(scope,goal) {
        return $http.post('/api/' + versionUrl + 'goals.json', goal).success(function(data,status){

            obj.goals.splice(0, 0,data)
            obj.waiting_goals.splice(0, 0,data)
            scope.errors = {}
            angular.copy({}, obj.errors)
            scope.title = ""
            scope.description = ""
            scope.category = ""

            obj.categories.push(data.category)

            var objs = obj.categories.map(function(obj){
              return obj.title
            })
            scope.categories = objs

            $.fancybox.close()
        }).error(function(data){
            angular.copy(data.errors, obj.errors)
            angular.copy(data.goal, obj.goal)
            console.log(JSON.stringify(data.errors))

        });
    } // end of create

    obj.show = function(id) {
        return $http.get('/api/' + versionUrl + 'goals/' + id + '.json').success(function(data){
            
            angular.copy(data, obj.goal)
            angular.copy(obj.set_prev_goal(), obj.prev_goal)
            angular.copy(obj.set_next_goal(), obj.next_goal)
        })
    } // end of show
    
    obj.toggleActiveState =function(goal) {
        return $http.get('/api/' + versionUrl + 'active_change/' + goal.id + '.json').success(function(data){

            if (data.active == true) {
                obj.waiting_goals.splice(obj.waiting_goals.indexOf(goal), 1); 
                obj.active_goals.splice(0, 0,data)
            } else {
                obj.active_goals.splice(obj.active_goals.indexOf(goal), 1); 
                obj.waiting_goals.splice(0, 0,data)
            }
        })
    } // end of toggle active state

    obj.toggleDoneState =function(goal) {
        return $http.get('/api/' + versionUrl + 'done_change/' + goal.id + '.json').success(function(data){
             if (data.done == true) {
                obj.active_goals.splice(obj.active_goals.indexOf(goal), 1); 
                obj.achieved_goals.splice(0, 0,data)
            } else {
                obj.achieved_goals.splice(obj.achieved_goals.indexOf(goal), 1); 
                obj.active_goals.splice(0, 0,data)
            }
        })
    } // end of toggle done state

    obj.updateGoal = function(scope,goal){

        return $http.put('/api/' + versionUrl + 'goals/' + goal.id + '.json', goal)
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

            obj.categories.push(data.category)

            var objs = obj.categories.map(function(obj){
              return obj.title
            })
            scope.categories = objs

            $.fancybox.close();

        }).error(function(data){
            
            scope.errors = data.errors
            angular.copy(data.goal, obj.goal)
        })
        return obj
    } // edn of updateGoa

    obj.set_prev_goal = function(){

        if (obj.goal.active == false){
            indexOfPrev = findWithAttr(obj.waiting_goals,"id",obj.goal.id) - 1
            return obj.waiting_goals[indexOfPrev]
        }

        if ((obj.goal.active == true) && (obj.goal.done == false)){
            indexOfPrev = findWithAttr(obj.active_goals,"id",obj.goal.id) - 1
            return obj.active_goals[indexOfPrev]
        }

        if (obj.goal.done == true){
            indexOfPrev = findWithAttr(obj.achieved_goals,"id",obj.goal.id) - 1
            return obj.achieved_goals[indexOfPrev]
        }

        return {}
    } // end of set_prev_goal

    obj.set_next_goal = function(){
 
        if (obj.goal.active == false){
            indexOfPrev = findWithAttr(obj.waiting_goals,"id",obj.goal.id) + 1
            return obj.waiting_goals[indexOfPrev]
        }

        if ((obj.goal.active == true) && (obj.goal.done == false)){
            indexOfPrev = findWithAttr(obj.active_goals,"id",obj.goal.id) + 1
            return obj.active_goals[indexOfPrev]
        }

        if (obj.goal.done == true){
            indexOfPrev = findWithAttr(obj.achieved_goals,"id",obj.goal.id) + 1
            return obj.achieved_goals[indexOfPrev]
        }

        return {}

    } // end of set_next_goal

    obj.getCategories = function(){
        return $http.get('/api/' + versionUrl + 'categories.json').success(function(date){
            angular.copy(data[0],obj.categories)
        }).error(function(data){
        })
        return {}
    } // end of getCategories

    function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
        }
    } // helper method

    return obj
}]) // end of factory


