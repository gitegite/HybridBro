angular.module('starter.controllers', [])
.controller('RestaurantsCtrl', function($scope, Restaurants){
  $scope.restaurants = Restaurants.all();

})

.controller('ReservationCtrl',function($scope,$stateParams, Restaurants){
  $scope.reservation = Restaurants.get($stateParams.restaurantId);
})

.controller('LoginCtrl',function($scope, LoginService, $ionicPopup,$state){
  $scope.data ={};
  $scope.login = function(){
    LoginService.loginUser($scope.data.username,$scope.data.password).success(function(data){
      $state.go('tab.dash');
    }).error(function(data){
      var alertPopup = $ionicPopup.alert({
        title:'FAIL!',
        template:'Please check your credentials'
      });
    });
  }

})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
