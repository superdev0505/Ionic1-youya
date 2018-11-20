/**
 * authentication service
 */
(function() {
    'use strict';

    angular.module('app.firedb', [])
        .factory('fireDB',
            ['$q',
            function($q) {
                return {
                    /**
                     * registUser
                     */
                    report: function(rp) {
                        firebase.database().ref('report')
                            .child(user.uid).set({
                                date: firebase.database.ServerValue.TIMESTAMP,
                                regUser: rp.uid,
                                username: form.username,
                                email: user.email,
                                lat:form.lat,
                                long:form.long
                            });
                        return;
                    }
                };
            }])
})();