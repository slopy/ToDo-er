app.controller('GoalsController', [
'$scope',
'$rootScope',
'$stateParams',
'goals',
'$templateCache',
'$compile',
'$http',
'versionUrl',
'$state',
'Upload',
function($scope,$rootScope, $stateParams, goals,$templateCache,$compile,$http,versionUrl,$state,Upload){

    goals.getAll()
    goals.show($stateParams.id)
    $scope.goal = goals.goal
    $scope.prev_goal = goals.prev_goal
    $scope.next_goal = goals.next_goal


    var objs = goals.categories.map(function(obj){
      return obj.title
    })
    $scope.categories = objs

    $scope.files = []

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
        if (files != null){
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $scope.upload = Upload.upload({
                    url: '/api/' + versionUrl + '/goals/upload_file.json',
                    method: 'POST',
                    fields: { 'goal[id]': $scope.goal.id },
                    file: file,
                    fileFormDataName: 'goal[image]'
                });
            }
        }
    }

    $scope.updateGoal = function(){
        goals.updateGoal($scope,{
          id: $scope.goal.id,
          title: $scope.goal.title,
          description: $scope.goal.description,
          category: $scope.goal.category.title
          })

    } // end of updateGoal

    $scope.deleteGoalClick = function(){
        $http.delete('/api/' + versionUrl + '/goals/' + $scope.goal.id + '.json').success(function(){
            $state.go('home')
        })

    } // end of deleteGoalClick


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
    }// enf of deleteUserClick

        $scope.goToPrevGoal = function(){
            var nextId = $scope.prev_goal.id
            $state.go('goal', { 'id': nextId, 'goal': 'prev'})
        }
        $scope.goToNextGoal = function(){
            var nextId = $scope.next_goal.id
            $state.go('goal', { 'id': nextId, 'goal': 'nxt'})
        }
}
])