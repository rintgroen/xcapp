// Initialize app
var myApp = new Framework7();

// var myApp = new Framework7({
    // preprocess: function (content, url, next) {
        // if (url === 'test.html') {
			
			// var curLat = undefined;
			
			// var onSuccess = function(position) {
			// function onSuccess(position) {
				// curLat = position.coords.latitude;
				// curLat = 'Noordelijk';
				// alert(curLat);
				// var template = Template7.compile(content);
				// var mylat =  'Noord';
				// resultContent = template({
					// latitude: mylat,
					// longitude: 'E 5...',
					// altitude: 'alt',
				// })
			// };			
			// function onError(error) {
				// alert('code: '    + error.code    + '\n' +
					  // 'message: ' + error.message + '\n');
			// }			
			// navigator.geolocation.getCurrentPosition(onSuccess, onError);
			
            // var template = Template7.compile(content);
			// var mylat =  'Noord';
            // var resultContent = template({
                // latitude: curLat,
				// longitude: 'E 5...',
				// altitude: 'alt',
            // })
			
			// return resultContent;
			
        // }
    // }
// });


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


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('test', function (page) {
	
	// var onSuccess = function(position) {									
        // alert('Latitude: '          + position.coords.latitude          + '\n' +
              // 'Longitude: '         + position.coords.longitude         + '\n' +
              // 'Altitude: '          + position.coords.altitude          + '\n' +
              // 'Accuracy: '          + position.coords.accuracy          + '\n' +
              // 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              // 'Heading: '           + position.coords.heading           + '\n' +
              // 'Speed: '             + position.coords.speed             + '\n' +
              // 'Timestamp: '         + position.timestamp                + '\n');
    // };
    // function onError(error) {
        // alert('code: '    + error.code    + '\n' +
              // 'message: ' + error.message + '\n');
    // }
    // navigator.geolocation.getCurrentPosition(onSuccess, onError);

})

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