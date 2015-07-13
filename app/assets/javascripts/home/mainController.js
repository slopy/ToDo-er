angular.module('todoer')

.controller('MainController', [
'$scope',
'$templateCache',
'$compile',
'$http',
'goals',
function($scope,$templateCache,$compile,$http,goals){
    
    goals.getAll()
      
    $scope.addGoal = function(){
        if(!$scope.title || $scope.title === '') { return; }
        if(!$scope.description || $scope.description === '') { return; }

        goals.create({
            title: $scope.title,
            description: $scope.description,
        });

        $scope.title = ""
        $scope.description = ""

        $.fancybox.close()

    }; // end of addGoal

    $scope.toggleActive = function(goal) {
      
        goals.toggleActiveState(goal)

    } // end of toggleActive

    $scope.toggleDone = function(goal) {
      
        goals.toggleDoneState(goal)
        
    } // end of toggleActive

    $scope.updateGoal = function(){
        goals.updateGoal({
          id: $scope.goal.id,
          title: $scope.goal.title,
          description: $scope.goal.description
          })

        $scope.goal = goals.goal
        $scope.goals = goals
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

    $scope.goal = goals.goal
    $scope.goals = goals

} // end of controller function

])