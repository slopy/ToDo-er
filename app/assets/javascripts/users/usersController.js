app.controller('UsersController', [
'$scope',
'$state',
'$http',
'$compile',
'$templateCache',
'goals',
'users',
'Auth',
'versionUrl',
function($scope,$state,$http,$compile,$templateCache,goals,users,Auth,versionUrl){
        users.get_stats()
        $scope.stats = users.stats
        $scope.user = Auth._currentUser
        goals.getAll()
        $scope.goals = goals
        $scope.goal = { title: 'Goal preview', description: ''}

        var objs = goals.categories.map(function(obj){
          return obj.title
        })
        $scope.categories = objs

      // gives another movie array on change
    $scope.updateCategories = function(typed){
        // MovieRetriever could be some service returning a promise
        return $scope.movies
    }

    $scope.deleteCategory = function(category){
        $http.delete('/api/' + versionUrl + 'categories/' + category +'.json').success(function(data){
            var index = $scope.categories.indexOf(category);
            $scope.categories.splice(index, 1); 
        })

    }

    $scope.updateUser = function(){
        return $http.put('/api/' + versionUrl + '/users.json', {user: $scope.user}).success(function(data){
            angular.copy(data,$scope.user)
            Auth.login(data).then(function(){})
           
        }).error(function(data){
            $scope.errors = data.errors
        })
    } // end of updateUser

    $scope.deleteUser = function(){
        
        return $http.delete('/api/' + versionUrl + '/users.json')
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
        $http.delete('/api/' + versionUrl + '/goals/' + $scope.goal.id + '.json')

        $scope.user = Auth._currentUser
        goals.getAll()
        $scope.goal = { title: 'Deleted!'}
        $scope.goals = goals

        users.get_stats()
        $scope.stats = users.stats
    } // end of deleteGoalClick

    $scope.previewGoal = function(goal){
        return $http.get('/api/' + versionUrl + '/goals/' + goal.id + '.json')
        .success(function(data){
            angular.copy(data, $scope.goal);
        })
        .error(function(data){
            console.log(data);
        })
    } // previewGoal

    $scope.updateGoal = function(){
        goals.updateGoal($scope,{
          id: $scope.goal.id,
          title: $scope.goal.title,
          description: $scope.goal.description,
          category: $scope.goal.category.title
          })
    } // end of updateGoal

    $scope.editGoalClick = function(goal){
        $scope.goal = goal
        var content = $templateCache.get('goals/_modal_edit_goal.html')
        var template = $compile(content)($scope)

        goals.show(goal.id).then(function(){

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
