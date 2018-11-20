'use strict';

angular.module('app.myProfile', [])

.controller('myProfileCtrl', ['$scope', '$stateParams', '$timeout', '$state', '$ionicLoading', '$filter', 'Auth', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $timeout, $state, $ionicLoading, $filter, Auth) {

    $scope.assetCollection = [];
    $scope.index = 0;
    $scope.posts = 0;
    $scope.sumRating = 0;
    $scope.ratingCount = 0;
    $scope.photo = null;
    function loadData() {
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

            // loop through the snapshot to get the objects
            // to display in the list
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
                $scope.loading = false;

                $scope.posts = result.length;
                $scope.rating = $scope.sumRating/$scope.ratingCount;

                $ionicLoading.hide();
                $scope.assetCollection = result;

                if($scope.photo == null)
                    $scope.photo = $scope.assetCollection[0];

               console.log($scope.assetCollection);
            }, 2);    
        })



    }

     var filterBy = [firebase.auth().currentUser.uid];
     $scope.myFilterBy = function(e) {
       return filterBy.indexOf(e.owner) !== -1;
     };

   $scope.toRate= function(photo){
        $scope.photo = photo;

        $state.go('toRate',{'id':$scope.photo.lastUpdated}/*, {'photo':JSON.stringify($scope.photo), 'image':$scope.photo.URL}*/);
    };

   $scope.toRate2= function(){
        $state.go('toRate', {'id':$scope.photo.lastUpdated});
   };

    $scope.$on("$ionicView.enter", function(event, data){
    // handle eventDelegate.$getByHandle('onboarding').slide(0);
       $scope.index = 0;
        loadData();
    });

}])
