'use strict';

//  define authentication factory
app.factory('roskildeService', ['$http', function($http) {
    return {
        getBands: function() {
            return $http.get('/api/bands', {cache: true});
        },
        like: function(band, httpmethod) {
            return $http({
                method: httpmethod,
                url: '/api/band/' + band.urlParam + "/like",
                data: band
            });
        },
        getUserLikes: function() {
            return $http.get('api/user/likes');
        }
    }
}]);
