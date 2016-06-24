'use strict';

//  define bandcontroller
app.controller('bandController', ['$rootScope', '$scope', '$state', 'roskildeService', 'authService', function($rootScope, $scope, $state, roskildeService, authService) {
    //  get bands
    $scope.bands = [];
    roskildeService.getBands().then(function(res) {
        $scope.bands = res.data;
    });

    // get likes
    $scope.likes = [];
    roskildeService.getUserLikes().then(function(res) {
        $scope.likes = res.data.bands;
        authService.setUser(res.data.username);
    });

    //  function like/unlike band
    $scope.like = function(band, likes) {
        var index = $scope.isLiked(band, likes);
        if(index > -1) {
            roskildeService.like(band, 'delete').then(function() {
                likes.splice(index, 1);
            });
        }
        else {
            roskildeService.like(band, 'post').then(function() {
                likes.push(band);
            });   
        }
    }

    //  evaluates if band is liked
    $scope.isLiked = function(band, likes) {
        for(var i = 0; i < likes.length; i++) {
            if(likes[i]._id === band._id ) {
                return i;
            }
        }
        return -1;
    }  

    //  function sign out
    $scope.signOut = function() {
        authService.signOut();
        $state.go('signin');
    }
}]);
