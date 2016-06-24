'use strict';

//  define authentication factory
app.factory('authService', ['$http', function($http) {
    var user = "";

    return {
        signUp: function(user) {
            return $http({
                method: 'post',
                url: '/auth/signup',
                data: user
            });
        },
        signIn: function(user) {
            return $http({
                method: 'post',
                url: '/auth/signin',
                data: user
            });
        },
        signOut: function() {
            user = {};
            return $http({
                method: 'post',
                url: '/auth/signout',
                data: ''
            });
        },
        verify: function() {
            return $http({
                method: 'post',
                url: '/auth/verify',
                data: ''
            });
        },
        setUser: function(authUser) {
            user = authUser;
        },
        getUser: function() {
            return user;
        }
    }
}]);
