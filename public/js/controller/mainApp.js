var mainApp = angular.module('mainApp', []);

mainApp.controller('MainController', function($scope, $http, $interval){
    $scope.endpoints = [];
    $scope.counter=0;

    $http.get("/indexController")
        .then(function(response) {
            $scope.endpoints = response.data;
        });

    // set timeout
    $interval(function() {
        $http.get("/indexController").success(function(data) {
            console.log(data);
            $scope.endpoints = data;
            $scope.counter=$scope.counter+1;
        });
    }, 10*1000);
});