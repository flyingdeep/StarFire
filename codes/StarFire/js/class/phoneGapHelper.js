var phoneGapHelperClass = function() {
    this.addDeviceReadyEventPhoneGap = function (e) {
        document.addEventListener("deviceready", e, false);
    };



    this.addBackButtonEventPhoneGap = function (e) {
        document.addEventListener("backbutton", e, false);
    };

    this.removeBackButtonEventPhoneGap = function (e) {
        document.removeEventListener("backbutton", e, false);
    };

    this.addMenuButtonEventPhoneGap = function (e) {
        document.addEventListener("menubutton", e, false);
    };

    this.removeMenuButtonEventPhoneGap = function (e) {
        document.removeEventListener("menubutton", e, false);
    };

    this.addSearchButtonEventPhoneGap = function (e) {
        document.addEventListener("searchbutton", e, false);
    };

    this.removeSearchButtonEventPhoneGap = function (e) {
        document.removeEventListener("searchbutton", e, false);
    };

    this.getSinglePositionPhoneGap = function (callback) {
        navigator.geolocation.getCurrentPosition(function(position) {
            alert('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
            callback();
        }, function(error){
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        });
    };

    this.watchPositionPhoneGap = function (callback) {
        var options =  {maximumAge: 3000, timeout: GPS_INTERVAL, enableHighAccuracy: true };
        return navigator.geolocation.watchPosition(function(position) {
            alert('Latitude: '  + position.coords.latitude      + '<br />' +
                'Longitude: ' + position.coords.longitude     + '<br />');
            callback();
        }, function(error){
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        },interval);
    };

    this.clearWatchPhoneGap = function (watchId) {
        navigator.geolocation.clearWatch(watchId);
    };

    this.vibratePhoneGap = function() {
        navigator.vibrate(PHONE_VIBRATE);
    };

    this.getDeviceInfo = function(){
       return {"platform":device.platform,
        "version":device.version};
    }

    this.checkConnection = function(){
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        return networkState;
    }




};