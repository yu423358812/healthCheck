var mainApp = angular.module('mainApp', []);

mainApp.controller('MainController', function($scope, $http, $interval){
    $scope.endpoints = [];
    $scope.counter=0;

    $http.get("/ngendpointsView")
        .then(function(response) {
            $scope.endpoints = response.data;
            console.log($scope.endpoints);
        });

    // set interval
    $interval(function() {
        $http.get("/ngendpointsView").success(function(data) {
            console.log(data);
            $scope.endpoints = data;
            $scope.counter=$scope.counter+1;
        });
    }, 10*1000);
});