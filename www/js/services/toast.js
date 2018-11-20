(function() {
    'use strict';

    angular
        .module('app.toast', [])
        .factory('Toast', ['$cordovaToast', function($cordovaToast) {
            var duration = 3500;
            var position = "bottom";
            return {
                showInfoToast: function(text) {
                    var styling = {
                        opacity: 0.75,
                        backgroundColor: '#2f96b4',
                        textColor: '#ffffff',
                        cornerRadius: 16,
                        horizontalPadding: 20,
                        veriticalPadding: 16
                    };
                    return $cordovaToast.showWithOptions({
                        message: text,
                        duration: duration,
                        position: position,
                        styling: styling
                    });
                },

                showSuccessToast: function(text) {
                    var styling = {
                        opacity: 0.75,
                        backgroundColor: '#51a351',
                        textColor: '#ffffff',
                        cornerRadius: 16,
                        horizontalPadding: 20,
                        veriticalPadding: 16
                    };
                    return $cordovaToast.showWithOptions({
                        message: text,
                        duration: duration,
                        position: position,
                        styling: styling
                    });
                },

                showWarningToast: function(text) {
                    var styling = {
                        opacity: 0.75,
                        backgroundColor: '#f89406',
                        textColor: '#ffffff',
                        cornerRadius: 16,
                        horizontalPadding: 20,
                        veriticalPadding: 16
                    };
                    return $cordovaToast.showWithOptions({
                        message: text,
                        duration: duration,
                        position: position,
                        styling: styling
                    });
                },

                showErrorToast: function(text) {
                    var styling = {
                        opacity: 0.75,
                        backgroundColor: '#bd362f',
                        textColor: '#ffffff',
                        cornerRadius: 16,
                        horizontalPadding: 20,
                        veriticalPadding: 16
                    };
                    return $cordovaToast.showWithOptions({
                        message: text,
                        duration: duration,
                        position: position,
                        styling: styling
                    });
                }
            }
        }])
})();