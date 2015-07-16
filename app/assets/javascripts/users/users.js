app.factory('users', [
'$http',
'versionUrl', 
function($http,versionUrl){

    var obj = {
        user: {},
        stats: {}
        };

    obj.get_stats = function(){
        return $http.get('/api/' + versionUrl + 'user_stats.json').success(function(data){
            angular.copy(data.stats, obj.stats);
        }); // end of success
    } // end of get_stats

    return obj;

}]) // end of factory