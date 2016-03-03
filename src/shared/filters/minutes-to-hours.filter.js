(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .filter('minutesToHours', minutesToHours);

    function minutesToHours() {
        return function (duration) {
            var output = '';

            if (duration) {
                var hours = Math.floor(duration / 60);
                var minutes = duration % 60;

                if (hours !== 0) {
                    output = hours + ' hour ';
                }

                if (minutes !== 0) {
                    output += minutes + ' min';
                }
            }

            return output;
        };
    }
})();
