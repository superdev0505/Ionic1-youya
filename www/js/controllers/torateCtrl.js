'use strict';

angular.module('app.torate', [])

.controller('toRateCtrl', ['$scope', '$stateParams', '$timeout','$filter','$ionicLoading', '$ionicPopup', '$interval', '$state', 'Auth','$ionicScrollDelegate',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $timeout, $filter, $ionicLoading, $ionicPopup, $interval, $state, Auth, $ionicScrollDelegate) {

    $scope.assetCollection = [];
    $scope.index = 0;
    $scope.photo = null;

    function loadData() {
        $scope.loading = true;
        $ionicLoading.show();
        firebase.database().ref('assets').on('value', function(_snapshot){

            // need to reset array each time
            var result = [];

            // loop through the snapshot to get the objects
            // to display in the list
            _snapshot.forEach(function (childSnapshot) {
                // get key & data...
                // var element = Object.assign({ id: childSnapshot.key }, childSnapshot.val());
                var element = childSnapshot.val();
                element.id = childSnapshot.key;

                // add to array object
                result.push(element);
            }); 

            // put the array on the $scope for display in the UI,
            // we will wrap it in a $timeout to ensure the screen is
            // updated   
            $timeout(function () {
                $scope.loading = false;
                $scope.assetCollection = result;

                $scope.photo=  $filter('filter')($scope.assetCollection, {lastUpdated: $stateParams.id})[0];

                if(!$scope.photo || $scope.photo == null)
                    $scope.photo = $scope.assetCollection[0];

                Auth.getRate(firebase.auth().currentUser.uid, $scope.photo.id).then(function(result){
                        $scope.rate = result;
                        $scope.setUIRate(result);
                        $ionicLoading.hide();
                    }).catch(function(error){
                         $ionicLoading.hide();
                  });

                $ionicScrollDelegate.scrollBottom();

                console.log($scope.assetCollection);
            }, 200);
        })
    }

   $scope.myProfile = function()
   {
       $state.go('myProfile',{'id':firebase.auth().currentUser.uid}/*, {'photo':JSON.stringify($scope.photo), 'image':$scope.photo.URL}*/);
   };

   $scope.xpass= function(){
       $ionicLoading.show();

       $scope.photo = $scope.assetCollection[$scope.index];
        if($scope.index < $scope.assetCollection.length)
           $scope.index++;
        else
        {
            $scope.index = $scope.assetCollection.length-1;
            $scope.photo = $scope.assetCollection[$scope.index];
        }

        Auth.getRate(firebase.auth().currentUser.uid, $scope.photo.id).then(function(result){
            $scope.rate = result;
            $scope.setUIRate(result);
            $ionicLoading.hide();
        }).catch(function(error){
            $ionicLoading.hide();
        });

       console.log($scope.photo.URL);
   };

    $scope.report = function(){
        var confirmPopup = $ionicPopup.confirm({
         title: 'Report',
         template: 'Are you sure you want to report this image?'
        });

        confirmPopup.then(function(res) {
         if(res) {
            $ionicLoading.show();
           var report = {abused_username: $scope.photo.name, abused_userid:$scope.photo.owner, abused_image:$scope.photo.URL, repoter_userid:firebase.auth().currentUser.uid};
           Auth.setReport(report).then(function(result){
                $scope.setRate(0);
                $ionicLoading.hide();
                $scope.xpass();

           }).catch(function(error){
               $ionicLoading.hide();
               alert("error");
         });
           console.log('You are sure');
         } else {
           console.log('You are not sure');
         }
        });
    };

    $scope.rate = 0;
    $scope.stop = null;
    $scope.rate0 = false;
    $scope.rate1 = false;
    $scope.rate2 = false;
    $scope.rate3 = false;
    $scope.rate4 = false;
    $scope.rate5 = false;
    $scope.rate6 = false;
    $scope.rate7 = false;
    $scope.rate8 = false;
    $scope.rate9 = false;
    $scope.rate10 = false;

    $scope.setDragLeft = function()
    {
     //   $interval.cancel(stop);
        if($scope.stop == null)
        {
            $scope.stop = $interval(function(){
                  $scope.rate--;
                  if($scope.rate < 0)
                    $scope.rate = 0;
                  $scope.setRate($scope.rate);
            }, 300);
        }

    };

    $scope.setDragRight = function()
    {
     // $interval.cancel(stop);
        if($scope.stop == null)
        {
            $scope.stop = $interval(function(){
                  $scope.rate++;
                  if($scope.rate > 10)
                    $scope.rate = 10;
                  $scope.setRate($scope.rate);
            }, 300);
        }
    };

    $scope.setRelease = function()
    {
        $interval.cancel($scope.stop);
        $scope.stop = null;
    };

    $scope.setRate = function(value){
        if(value == 0)
        {
            $scope.rate0 = false;
            $scope.rate1 = false;
            $scope.rate2 = false;
            $scope.rate3 = false;
            $scope.rate4 = false;
            $scope.rate5 = false;
            $scope.rate6 = false;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;
            $scope.rate = 0;
        }
        else if(value == 1)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = false;
            $scope.rate3 = false;
            $scope.rate4 = false;
            $scope.rate5 = false;
            $scope.rate6 = false;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;

            $scope.rate = 1;
        }
        else if(value == 2)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = false;
            $scope.rate4 = false;
            $scope.rate5 = false;
            $scope.rate6 = false;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;

            $scope.rate = 2;
        }
         else if(value == 3)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = false;
            $scope.rate5 = false;
            $scope.rate6 = false;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;

            $scope.rate = 3;
        }
         else if(value == 4)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = false;
            $scope.rate6 = false;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;

            $scope.rate = 4;
        }
         else if(value == 5)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = true;
            $scope.rate6 = false;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;

            $scope.rate = 5;
        }
         else if(value == 6)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = true;
            $scope.rate6 = true;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;


            $scope.rate = 6;
        }
         else if(value == 7)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = true;
            $scope.rate6 = true;
            $scope.rate7 = true;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;


            $scope.rate = 7;
        }
         else if(value == 8)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = true;
            $scope.rate6 = true;
            $scope.rate7 = true;
            $scope.rate8 = true;
            $scope.rate9 = false;
            $scope.rate10 = false;


            $scope.rate = 8;
        }
         else if(value == 9)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = true;
            $scope.rate6 = true;
            $scope.rate7 = true;
            $scope.rate8 = true;
            $scope.rate9 = true;
            $scope.rate10 = false;


            $scope.rate = 9;
        }
         else if(value == 10)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = true;
            $scope.rate6 = true;
            $scope.rate7 = true;
            $scope.rate8 = true;
            $scope.rate9 = true;
            $scope.rate10 = true;


            $scope.rate = 10;
        }

         $ionicLoading.show();
         Auth.setRate(firebase.auth().currentUser.uid, $scope.photo.id, $scope.rate).then(function(result){
            $ionicLoading.hide();
            $scope.xpass();
         }).catch(function(error){
             $ionicLoading.hide();
       });
    };

    $scope.setUIRate = function(value){
        if(value == 0)
        {
            $scope.rate0 = false;
            $scope.rate1 = false;
            $scope.rate2 = false;
            $scope.rate3 = false;
            $scope.rate4 = false;
            $scope.rate5 = false;
            $scope.rate6 = false;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;
            $scope.rate = 0;
        }
        else if(value == 1)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = false;
            $scope.rate3 = false;
            $scope.rate4 = false;
            $scope.rate5 = false;
            $scope.rate6 = false;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;

            $scope.rate = 1;
        }
        else if(value == 2)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = false;
            $scope.rate4 = false;
            $scope.rate5 = false;
            $scope.rate6 = false;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;

            $scope.rate = 2;
        }
         else if(value == 3)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = false;
            $scope.rate5 = false;
            $scope.rate6 = false;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;

            $scope.rate = 3;
        }
         else if(value == 4)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = false;
            $scope.rate6 = false;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;

            $scope.rate = 4;
        }
         else if(value == 5)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = true;
            $scope.rate6 = false;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;

            $scope.rate = 5;
        }
         else if(value == 6)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = true;
            $scope.rate6 = true;
            $scope.rate7 = false;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;


            $scope.rate = 6;
        }
         else if(value == 7)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = true;
            $scope.rate6 = true;
            $scope.rate7 = true;
            $scope.rate8 = false;
            $scope.rate9 = false;
            $scope.rate10 = false;


            $scope.rate = 7;
        }
         else if(value == 8)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = true;
            $scope.rate6 = true;
            $scope.rate7 = true;
            $scope.rate8 = true;
            $scope.rate9 = false;
            $scope.rate10 = false;


            $scope.rate = 8;
        }
         else if(value == 9)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = true;
            $scope.rate6 = true;
            $scope.rate7 = true;
            $scope.rate8 = true;
            $scope.rate9 = true;
            $scope.rate10 = false;


            $scope.rate = 9;
        }
         else if(value == 10)
        {
            $scope.rate0 = true;
            $scope.rate1 = true;
            $scope.rate2 = true;
            $scope.rate3 = true;
            $scope.rate4 = true;
            $scope.rate5 = true;
            $scope.rate6 = true;
            $scope.rate7 = true;
            $scope.rate8 = true;
            $scope.rate9 = true;
            $scope.rate10 = true;


            $scope.rate = 10;
        }

    };

    $scope.$on("$ionicView.enter", function(event, data){
    // handle eventDelegate.$getByHandle('onboarding').slide(0);
        //$scope.photo = JSON.parse($stateParams.photo);
        //$scope.photo.URL = $stateParams.image;
        //console.log($scope.photo.URL);
        $scope.index = 0;
        loadData();
    });
	

}])
