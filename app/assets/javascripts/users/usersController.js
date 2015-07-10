angular.module('todoer')

.controller('UsersController', [
'$scope',
'$state',
'$http',
'$compile',
'$templateCache',
'Auth',
function($scope,$state,$http,$compile,$templateCache,Auth){

    $scope.user = Auth._currentUser

    $scope.updateUser = function(){
        return $http.put('/users.json', {user: $scope.user}).success(function(data){
            angular.copy(data,$scope.user)
            Auth.login(data).then(function(){ alert(Auth) })
           
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

    $scope.deleteClick = function(){
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

    } // end of deleteClick

    $scope.$on('devise:login', function(event, currentUser) {
        $state.go('user_profile');
        $scope.user = currentUser;
    });

    $scope.$on('$viewContentLoaded', function(event) {
        $('#edit_user').on('click',function(){
            $('#my_profile_form_container').fadeToggle([{
                duration: 2000
            }])
        })
    }); // end of $on('$viewContentLoaded'
}
]);