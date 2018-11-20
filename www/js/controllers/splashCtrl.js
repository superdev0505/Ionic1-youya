'use strict';

angular.module('app.splash', [])

.controller('splashCtrl', ['$scope', '$state', '$rootScope', 'Auth',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $rootScope, Auth) {

        /*firebase.auth().onAuthStateChanged(

         function(user) {

             $scope.$apply(function() {
                 $scope.verifed = true;
                 $scope.loginStatus = ""
             });

             if (user) {
                 //$scope.email = user.email;
                 //Auth.setEmail(user.email);
                 //console.log("User Found K");
                 console.log(user);
                 console.log(user.emailVerified);

                 alert(user.uid);
                 var userRef = firebase.database().ref('users/' + user.uid);
                 var userObj = $firebaseObject(userRef);
                 $rootScope.currentUser = userObj;
                 alert($rootScope.currentUser.username);
                 $state.go("icons");


             } else {
                $rootScope.currentUser = '';
                 console.log("No user!")
             }
         });*/
}])
