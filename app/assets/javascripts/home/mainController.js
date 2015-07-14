angular.module('todoer')

.controller('MainController', [
'$scope',
'$templateCache',
'$compile',
'$http',
'goals',
function($scope,$templateCache,$compile,$http,goals){
    
    goals.getAll()
    $scope.goal = goals.goal
    $scope.goals = goals
    $scope.errors = goals.errors
      
    $scope.addGoal = function(){

        goals.create($scope,{
            title: $scope.title,
            description: $scope.description,
        });

    }; // end of addGoal

    $scope.toggleActive = function(goal) { 
        goals.toggleActiveState(goal)

    } // end of toggleActive

    $scope.toggleDone = function(goal) {
        goals.toggleDoneState(goal)
        
    } // end of toggleActive

    $scope.updateGoal = function(){
        goals.updateGoal($scope,{
          id: $scope.goal.id,
          title: $scope.goal.title,
          description: $scope.goal.description
          })

    } // edn of updateGoal

    $scope.editGoalClick = function(goal){
        $scope.errors = {}
        $scope.goal = angular.copy(goal)

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

        $('#modal_edit_goal .btn-warning').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).parent().hide();
            $.fancybox.close();
        });

    } // end of editGoalClick

     $scope.addNewGoalClick = function() {
        // $scope.errors = {}

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

} // end of controller function

])