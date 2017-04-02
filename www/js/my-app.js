// Initialize app
var myApp = new Framework7({
    cache: false,
    precompileTemplates: true,
    
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});





myApp.onPageInit('mylocation', function (page) {
    var posLat = null;
    var posLon = null;
    var posAcc = null;
    var alt = null;
    var altAcc = null;
    var vel = null;
    var velDir = null;
    var geoTime = null;
    
    function getMap(latitude, longitude) {
    
	var mapOptions = {
	    center: new google.maps.LatLng(0, 0),
	    zoom: 1,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
    
	map = new google.maps.Map
	(document.getElementById("map"), mapOptions);
    
    
	var latLong = new google.maps.LatLng(latitude, longitude);
    
	var marker = new google.maps.Marker({
	    position: latLong
	});
    
	marker.setMap(map);
	map.setZoom(15);
	map.setCenter(marker.getPosition());
    }
    
    var onSuccess = function(position) {
	posLat = position.coords.latitude;
	posLon = position.coords.longitude;
	posAcc = position.coords.accuracy;
	velDir = position.coords.heading;
	
	if (posLat>0) {
	    $$('#posLat').html('N '+posLat);
	} else {
	    $$('#posLat').html('S '+posLat);
	}
	
	if (posLon>0) {
	    $$('#posLon').html('E '+posLon);
	} else {
	    $$('#posLon').html('W '+posLon);
	}
	$$('#posAcc').html('&plusmn;'+Math.round(posAcc)+'m');
	
	$$('#vel').html(vel+'m/s');
	$$('#velDir').html(velDir+'&#176;');
	$$('#compass').transform('rotate(-'+velDir+'deg)');
	
	$$('#alt').html(vel+'m');
	$$('#altAcc').html('&plusmn;'+Math.round(altAcc)+'m');
	
	//getMap(posLat,posLon);
	$$('#map').html('here should come the map');
	
    };
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    
    var watchId = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });
    //navigator.geolocation.getCurrentPosition(onSuccess, onError);
    //alert('page test initialized');

})

myApp.onPageInit('test', function (page) {
    
    alert('testing');
    
    var Latitude = undefined;
    var Longitude = undefined;
    
    // Get geo coordinates
    
    function getMapLocation() {
    
	navigator.geolocation.getCurrentPosition
	(onMapSuccess, onMapError, { enableHighAccuracy: true });
    }
    
    // Success callback for get geo coordinates
    
    var onMapSuccess = function (position) {
	
	alert('succes');
    
	Latitude = position.coords.latitude;
	Longitude = position.coords.longitude;
    
	getMap(Latitude, Longitude);
    
    }
    
    // Get map by using coordinates
    
    function getMap(latitude, longitude) {
	
	alert('getting map');
    
	var mapOptions = {
	    center: new google.maps.LatLng(0, 0),
	    zoom: 1,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
    
	map = new google.maps.Map
	(document.getElementById("map"), mapOptions);
    
	var latLong = new google.maps.LatLng(latitude, longitude);
    
	var marker = new google.maps.Marker({
	    position: latLong
	});
    
	marker.setMap(map);
	map.setZoom(15);
	map.setCenter(marker.getPosition());
    }
    
    // Success callback for watching your changing position
    
    var onMapWatchSuccess = function (position) {
    
	var updatedLatitude = position.coords.latitude;
	var updatedLongitude = position.coords.longitude;
    
	if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
    
	    Latitude = updatedLatitude;
	    Longitude = updatedLongitude;
    
	    getMap(updatedLatitude, updatedLongitude);
	}
    }
    
    // Error callback
    
    function onMapError(error) {
	alert('error');
	console.log('code: ' + error.code + '\n' +
	    'message: ' + error.message + '\n');
    }
    
    // Watch your changing position
    
    function watchMapPosition() {
    
	return navigator.geolocation.watchPosition
	(onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
    }

});


// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        // myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    // myApp.alert('Here comes About page');
	
})