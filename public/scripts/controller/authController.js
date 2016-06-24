'use strict';

//  define authcontroller
app.controller('authController', ['$scope', '$state', 'authService', function($scope, $state, authService) {
    $scope.response = {};

    //  function sign up
    $scope.signUp = function(creds) {
        $scope.response = {};
        authService.signUp(creds).then(function(res) {
            $scope.response = res.data;
        });
    }

    //  function sign in
    $scope.signIn = function(creds) {
        $scope.response = {};
        authService.signIn(creds).then(function(res) {
            $scope.response = res.data;
            if(!$scope.response.error) {
                $state.go('bands');
            }
        });
    }

    $scope.modalVisible = false;
    //  function toggleModal
    $scope.toggleModal = function() {
        $scope.modalVisible = !$scope.modalVisible;
        //  reset fields & response
        $scope.creds = {};
        $scope.response = {};
    }
}]);
