'use strict';

angular.module('app.addPost', [])

.controller('addPostCtrl', ['$scope', '$rootScope', '$q', '$timeout', '$stateParams', '$ionicLoading', '$ionicPopup', '$cordovaCamera', '$ionicActionSheet', '$cordovaFile', '$ionicPlatform','Toast',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $rootScope, $q, $timeout, $stateParams, $ionicLoading, $ionicPopup, $cordovaCamera, $ionicActionSheet, $cordovaFile, $ionicPlatform, Toast) {
    $scope.assetCollection = [];
    $scope.loading = false;
    $scope.ssORfw = 'S/S';
    $scope.fileName = '';
    $scope.libraryPhoto = null;
    $scope.topBorder = "topborder-bold";
    $scope.rightBorder = "rightborder-zero";

    /**
    * query firebase database for a list of images stored in the
    * firebase storage. You cannot query firebase storage for a list
    * of objects.
    *
    */
    $scope.ssClick = function(){
        $scope.ssORfw = 'S/S';
        $scope.topBorder = "topborder-bold";
        $scope.rightBorder = "rightborder-zero";
    };
    
    $scope.fwClick = function(){
        $scope.ssORfw = 'F/W';
        $scope.topBorder = "topborder-zero";
        $scope.rightBorder = "rightborder-bold";
    };

    $scope.doneAction = function()
    {
        if($scope.libraryPhoto == null)
            return;

        $ionicLoading.show();
        $scope.fileName = $scope.libraryPhoto.filename;
        cordova.plugins.photoLibrary.getPhoto(
            $scope.libraryPhoto,
            function(rotatedFilePath){
                window.resolveLocalFileSystemURL('file://'+rotatedFilePath, (fileEntry)=> {
                    fileEntry.file(file => {
                      const fileReader = new FileReader();
                      fileReader.onloadend = (res) => {
                        var imageBlob =  new Blob([new Uint8Array(res.target.result)], {type: file.type});
                        saveToFirebase(imageBlob, $scope.fileName).then(function (_responseSnapshot) {
                            // we have the information on the image we saved, now
                            // let's save it in the realtime database
                            console.log(_responseSnapshot)
                            return saveReferenceInDatabase(_responseSnapshot)
                        }).then(function (_response) {
                            $ionicLoading.hide();
                            Toast.showSuccessToast("Uploaded successfully!");
                            $scope.fileName='';

                            //loadData();

                        }, function (err) {
                            $ionicLoading.hide();
                            Toast.showErrorToast("Failed");

                            $scope.fileName='';
                            $scope.loading = false;
                            console.log(err);
                        });
                      };
                      fileReader.readAsArrayBuffer(file);
                    });
                }, (error)=> {
                        alert(error.code);
                        console.log(JSON.stringify(error));
                        $ionicLoading.hide();
                 });
            },
            function(err){
                console.log("Error occured");
            });

    };
                            
    $scope.setThumbImage = function(photo){

        $scope.libraryPhoto = photo;
    };
           
    function loadLibrary(){
         var result = [];
        $scope.assetCollection = [];
        $ionicLoading.show();

        cordova.plugins.photoLibrary.requestAuthorization(
            function () {
            // User gave us permission to his library, retry reading it!
                cordova.plugins.photoLibrary.getLibrary(
                function (library) {
                    library.forEach(function(libraryItem) {
                        result.push(libraryItem);
                    });
                }, function(err){

                },
                {
                    thumbnailWidth: 600,
                    thumbnailHeight: 800,
                    quality: 0.8
                });
            },
            function (err) {
            // User denied the access
            }, // if options not provided, defaults to {read: true}.
            {
                read: true,
                write: true
            }
        );

        $timeout(function () {
            $ionicLoading.hide();
            $scope.assetCollection = result;
            if($scope.libraryPhoto == null)
                $scope.libraryPhoto = result[0];

            console.log($scope.assetCollection);
        }, 4000);
    }

    /**
     *  from documentation:
     *  https://firebase.google.com/docs/storage/web/upload-files
     * 
     * This function returns a promise now to better process the
     * image data.
     */
    
    function saveToFirebase(_imageBlob, _filename) {
        // Create a root reference to the firebase storage
        var storageRef = firebase.storage().ref();
        // pass in the _filename, and save the _imageBlob
        return storageRef.child('images/' + _filename).put(_imageBlob);
    }

    function saveReferenceInDatabase(_snapshot) {

        var ref = firebase.database().ref('assets');
        var address = $rootScope.currentUser.city;

       // see information in firebase documentation on storage snapshot and metaData
        var dataToSave =  {
            'URL': _snapshot.downloadURL, // url to access file
            'name': $rootScope.currentUser.username, // name of the file
            'owner': firebase.auth().currentUser.uid,
            'email': firebase.auth().currentUser.email,
            'lastUpdated': new Date().getTime(),
            'ssORfw': $scope.ssORfw,
            'address': address,
            'lat': $rootScope.currentUser.lat,
            'long': $rootScope.currentUser.long,
            'human_type': $rootScope.form.human_type,
            'art': $rootScope.form.art,

        };

        return ref.push(dataToSave).catch(function(_error){
            alert("Error Saving to Assets " + _error.message);
        })
    }

    $scope.$on("$ionicView.enter", function(event, data){
    // handle eventDelegate.$getByHandle('onboarding').slide(0);
       loadLibrary();
    });
                            
}])
