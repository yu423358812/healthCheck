var addEndpointApp = angular.module('addEndpointApp', []);

addEndpointApp.controller('MainController', function($scope, $http, $timeout){
    $scope.endpoint='';
    $scope.result='';

    $scope.submit = function() {
        $http.post("/addEndpointController",{data:$scope.endpoint}).success(function (response) {
                $scope.result=response+"!";
        })
    };
});
