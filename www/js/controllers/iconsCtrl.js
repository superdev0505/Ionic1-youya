'use strict';

angular.module('app.icons', [])

.controller('iconsCtrl', ['$scope','$rootScope', '$stateParams', '$timeout', '$state', '$ionicLoading', 'Auth',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $stateParams, $timeout, $state, $ionicLoading, Auth) {

    $scope.assetCollection = [];
    $scope.index = 0;
    $scope.photo = null;
                           
    /*function loadData() {
        $scope.loading = true;
        $ionicLoading.show();

        firebase.database().ref('assets').orderByChild('lastUpdated').on('value', function(_snapshot){

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
                                        element['rate'] = element['rate'] + result;
                                        element['count'] = element['count'] + 1;
                                        element['rank'] = element['rate']*10/element['count'];
                                    }
                                }).catch(function(error){
                            });
                      });

                });
                // add to array object
                result.push(element);
            });

            $timeout(function () {

                var tmpTime = 0;
                var tmpAssets = [];
                for(var i = 0; i < result.length; i++)
                {
                    var asset=result[i];
                    for( var j=0; j < result.length; j++)
                    {
                        if(asset.owner == result[j].owner)
                        {
                            if(asset.rank < result[j].rank)
                                asset = result[j];
                        }
                    }

                    var isexsist =  false;
                    for(var k = 0; k<tmpAssets.length; k++)
                    {
                        if(result[i].owner == tmpAssets[k].owner)
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

        })
    }*/

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
                var username = angular.lowercase(element.name);
                var address = angular.lowercase(element.address);
                var season = element.ssORfw;

                var search_address = angular.lowercase($rootScope.form.city);

                var fw = $rootScope.form.fw;
                var ss = $rootScope.form.ss;

                  if(search_address.length > 0)
                  {
                      if(address.indexOf(search_address || '') != -1)
                      {

                          if(fw == "F/W" && season == "F/W")
                              result.push(element);
                          else if(ss == "S/S" && season == "S/S")
                              result.push(element);

                          if(fw != "F/W" && ss != "S/S")
                              result.push(element);
                      }
                  }
                  else
                  {
                      if(fw == "F/W" && season == "F/W")
                          result.push(element);
                      else if(ss == "S/S" && season == "S/S")
                          result.push(element);

                      if(fw != "F/W" && ss != "S/S")
                          result.push(element);
                  }
            });

            result.forEach(function (asset) {
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
                for(var i = 0; i < result.length; i++)
                {
                    var asset=result[i];
                    for( var j=0; j < result.length; j++)
                    {
                        if(asset.owner == result[j].owner)
                        {
                            if(asset.lastUpdated < result[j].lastUpdated)
                                asset = result[j];
                        }
                    }

                    var isexsist =  false;
                    for(var k = 0; k<tmpAssets.length; k++)
                    {
                        if(result[i].owner == tmpAssets[k].owner)
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
            },1000);
        })
    }
         
   $scope.profile= function(photo){
        $scope.photo = photo;
        $state.go('profile',{'id':$scope.photo.owner}/*, {'photo':JSON.stringify($scope.photo), 'image':$scope.photo.URL}*/);
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
