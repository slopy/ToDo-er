angular.module('todoer')

.controller('MainController', [
'$scope',
'goals',
function($scope, goals){

	goals.getAll()

    $scope.goals = goals
    
<<<<<<< Updated upstream
=======
    goals.getAll()
    $scope.goal = goals.goal
    $scope.goals = goals
    $scope.errors = goals.errors
      
>>>>>>> Stashed changes
    $scope.addGoal = function(){
        if(!$scope.title || $scope.title === '') { return; }
        if(!$scope.description || $scope.description === '') { return; }

        goals.create({
            title: $scope.title,
            description: $scope.description,
        });

        $scope.goal = goals.goal
        $scope.goals = goals
        $scope.errors = goals.errors
      

        $scope.title = ""
        $scope.description = ""

<<<<<<< Updated upstream
        goals.getAll()

        $scope.goals = goals

        $.fancybox.close()
=======
        alert(Object.keys($scope.errors).length)
        
>>>>>>> Stashed changes

    }; // end of addGoal

    $scope.toggleActive = function(id) {
      
        goals.toggleActiveState(id)
        goals.getAll()

        $scope.goals = goals
        
    } // end of toggleActive

    $scope.toggleDone = function(id) {
      
        goals.toggleDoneState(id)
        goals.getAll()

<<<<<<< Updated upstream
        $scope.goals = goals
        
    } // end of toggleActive
=======
    } // edn of updateGoal

    $scope.editGoalClick = function(goal){
        var content = $templateCache.get('goals/_modal_edit_goal.html')
        var template = $compile(content)($scope)
        
        $scope.goal = angular.copy(goal)

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

        $('#modal_edit_goal .btn-warning').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).parent().hide();
            $.fancybox.close();
        });

    } // end of editGoalClick

    $scope.addNewGoalClick = function(event) {
        var content = $templateCache.get('goals/_modal_add_new_goal.html')
        var template = $compile(content)($scope)

        $.fancybox.open([{ 
          content : template,
          title: "<h3 class='text-center'>Add new Goal!</h3><br/>",
          helpers : { 
            title : {
              type: 'inside',
              position: 'top'
            }
          },
        }]); // end of fancybox 

    }; // end of addNewGoalClick


>>>>>>> Stashed changes

} // end of function

])