angular.module('todoer')

.controller('UsersController', [
'$scope',
'$state',
'$http',
'$compile',
'$templateCache',
'goals',
'Auth',
function($scope,$state,$http,$compile,$templateCache,goals,Auth){

        $scope.user = Auth._currentUser
        goals.getAll()
        $scope.goals = goals
        $scope.goal = { title: 'Goal preview', description: ''}

    $scope.updateUser = function(){
        return $http.put('/users.json', {user: $scope.user}).success(function(data){
            angular.copy(data,$scope.user)
            Auth.login(data).then(function(){})
           
        }).error(function(data){
            console.log(data);
        })
    } // end of updateUser

    $scope.deleteUser = function(){
        
        return $http.delete('/users.json')
        .success(function(data){
            Auth.logout()
            $state.go('register')
        })
        .error(function(data){
            console.log(data);
        })
    } // end of deleteUser

    $scope.deleteUserClick = function(){
        var content = $templateCache.get('users/_modal_delete_confirmation.html')
        var template = $compile(content)($scope)


        $.fancybox.open([{ 
          content : template,
          title: "<h3 class='text-center'>Are you sure? </h3>",
          helpers : { 
            title : {
              type: 'inside',
              position: 'top'
            }
          },
        }]); // end of fancybox  

        $('#modal_delete_confirmation button').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).parent().hide();
                $.fancybox.close();
        });

    } // end of deleteUserClick

    $scope.deleteGoalClick = function(){
        $http.delete('/goals/' + $scope.goal.id + '.json')

        $scope.user = Auth._currentUser
        goals.getAll()
        $scope.goal = { title: 'Deleted!'}
        $scope.goals = goals
    }

    $scope.previewGoal = function(goal){
        return $http.get('/goals/' + goal.id + '.json')
        .success(function(data){
            angular.copy(data, $scope.goal);
        })
        .error(function(data){
            console.log(data);
        })
    } // previewGoal

    $scope.updateGoal = function(goal){
       $http.put("/goals/" + goal.id + ".json",goal).success(function(data){
            goals.getAll()
            $scope.goals = goals
            alert(data.id)
            angular.copy(data,$scope.goal);
        })
    } // end of updateGoal

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

    // EVENTS

    $scope.$on('devise:login', function(event, currentUser) {
        $state.go('user_profile');
        $scope.user = currentUser;
    }); // end of devise:login

    $scope.$on('$viewContentLoaded', function(event) {
        $('#edit_user').on('click',function(){
            $('#my_profile_form_container').fadeToggle([{
                duration: 2000
            }])
        })
    }); // end of $on('$viewContentLoaded'
}
]);