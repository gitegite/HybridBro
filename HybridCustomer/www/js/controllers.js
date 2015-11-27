angular.module('starter.controllers', [])
.controller('RestaurantsCtrl', function($scope, Restaurants){
  $scope.restaurants = Restaurants.all();

})

.controller('ReservationCtrl',function($scope,$stateParams, Restaurants){
  $scope.reservation = Restaurants.get($stateParams.restaurantId);
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
