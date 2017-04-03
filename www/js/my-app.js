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
	
	var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
    
	//var mapOptions = {
	//    center: new google.maps.LatLng(0, 0),
	//    zoom: 1,
	//    mapTypeId: google.maps.MapTypeId.ROADMAP
	//};
	//   
	//map = new google.maps.Map
	//(document.getElementById("map"), mapOptions);
	//   
	//   
	//var latLong = new google.maps.LatLng(latitude, longitude);
	//   
	//var marker = new google.maps.Marker({
	//    position: latLong
	//});
	//   
	//marker.setMap(map);
	//map.setZoom(15);
	//map.setCenter(marker.getPosition());
    }
    
    var onSuccess = function(position) {
	posLat = position.coords.latitude;
	posLon = position.coords.longitude;
	posAcc = position.coords.accuracy;
	vel = position.coords.speed;
	velDir = position.coords.heading;
	alt = position.coords.altitude;
	altAcc = position.coords.altitudeAccuracy;
	
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
	
	if (!(vel==null)) {
	    $$('#vel').html(Math.round(vel*3.6)+'km/h');
	}
	if (!(velDir==null)) {
	    $$('#velDir').html(velDir+'&#176;');
	    $$('#compass').transform('rotate(-'+velDir+'deg)');
	}
	
	if (!(alt==null)) {
	    $$('#alt').html(Math.round(alt)+'m');
	}
	if (!(altAcc==null)) {
	    $$('#altAcc').html('&plusmn;'+Math.round(altAcc)+'m');
	} else {
	    $$('#altAcc').html('');
	}
	
	//getMap(posLat,posLon);
	
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
    
      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
      
      initMap();

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