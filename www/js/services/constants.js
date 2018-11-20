/**
 * app.constants
 */
(function() {
    'use strict';

    angular
        .module('app.constants', [])
        .constant('FIREBASE_URL', 'https://testwhere-f52b0.firebaseapp.com')
        .constant('DB_CONFIG', {
            name: 'mtrl',
            tables: {
                contacts:{
                    id : 'INTEGER',
                    name: 'TEXT',
                    items:'TEXT'
                }
            }
        })
})();