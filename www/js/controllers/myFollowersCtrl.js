'use strict';

angular.module('app.iFollow', [])

.controller('iFollowCtrl', ['$scope', '$stateParams', '$timeout', '$state', '$ionicLoading', 'Auth',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $timeout, $state, $ionicLoading, Auth) {

    $scope.assetCollection = [];
    $scope.index = 0;
    $scope.photo = null;
                           
    function loadData() {
        $scope.loading = true;
        $ionicLoading.show();
        var assets = [];

        Auth.getAssets().then(function(result){

            Auth.getMyFollowsByID(firebase.auth().currentUser.uid).then(function(result2){
                result.forEach(function (data) {

                    result2.forEach(function (data2) {
                        if(data.owner == data2.follower && data2.follow == true)
                        {
                             assets.push(data);
                        }
                    });
                });

                assets.forEach(function (asset) {
                    asset['rate'] = 0;
                    asset['count'] = 0;
                    asset['rank'] = 0;
                    firebase.database().ref('users').on('value', function(_snapshot2){
                          _snapshot2.forEach(function (childSnapshot2) {
                                Auth.getRate(childSnapshot2.key, asset.id).then(function(result){
                                        if(result > 0)
                                        {
                                            asset['rate'] = asset['rate'] + result;
                                            asset['count'] = asset['count'] + 1;
                                            asset['rank'] = asset['rate']*10/asset['count'];
                                        }
                                    }).catch(function(error){
                                });
                          });
                    });
                });

                $timeout(function () {

                    var tmpTime = 0;
                    var tmpAssets = [];
                    for(var i = 0; i < assets.length; i++)
                    {
                        var asset=assets[i];
                        for( var j=0; j < assets.length; j++)
                        {
                            if(asset.owner == assets[j].owner)
                            {
                                if(asset.rank < assets[j].rank)
                                    asset = assets[j];
                            }
                        }

                        var isexsist =  false;
                        for(var k = 0; k<tmpAssets.length; k++)
                        {
                            if(assets[i].owner == tmpAssets[k].owner)
                            {
                                isexsist = true;
                                break;
                            }
                        }
                        if(isexsist == false)
                          tmpAssets.push(asset);
                    }

                    $scope.loading = false;
                    $ionicLoading.hide();
                    $scope.assetCollection = tmpAssets;

                    if($scope.photo == null)
                        $scope.photo = $scope.assetCollection[0];

                   console.log($scope.assetCollection);
                },2000);

            }).catch(function(error){
                $ionicLoading.hide();
                alert("error");
          });
        }).catch(function(error){
              $ionicLoading.hide();
              alert("error");
        });

    }

    $scope.profile= function(photo){
         $scope.photo = photo;
         $state.go('profile',{'id':$scope.photo.owner}/*, {'photo':JSON.stringify($scope.photo), 'image':$scope.photo.URL}*/);
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
