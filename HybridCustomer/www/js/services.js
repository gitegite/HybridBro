angular.module('starter.services', ['firebase'])

.factory('SignupService',function(){
  return{
    signupUser:function(username,password,publicname){
      //dosomething
    }
  }
})
.factory('HistoryService',function($firebaseArray){
  var histories = [];
  var Userref = new Firebase("https://crackling-inferno-7333.firebaseio.com/Users/" + window.sessionStorage.Key + "/Reservation");
  Userref.once('value',function(snapshot){
    snapshot.forEach(function(childSnapshot){
        var key = childSnapshot.val();
        histories.push(key);
    });
  });
  return{
    all:function(){
      return histories;
    },
    allB:function(){
      var hisB = new Firebase("https://crackling-inferno-7333.firebaseio.com/Users/" + window.sessionStorage.Key + "/Reservation");
      return $firebaseArray(hisB);
    }
  }
})
.factory('ReservationService',function(){

  return{
    reserve:function(seatType){

    }
  }

})
.factory('Users', function ($window,$location, $firebaseObject, $firebaseArray, $timeout, $state, $ionicPopup) {
    var UserRef = new Firebase("https://crackling-inferno-7333.firebaseio.com/Users");

    return {
        all: function () {
            return $firebaseArray(UserRef);
        },

        add: function (_username, _publicname, _password) {
            var Info = {
                Username: _username,
                Publicname: _publicname,
                Password: _password
            };
            var check = false;
            UserRef.once("value", function (snapshot) {
                // The callback function will only get called once since we return true
                snapshot.forEach(function (childSnapshot) {
                    var key = childSnapshot.val();
                    if (key.Username == _username) {
                        console.log('true');
                        check = true;
                    }
                });
                if (check == false) {
                    UserRef.push(Info);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Complete',
                        template: 'Complete Create new ID: ' + _username + '\n You can login with this id now.'
                    });
                    alertPopup.then(function (res) {
                    });
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Already have same existing username : ' + _username
                    });
                    alertPopup.then(function (res) {
                    });
                }
            });
        },

        login: function (_username, _password) {
            var check = false;
            UserRef.once("value", function (snapshot) {
                // The callback function will only get called once since we return true
                snapshot.forEach(function (childSnapshot) {
                    var key = childSnapshot.val();
                    var key2 = childSnapshot.key();
                    if (key.Username == _username && key.Password == _password) {
                        console.log('true');
                        window.sessionStorage.Username = _username;
                        window.sessionStorage.Publicname = key.Publicname;
                        window.sessionStorage.Key = key2;
                        console.log("key2 ja "+window.sessionStorage.Key);
                        check = true;
                      //  $location.path('/restaurants');
                        $state.go('tab.restaurants');
                    }
                });
                if (check == false) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Wrong Id or Password (Case Sensitive)'
                    });
                    alertPopup.then(function (res) {
                        console.log('-----');
                    });
                }
            });
        }
    };
})
.factory('LoginService',function($q){
    return{
      loginUser: function(name,pw){
        var deferred = $q.defer();
        var promise = deferred.promise;
        if(name == 'user' && pw =='secret'){
          deferred.resolve('Welcome '+name+'!');
        }else{
          deferred.reject('Wrong credentials.');
        }
        promise.success = function(fn){
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn){
          promise.then(null,fn);
          return promise;
        }
        return promise;

      }
    }
})
.factory('Restaurants', function($firebaseArray){

  var restaurantsRef = new Firebase('https://crackling-inferno-7333.firebaseio.com/Restaurant/');
  var resfire =[];
  restaurantsRef.once('value',function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var key = childSnapshot.key();
      resfire.push(key);
    });
  });
  var seats = [];
  return{
    allFire:function(){

      return resfire;
    },allFireB:function(){
       var Ref = new Firebase('https://crackling-inferno-7333.firebaseio.com/Restaurant/');
       return $firebaseArray(Ref);
    },

    getFire:function(resname){
      for(var i = 0; i < resfire.length;++i){
        if(resname === resfire[i]){
          return resfire[i];
        }
      }
      return null;
    },
    getSeat:function(resname){
      var ref = new Firebase('https://crackling-inferno-7333.firebaseio.com/Restaurant/'+resname+'/Seat');
      var eiei = $firebaseArray(ref);
      seats = [];
      ref.once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key();
            var childData = childSnapshot.val();
            seats.push(childData);
        });
      });
      return seats;
    },
  };
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
