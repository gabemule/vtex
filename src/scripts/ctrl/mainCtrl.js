ngVtex.controller('mainCtrl', function($scope, $http, $routeParams) {

  $scope.usersList = [];

  if ($scope.memberList === undefined) {
    $http({
      method: 'GET',
      url: 'https://api.github.com/orgs/vtex/public_members',
      headers: {
        'Accept': 'application/json'
      }
    }).
    success(
      function(data) {
        $scope.memberList = data;
        $scope.usersGetDetails();
      }
    );
  }

  $scope.usersGetDetails = function() {
    angular.forEach($scope.memberList, function(data) {
      $http({
          method: 'GET',
          url: 'https://api.github.com/users/' + data.login,
          headers: {
            'Accept': 'application/json'
          }
        })
        .success(
          function(data) {
            $scope.usersList.push(data);
          }
        );
    });
  };


}); /* mainCtrl */
