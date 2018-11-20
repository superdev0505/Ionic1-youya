'use strict';

angular.module('app.profile', [])

.controller('profileCtrl', ['$scope', '$stateParams', '$timeout', '$state', '$ionicLoading', '$filter', 'Auth', '$ionicHistory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $timeout, $state, $ionicLoading, $filter, Auth, $ionicHistory) {

    $scope.assetCollection = [];
    $scope.index = 0;
    $scope.photo = null;
    $scope.button_follow = "";

    $scope.posts = 0;
    $scope.sumRating = 0;
    $scope.ratingCount = 0;

   $scope.getFollow =  function(){
        $ionicLoading.show();
        Auth.getFollow(firebase.auth().currentUser.uid, $stateParams.id).then(function(result){
                if(result == true)
                    $scope.button_follow = "button_follow_active";
                else
                    $scope.button_follow = "button_follow";
                $ionicLoading.hide();
            }).catch(function(error){
                $ionicLoading.hide();
          });
    };

    $scope.loadData = function() {
        $scope.ratingCount = 0;
        $scope.sumRating = 0;
        $scope.loading = true;
        $scope.followers = 0;
        $ionicLoading.show();

        Auth.getUsers().then(function(result){
                for(var i=0; i<result.length; i++)
                {
                    var item = result[i];
                    Auth.getMyFollowsByID(item.id).then(function(result2){
                            for(var j=0; j<result2.length; j++)
                            {
                                var item2 = result2[j];
                                if(item2.follow == true)
                                    $scope.followers++;
                            }
                        }).catch(function(error){
                    });
                }

            }).catch(function(error){
        });

        firebase.database().ref('assets').on('value', function(_snapshot){

            // need to reset array each time
            var result = [];

            _snapshot.forEach(function (childSnapshot) {
                // get key & data...
                // var element = Object.assign({ id: childSnapshot.key }, childSnapshot.val());
                var element = childSnapshot.val();
                element.id = childSnapshot.key;
                element['rate'] = 0;
                element['count'] = 0;
                element['rank'] = 0;
                firebase.database().ref('users').on('value', function(_snapshot2){
                      _snapshot2.forEach(function (childSnapshot2) {
                            Auth.getRate(childSnapshot2.key, element.id).then(function(result){
                                    if(result > 0)
                                    {
                                        $scope.ratingCount++;
                                        element['rate'] = element['rate'] + result;
                                        element['count'] = element['count'] + 1;
                                        element['rank'] = element['rate']*10/element['count'];
                                        $scope.sumRating += element['rank'];

                                    }
                                }).catch(function(error){
                            });
                      });
                });
                // add to array object
                result.push(element);
            });

            // put the array on the $scope for display in the UI,
            // we will wrap it in a $timeout to ensure the screen is
            // updated   
            $timeout(function () {
                $scope.posts = result.length;
                $scope.rating = $scope.sumRating/$scope.ratingCount;

                $scope.loading = false;
                $ionicLoading.hide();
                //$scope.assetCollection=  $filter('filter')(result, {owner: $stateParams.id})[0];

                $scope.assetCollection = result;

                if($scope.photo == null)
                    $scope.photo = $scope.assetCollection[0];

               console.log($scope.assetCollection);
            }, 2);    
        })
    }

    var filterBy = [$stateParams.id];

    $scope.myFilterBy = function(e) {
        return filterBy.indexOf(e.owner) !== -1;
    };

    $scope.setFollow = function(){
        $ionicLoading.show();
        $scope.followers = 0;
        Auth.setFollow(firebase.auth().currentUser.uid, $stateParams.id).then(function(result){

            if(result == true)
                $scope.button_follow = "button_follow_active";
            else
                 $scope.button_follow = "button_follow";

             Auth.getUsers().then(function(result2){
                     for(var i=0; i<result2.length; i++)
                     {
                         var item = result2[i];
                         Auth.getMyFollowsByID(item.id).then(function(result3){
                                 for(var j=0; j<result3.length; j++)
                                 {
                                     var item2 = result3[j];
                                     if(item2.follow == true)
                                         $scope.followers++;
                                 }
                             }).catch(function(error){
                         });
                     }

                 }).catch(function(error){
             });

            $ionicLoading.hide();

        }).catch(function(error){
            $ionicLoading.hide();
            alert("error");
      });
    };


   $scope.toRate= function(photo){
        $scope.photo = photo;

        $state.go('toRate',{'id':$scope.photo.lastUpdated}/*, {'photo':JSON.stringify($scope.photo), 'image':$scope.photo.URL}*/);
    };

   $scope.toRate2= function(){
        $state.go('toRate', {'id':$scope.photo.lastUpdated});
   };

    $scope.back = function(){
        $ionicHistory.goBack();
    };

    $scope.$on("$ionicView.enter", function(event, data){
    // handle eventDelegate.$getByHandle('onboarding').slide(0);
       $scope.index = 0;
       $scope.getFollow();
       $scope.loadData();
    });

}])
