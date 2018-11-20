'use strict';

angular.module('app.follow', [])

.controller('followersCtrl', ['$scope', '$stateParams', '$timeout', '$state', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $timeout, $state, $ionicLoading) {

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
                $ionicLoading.hide();
                $scope.assetCollection = result;

                if($scope.photo == null)
                    $scope.photo = $scope.assetCollection[0];

               console.log($scope.assetCollection);
            }, 2);    
        })
    }
         
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
