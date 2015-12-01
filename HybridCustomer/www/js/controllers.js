angular.module('starter.controllers', ['firebase'])
.controller('RestaurantsCtrl', function($scope, Restaurants,$firebaseArray){
  $scope.resfire = Restaurants.allFire();
  console.log($scope.resfire);


})
.controller('HistoryCtrl',function($scope,HistoryService){
  $scope.histories = HistoryService.allB();
})
.controller('ReservationCtrl',function($scope,$stateParams, Restaurants,$ionicPopup){
  $scope.reservation = Restaurants.getFire($stateParams.resname);
  $scope.seats = Restaurants.getSeat($stateParams.resname);
  $scope.addtofirebase = function(resName,tableId,seatType,time){
    var userName = window.sessionStorage.Username;
    var ref = new Firebase("https://crackling-inferno-7333.firebaseio.com/Restaurant/" + resName + "/Reservation");
    var Userref = new Firebase("https://crackling-inferno-7333.firebaseio.com/Users/" + window.sessionStorage.Key + "/Reservation");
    var alertPopup = $ionicPopup.alert({
        title: 'Reserved',
        template: 'Please check your reservation history.'
    });
    var data = {
      Name: userName,
      Seat: seatType,
      TableID: tableId,
      Time:time
    }
    console.log(data);
    ref.push(data);
    data = {
      ResName: resName,
      Name: userName,
      Seat: seatType,
      TableID: tableId,
      Time:time
    }
    Userref.push(data);

  }


})
.controller('LoginCtrl', function ($scope, Users , $state) {
    $scope.login = function (_username, _password) {
        Users.login(_username, _password) ;

    };

    $scope.signup = function () {
        $state.go('signup');
    };
})
.controller('SignupCtrl', function ($scope, Users, $location) {
    $scope.signUp = function (_username, _publicname, _password) {
        Users.add(_username, _publicname, _password);
        $location.path('/login');
    };
})

// .controller('LoginCtrl',function($scope, LoginService, $ionicPopup,$state){
//   $scope.data ={};
//   $scope.signup = function(){
//     $state.go('signup');
//   }
//   $scope.login = function(){
//     LoginService.loginUser($scope.data.username,$scope.data.password).success(function(data){
//       $state.go('tab.dash');
//     }).error(function(data){
//       var alertPopup = $ionicPopup.alert({
//         title:'FAIL!',
//         template:'Please check your credentials'
//       });
//     });
//   }
//
// })

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
