/**
 * authentication service
 */
(function() {
    'use strict';

    angular.module('app.auth', [])
        .factory('Auth', 
            ['$rootScope', '$firebaseAuth', '$firebaseObject','$firebaseArray',
            '$state', 'FIREBASE_URL', '$ionicHistory', '$localstorage', '$ionicPopup', '$q', 'Loading',
            function($rootScope, $firebaseAuth, $firebaseObject, $firebaseArray,
                $state, FIREBASE_URL, $ionicHistory, $localstorage, $ionicPopup, $q, Loading) {

                var ref = firebase.database().ref();
                var auth = $firebaseAuth(firebase.auth());

                auth.$onAuthStateChanged(function(authUser) {
                    if (authUser) {
                        firebase.database().ref('users/' + authUser.uid)
                        .once('value').then(function(snapshot) {
                            var user = snapshot.val();
                            user.id = snapshot.key;
                            $rootScope.currentUser = user;
                            $state.go("icons");
                        });
                    } else {
                        $rootScope.currentUser = '';
                    }
                });

                return {
                    /**
                     * login
                     */
                    login: function(user) {
                        return auth.$signInWithEmailAndPassword(user.email,user.password);
                    },

                    /**
                     * logout
                     */
                    logout: function() {
                        return auth.$signOut();
                    },

                    /**
                     * require Authentication
                     */
                    requireAuth: function() {
                        return auth.$requireSignIn();
                    },

                    forgotPassword: function(user) {                        
                        return auth.$sendPasswordResetEmail(user.email);
                    },

                    /**
                     * register with email(createUser)
                     */
                    createUserByEmail: function(credential) {
                      console.log(credential);
                        return auth.$createUserWithEmailAndPassword(credential.email ,credential.password);
                    },

                    /**
                     * registUser
                     */
                    register: function(user, form) {
                        firebase.database().ref('users')
                            .child(user.uid).set({
                                date: firebase.database.ServerValue.TIMESTAMP,
                                regUser: user.uid,
                                username: form.username,
                                email: user.email,
                                lat:form.lat,
                                long:form.long,
                                address:form.address,
                                city:form.city,
                                country:form.country,
                                human_type:form.human_type,
                                art:form.art
                            });
                        return;
                    },

                    setReport: function(report) {

                        return new Promise((resolve, reject) => {

                           var fref = firebase.database().ref('report');
                           fref.push(report).then(result => resolve(true), error=> reject(error));

                        });
                    },

                    getUser: function(uid){
                            return new Promise((resolve, reject) => {
                               var fref = firebase.database().ref('users/'+uid);
                               fref.once('value')
                                    .then(snapshot => {
                                        var user = snapshot.val();
                                        user.id = snapshot.key;
                                         resolve(user);
                                    }, (error) => {
                                    reject(error);
                                });
                            })
                    },

                    setUser: function(uid, form) {

                        return new Promise((resolve, reject) => {

                           var fref = firebase.database().ref('users').child(uid);
                           fref.once('value')
                                .then(snapshot => {
                                        //var follow = !item[Object.keys(item)[0]].follow;
                                        var item = snapshot.val();
                                        fref.update({
                                            human_type: form.human_type,
                                            art:form.art,
                                            ss:form.ss,
                                            fw:form.fw,
                                            //address:form.address,
                                            //country:form.country,
                                            //city:form.city,

                                        }).then(result => resolve(true), error=> reject(error));
                                }, (error) => {
                                reject(error);
                            });
                        })

                    },

                    getUsers: function(){
                        return new Promise((resolve, reject) => {

                           var fref = firebase.database().ref('users');
                           fref.once('value')
                                .then(snapshot => {
                                    var users = [];
                                     snapshot.forEach(function(data) {
                                         var info = data.val();
                                         info.id = data.key;
                                         users.push(info);
                                     });
                                     resolve(users);
                                }, (error) => {
                                reject(error);
                            });
                        })
                    },

                    getMyFollowsByID: function(uid){
                            return new Promise((resolve, reject) => {
                               var fref = firebase.database().ref('users').child(uid).child('followers');
                               fref.orderByChild('follower')
                                    .once('value')
                                    .then(snapshot => {
                                        var followers = [];
                                         snapshot.forEach(function(data) {
                                             var info = data.val();
                                             info.id = data.key;
                                             followers.push(info);
                                         });
                                         resolve(followers);
                                    }, (error) => {
                                    reject(error);
                                });
                            })
                    },

                    getAssets: function(){
                        return new Promise((resolve, reject) => {

                           var fref = firebase.database().ref('assets');
                           fref.orderByChild('owner')
                                .once('value')
                                .then(snapshot => {
                                    var assets = [];
                                     snapshot.forEach(function(data) {
                                         var info = data.val();
                                         info.id = data.key;
                                         assets.push(info);
                                     });
                                     resolve(assets);
                                }, (error) => {
                                reject(error);
                            });
                        })
                    },


                    getLatestAssets: function(){
                        return new Promise((resolve, reject) => {

                           var ref = firebase.database().ref('users');
                           ref.once('value')
                                .then(snapshot => {
                                    var assets = [];
                                    console.log(snapshot);
                                     snapshot.forEach(function(data) {
                                         var fref = firebase.database().ref('assets');
                                         fref.orderByChild('owner')
                                             .equalTo(data.key)
                                             .once('value')
                                             .then(snapshot2 => {
                                                 var tmpTime = 0;
                                                 var tmpAsset = {};
                                                  snapshot2.forEach(function(data2) {
                                                      if(tmpTime < data2.val().lastUpdated)
                                                      {
                                                         tmpTime = data2.val().lastUpdated;
                                                         tmpAsset = data2.val();
                                                         tmpAsset.id = data2.key;
                                                      }
                                                  });
                                                  if(tmpAsset.lastUpdated)
                                                  {
                                                    assets.push(tmpAsset);
                                                  }
                                             }, (error) => {
                                             reject(error);
                                         });
                                     });
                                     resolve(assets);
                                }, (error) => {
                                reject(error);
                            });

                        })
                    },

                    setFollow: function(uid, follower_id) {

                        return new Promise((resolve, reject) => {

                           var fref = firebase.database().ref('users').child(uid).child('followers');
                           fref.orderByChild('follower')
                                .equalTo(follower_id)
                                .once('value')
                                .then(snapshot => {
                                    if(snapshot.val() == null)
                                    {
                                        var array = $firebaseArray(fref);
                                        array.$add({follower:follower_id, follow:true}).then(result => resolve(true), (error)=> reject(error));
                                    }
                                    else
                                    {
                                        var item = snapshot.val();
                                        console.log(JSON.stringify(item));
                                        var follow = !item[Object.keys(item)[0]].follow;
                                        fref.child(Object.keys(item)[0]).update({
                                            follower: follower_id,
                                            follow:follow
                                        }).then(result => resolve(follow), error=> reject(error));
                                    }
                                }, (error) => {
                                reject(error);
                            }) ;
                        })

                    },

                    getFollow: function(uid, follower_id) {

                        return new Promise((resolve, reject) => {

                           var fref = firebase.database().ref('users').child(uid).child('followers');
                           fref.orderByChild('follower')
                                .equalTo(follower_id)
                                .once('value')
                                .then(snapshot => {
                                    if(snapshot.val() == null)
                                    {
                                        resolve(false);
                                    }
                                    else
                                    {
                                        var item = snapshot.val();
                                        console.log(JSON.stringify(item));
                                        var follow = item[Object.keys(item)[0]].follow;
                                        resolve(follow);
                                    }
                                }, (error) => {
                                reject(error);
                            });
                        })

                },

                setRate: function(uid, asset_id, rate) {

                        return new Promise((resolve, reject) => {

                           var fref = firebase.database().ref('users').child(uid).child('rates');
                           fref.orderByChild('asset')
                                .equalTo(asset_id)
                                .once('value')
                                .then(snapshot => {
                                    if(snapshot.val() == null)
                                    {
                                        var array = $firebaseArray(fref);
                                        array.$add({asset:asset_id, rate:rate}).then(result => resolve(true), (error)=> reject(error));
                                    }
                                    else
                                    {
                                        var item = snapshot.val();
                                        console.log(JSON.stringify(item));
                                        //var follow = !item[Object.keys(item)[0]].follow;
                                        fref.child(Object.keys(item)[0]).update({
                                            asset: asset_id,
                                            rate:rate
                                        }).then(result => resolve(true), error=> reject(error));
                                    }
                                }, (error) => {
                                reject(error);
                            });
                        })

                    },

                    getRate: function(uid, asset_id) {

                        return new Promise((resolve, reject) => {

                           var fref = firebase.database().ref('users').child(uid).child('rates');
                           fref.orderByChild('asset')
                                .equalTo(asset_id)
                                .once('value')
                                .then(snapshot => {
                                    if(snapshot.val() == null)
                                    {
                                        resolve(0);
                                    }
                                    else
                                    {
                                        var item = snapshot.val();
                                        console.log(JSON.stringify(item));
                                        var rate = item[Object.keys(item)[0]].rate;
                                        resolve(rate);
                                    }
                                }, (error) => {
                                reject(error);
                            });
                        })

                },

                    /**
                     * Email Verification
                     */
                    emailVerification: function () {
                        return firebase.auth().currentUser.sendEmailVerification();
                    },

                    /**
                     * Is Email Verified 
                     */
                    isEmailVerified: function() {
                        return firebase.auth().currentUser.emailVerified;
                    }
                };
            }])
})();