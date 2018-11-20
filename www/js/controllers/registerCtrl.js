'use strict';

angular.module('app.register', [])

.controller('registerCtrl', ['$scope','$rootScope', '$stateParams', '$state', 'Auth', 'Users', 'fireUsers', '$cordovaGeolocation', '$ionicLoading','$q','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope,  $stateParams, $state, Auth, Users, fireUsers, $cordovaGeolocation, $ionicLoading, $q, $http) {

    $scope.errorMessage = '';
    $scope.errorShow = false;

    $scope.ssClass = "tab_button_left";
    $scope.fwClass = "tab_button_right";
    $scope.rdClass = "tab_button_left_active";
    $scope.trClass = "tab_button_right";
    $scope.engClass = "tab_button_left_active";
    $scope.chClass = "tab_button_right";

    $scope.category_tab_1 = "category_tab_1_active";
    $scope.category_tab_2 = "category_tab_2";
    $scope.category_tab_3 = "category_tab_3";
    $scope.category_tab_4 = "category_tab_4";
    $scope.category_tab_5 = "category_tab_5";
    $scope.category_tab_6 = "category_tab_6";

    $scope.eng = function(){
        $scope.engClass = "tab_button_left_active";
        $scope.chClass = "tab_button_right";
        window.localStorage['language'] = 'english';

    };

    $scope.china = function(){
        $scope.engClass = "tab_button_left";
        $scope.chClass = "tab_button_right_active";
        window.localStorage['language'] = 'china';

    };

    $scope.women = function(){
        $scope.category_tab_1 = "category_tab_1_active";
        $scope.category_tab_2 = "category_tab_2";
        $scope.category_tab_3 = "category_tab_3";
        $scope.category_tab_4 = "category_tab_4";
        $scope.category_tab_5 = "category_tab_5";

        $scope.category_tab_6 = "category_tab_6";

        $rootScope.form.human_type = 'women';
        $rootScope.form.art = '';

        /*$scope.ssClass = "tab_button_left";
        window.localStorage['ss'] = '';

        $scope.fwClass = "tab_button_right";
        window.localStorage['fw'] = '';*/

    };
    $scope.men = function(){
        $scope.category_tab_1 = "category_tab_1";
        $scope.category_tab_2 = "category_tab_2_active";
        $scope.category_tab_3 = "category_tab_3";
        $scope.category_tab_4 = "category_tab_4";
        $scope.category_tab_5 = "category_tab_5";
        $scope.category_tab_6 = "category_tab_6";

        $rootScope.form.human_type = 'men';
        $rootScope.form.art = '';

        /*$scope.ssClass = "tab_button_left";
        window.localStorage['ss'] = '';

        $scope.fwClass = "tab_button_right";
        window.localStorage['fw'] = '';*/

    };
    $scope.teenboy = function(){
        $scope.category_tab_1 = "category_tab_1";
        $scope.category_tab_2 = "category_tab_2";
        $scope.category_tab_3 = "category_tab_3_active";
        $scope.category_tab_4 = "category_tab_4";
        $scope.category_tab_5 = "category_tab_5";

        $scope.category_tab_6 = "category_tab_6";

        $rootScope.form.human_type = 'teenboy';
        $rootScope.form.art = '';

        /*$scope.ssClass = "tab_button_left";
        window.localStorage['ss'] = '';

        $scope.fwClass = "tab_button_right";
        window.localStorage['fw'] = '';*/

    };
    $scope.teengirl = function(){
        $scope.category_tab_1 = "category_tab_1";
        $scope.category_tab_2 = "category_tab_2";
        $scope.category_tab_3 = "category_tab_3";
        $scope.category_tab_4 = "category_tab_4_active";
        $scope.category_tab_5 = "category_tab_5";

        $scope.category_tab_6 = "category_tab_6";

        $rootScope.form.human_type = 'teengirl';
        $rootScope.form.art = '';

        /*$scope.ssClass = "tab_button_left";
        window.localStorage['ss'] = '';

        $scope.fwClass = "tab_button_right";
        window.localStorage['fw'] = '';*/

    };

    $scope.toddlers = function(){
        $scope.category_tab_1 = "category_tab_1";
        $scope.category_tab_2 = "category_tab_2";
        $scope.category_tab_3 = "category_tab_3";
        $scope.category_tab_4 = "category_tab_4";
        $scope.category_tab_5 = "category_tab_5_active";

        $scope.category_tab_6 = "category_tab_6";

        $rootScope.form.human_type = 'toddlers';
        $rootScope.form.art = '';


        /*$scope.ssClass = "tab_button_left";
        window.localStorage['ss'] = '';

        $scope.fwClass = "tab_button_right";
        window.localStorage['fw'] = '';*/
    };

    $scope.art = function(){
        $scope.category_tab_1 = "category_tab_1";
        $scope.category_tab_2 = "category_tab_2";
        $scope.category_tab_3 = "category_tab_3";
        $scope.category_tab_4 = "category_tab_4";
        $scope.category_tab_5 = "category_tab_5";

        $rootScope.form.human_type = '';

        if($scope.category_tab_6 == "category_tab_6")
        {
            $scope.category_tab_6 = "category_tab_6_active";
            $scope.ssClass = "tab_button_left";
            $scope.fwClass = "tab_button_right";
            window.localStorage['fw'] = '';
            window.localStorage['ss'] = '';
            $rootScope.form.art = 'art';
        }
        else
        {
            $scope.category_tab_6 = "category_tab_6";
            $rootScope.form.art = '';
        }
    };

    $scope.ss = function(){
        /*window.localStorage['human_type'] = '';
        $scope.category_tab_1 = "category_tab_1";
        $scope.category_tab_2 = "category_tab_2";
        $scope.category_tab_3 = "category_tab_3";
        $scope.category_tab_4 = "category_tab_4";
        $scope.category_tab_5 = "category_tab_5";*/

        if($scope.category_tab_6 == "category_tab_6_active")
        {
            return;
        }
            $scope.ssClass = "tab_button_left_active";
            window.localStorage['ss'] = 'S/S';

            $scope.fwClass = "tab_button_right";
            window.localStorage['fw'] = '';

    };

    $scope.fw = function(){
        /*window.localStorage['human_type'] = '';
        $scope.category_tab_1 = "category_tab_1";
        $scope.category_tab_2 = "category_tab_2";
        $scope.category_tab_3 = "category_tab_3";
        $scope.category_tab_4 = "category_tab_4";
        $scope.category_tab_5 = "category_tab_5";*/

        if($scope.category_tab_6 == "category_tab_6_active")
        {
            return;
        }
          $scope.fwClass = "tab_button_right_active";
          window.localStorage['fw'] = 'F/W';

          $scope.ssClass = "tab_button_left";
          window.localStorage['ss'] = '';

    };

    function getCurPosition() {
        var deferred = $q.defer();
        $ionicLoading.show();

        var posOptions = {enableHighAccuracy:true,maximumAge:60000, timeout:60000};

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (pos) {
            deferred.resolve(pos);
            $ionicLoading.hide();
          }, function (error) {
            alert('Unable to get location: ' + JSON.stringify(error));
            $ionicLoading.hide();
          });
        return deferred.promise;
    }

    $scope.registerUser = function() {

        getCurPosition().then(function (pos) {
                $rootScope.form.lat = pos.coords.latitude;
                $rootScope.form.long = pos.coords.longitude;
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true').then(function(data){
                    //$rootScope.form.address = data.data.results[0].formatted_address;
                    for(var i = 0; i<data.data.results[0].address_components.length; i++)
                    {
                        $rootScope.form.address = data.data.results[0].formatted_address;
                        var type = data.data.results[0].address_components[i].types[0];
                        if(type == 'country')
                            $rootScope.form.country = data.data.results[0].address_components[i].long_name;
                        if(type == 'locality')
                            $rootScope.form.city = data.data.results[0].address_components[i].long_name;
                    }

                    if($rootScope.form.city == '')
                        $rootScope.form.city = $rootScope.form.country;

                    $state.go('disclaimer');
                    $ionicLoading.hide();
                }, function(err) {
                    $ionicLoading.hide();
                // error
                });


            }, function (error) {
               $ionicLoading.hide();
         });

    };

    $scope.registerOK = function(){
        $ionicLoading.show();
        Auth.createUserByEmail($rootScope.form).then(function(resp) {
            Auth.register(resp, $rootScope.form);
            $ionicLoading.hide();
            $scope.loading = false;
            $state.go('login');
            //Auth.emailVerification().then(function() {
            //Toast.showInfoToast('Sending email verification message to your email. Check inbox now!');
            //}).catch(function(error) {
            //    $scope.loading = false;
                //Toast.showErrorToast(error.message);
            //});
        }).catch(function(error) {
           $scope.loading = false;
           $ionicLoading.hide();
           alert(error.message);
                //Toast.showErrorToast(error.message);
        });
    };

    $scope.closeHint = function()
    {
        $scope.errorShow = false;
    };

    $scope.registerPage = function() {

        $state.go('register');
    };

    $scope.changeName = function(){
        console.log($rootScope.form.username);
        if(!$rootScope.form.username)
        {
            $scope.errorMessage = '* User name must be longer than 5 characters';
            $scope.errorShow = true;
        }
        else
        {
            $scope.errorMessage = '* Are you a public figure or brand? If yes, please click [Verify me]';
            $scope.errorShow = true;        }
    };

    $scope.changeEmail = function(){
        console.log($rootScope.form.email);
        if(!$rootScope.form.email)
        {
            $scope.errorMessage = '* Please enter correct email';
            $scope.errorShow = true;
            console.log("Email Undefined");
        }
        else
        {
            $scope.errorShow = false;
            console.log("defined");
        }
    };
    $scope.changePasswd = function(){
        if(!$rootScope.form.password)
        {
            $scope.errorMessage = '* Password must be longer than 6 characters';
            $scope.errorShow = true;
        }
        else
        {
            if($rootScope.form.password != $rootScope.form.confirmpassword)
            {
                $scope.errorMessage = '* Please confirm password';
                $scope.errorShow = true;
            }
            else
                $scope.errorShow = false;
        }
        console.log($rootScope.form.password);
    };
    $scope.changeCPasswd = function(){
        console.log($rootScope.form.confirmpassword);
        if(!$rootScope.form.confirmpassword)
        {
            $scope.errorMessage = '* Please confirm password';
            $scope.errorShow = true;
        }
        else
            $scope.errorShow = false;
    };

}])