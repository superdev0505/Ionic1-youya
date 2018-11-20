'use strict';

angular.module('app.login', [])

.controller('loginCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'Auth', 'Users','Toast',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$rootScope, $stateParams, $state, Auth, Users, Toast) {
    $scope.form = {
        email:'',
        password:''
    };
//    $scope.form.email = localStorage.getItem("docman-email");
//    $scope.verifed = true;

    $scope.login = function() {
        $scope.loading = true;
        Auth.login($scope.form).then(function(resp) {
            //if (Authentication.isEmailVerified) {
                Toast.showSuccessToast("Logged in successfully!");
                $rootScope.isLoggedIn = true;
                $state.go('icons');
                //ast.showSuccessToast("Logged in successfully!");
                //document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
            //} else {
                //Toast.showErrorToast("Your email hasn't been verified yet.");
            //}
        }).catch(function(error){
            Toast.showErrorToast("Failed");
            $scope.loading = false;
            //Toast.showErrorToast(error.message);
        });
    };

    $scope.registerPage = function() {
        $state.go('register');
    }


}])
