app.controller('MainController', [
'$scope',
'$templateCache',
'$compile',
'$http',
'goals',
function($scope, $templateCache,$compile,$http,goals){
    goals.getAll()
    $scope.goal = goals.goal
    $scope.goals = goals
    $scope.errors = goals.errors
    $scope.category = {}

    var objs = goals.categories.map(function(obj){
      return obj.title
    })
    $scope.categories = objs

    $scope.updateCategories = function(typed){
        return $scope.movies
    }

    $scope.addGoal = function(){
        goals.create($scope,{
            title: $scope.title,
            description: $scope.description,
            category: $scope.category.title
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
          description: $scope.goal.description,
          category: $scope.goal.category.title
          })
    } // edn of updateGoal

    $scope.editGoalClick = function(goal){
        $scope.errors = {}

        goals.show(goal.id).then(function(){

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
    })
    $scope.goal = goals.goal
    } // end of editGoalClick

     $scope.addNewGoalClick = function() {

        goals.errors = {}
        goals.goal = {}
        $scope.errors = goals.errors
        $scope.goal = goals.goal

        var content = $templateCache.get('goals/_modal_add_new_goal.html')
        var template = $compile(content)($scope)

        $.fancybox.open([{ 
          content : template,
          title: "<h3 class='text-center'>Adsd new Goal!</h3><br/>",
          helpers : { 
            title : {
              type: 'inside',
              position: 'top'
            }
          },
        }]); // end of fancybox 
    }; // end of addNewGoalClick

}]) // end of controller function