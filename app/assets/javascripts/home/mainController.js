angular.module('todoer')

.controller('MainController', [
'$scope',
'$templateCache',
'$compile',
'$http',
'goals',
function($scope,$templateCache,$compile,$http,goals){

	goals.getAll()

    $scope.goals = goals
    
    $scope.addGoal = function(){
        if(!$scope.title || $scope.title === '') { return; }
        if(!$scope.description || $scope.description === '') { return; }

        goals.create({
            title: $scope.title,
            description: $scope.description,
        });

        $scope.title = ""
        $scope.description = ""

        goals.getAll()

        $scope.goals = goals

        $.fancybox.close()

    }; // end of addGoal

    $scope.toggleActive = function(id) {
      
        goals.toggleActiveState(id)
        goals.getAll()

        $scope.goals = goals
        
    } // end of toggleActive

    $scope.toggleDone = function(id) {
      
        goals.toggleDoneState(id)
        goals.getAll()

        $scope.goals = goals
        
    } // end of toggleActive

    $scope.updateGoal = function(goal){
        return $http.put("/goals/" + goal.id + ".json",goal).success(function(data){
            angular.copy(data,$scope.goal)
            goals.getAll()
            $scope.goals = goals
        })
    } // edn of updateGoal

    $scope.editGoalClick = function(goal){
        $scope.goal = goal
        var content = $templateCache.get('goals/_modal_edit_goal.html')
        var template = $compile(content)($scope)


        $.fancybox.open([{ 
          content : template,
          title: "<h3 class='text-center'> Edit goal </h3>",
          helpers : { 
            title : {
              type: 'inside',
              position: 'top'
            }
          },
        }]); // end of fancybox

        $('#modal_edit_goal button').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).parent().hide();
            $.fancybox.close();
        });

    } // end of editGoalClick

    $scope.$on('$viewContentLoaded', function(event) {
      $("a.fancybox").click(function() {
        $.fancybox.open([{ 
          href : '#add_goal_form',
          title: "<h3 class='text-center'>Add mew Goal!</h3><br/>",
          helpers : { 
            title : {
              type: 'inside',
              position: 'top'
            }
          },
        }]); // end of fancybox 
      })  // end of click
    }); // end of $on('$viewContentLoaded'

} // end of controller function

])