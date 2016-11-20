var debugMode;
var config;
var map;
var mapOptions;
var markers = [];
var mapStyles = {
	Greyscale: [{"featureType": "all", "elementType": "all", "stylers": [{"saturation": -100}, {"gamma": 0.5}]}],
	lightDream: [{
		"featureType": "landscape",
		"stylers": [{"hue": "#FFBB00"}, {"saturation": 43.400000000000006}, {"lightness": 37.599999999999994}, {"gamma": 1}]
	}, {
		"featureType": "road.highway",
		"stylers": [{"hue": "#FFC200"}, {"saturation": -61.8}, {"lightness": 45.599999999999994}, {"gamma": 1}]
	}, {
		"featureType": "road.arterial",
		"stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 51.19999999999999}, {"gamma": 1}]
	}, {
		"featureType": "road.local",
		"stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 52}, {"gamma": 1}]
	}, {
		"featureType": "water",
		"stylers": [{"hue": "#0078FF"}, {"saturation": -13.200000000000003}, {"lightness": 2.4000000000000057}, {"gamma": 1}]
	}, {
		"featureType": "poi",
		"stylers": [{"hue": "#00FF6A"}, {"saturation": -1.0989010989011234}, {"lightness": 11.200000000000017}, {"gamma": 1}]
	}]
};

jQuery(document).ready(function ($) {

	var $zoomLevelInput = $('#zoom-level');
	var $latInput = $('#lat');
	var $lngInput = $('#lng');
	var $searchBtn = $('button.search');
	var $cityInput = $('#city');
	var $removeMarkersBtn = $('.remove-all-markers');
	var $addTextOverlayBtn = $('.add-text-overlay');
	var $updateTextOverlayBtn = $('.update-text-overlay');
	var $removeTextOverlayBtn = $('.remove-text-overlay');
	var tweetTextId = 'tweet-text';
	var $tweetText = $('#' + tweetTextId);
	var $pageLoading = $('.page-loading');
	var $logMsg = $('.log-msg');
	var $historyBtn = $('.history');
	var historyItemSelector = '.history-item';
	var $historyItem = $(historyItemSelector);
	var $historyBack = $('.history-back');
	var $historyPanel = $('.history-panel');
	var isHistoryUpdated = true;

	/*================================================================
	 #Google map utilities
	 ================================================================*/

	/**
	 * Check the number's in range of google map zoom level (0 - 22)
	 *
	 * @see https://developers.google.com/maps/documentation/javascript/maxzoom
	 *
	 * @param  {Integer} num
	 * @return {Boolean}
	 */
	function isZoomLevel(num) {
		return (isInteger(num) && num >= 0 && num <= 22);
	}

	/*================================================================
	 #Popup
	 ================================================================*/

	/**
	 * Popup (basic)
	 *
	 * @param {String} title
	 */
	function popup(title) {
		var timer = 2000;

		swal({
			title: title,
			text: 'It will automatically close in 2 seconds.',
			timer: timer
		}).then(
			function () {

			},
			function (dismiss) {
				if (dismiss === 'timer') {

				}
			}
		)
	}

	/*================================================================
	 #Main application
	 ================================================================*/

	/**
	 * Update zoom level of config
	 */
	function updateZoomLevel() {
		config.zoomLevel = stringToInt($zoomLevelInput.val());
	}

	/**
	 * Update latitude of config
	 */
	function updateLat() {
		config.lat = stringToFloat($latInput.val());
	}

	/**
	 * Update longitude of config
	 */
	function updateLng() {
		config.lng = stringToFloat($lngInput.val());
	}

	/**
	 * Update city of config
	 */
	function updateCity() {
		config.city = $cityInput.val();
	}

	/**
	 * Set zoom level input by procied value
	 *
	 * @param {Number} num
	 */
	function setZoomLevelInput(num) {
		$zoomLevelInput.val(num);
	}

	/**
	 * Set latitude input by provided value
	 *
	 * @param {Float} num
	 */
	function setLatInput(num) {
		$latInput.val(num);
	}

	/**
	 * Set longitude input by provided value
	 *
	 * @param {Float} num
	 */
	function setLngInput(num) {
		$lngInput.val(num);
	}

	/**
	 * Set city name input by provided value
	 *
	 * @param {String} str
	 */
	function setCityInput(str) {
		$cityInput.val(str);
	}

	/**
	 * Update zoom level input by config data
	 */
	function updateZoomLevelInput() {
		$zoomLevelInput.val(config.zoomLevel);
	}

	/**
	 * Update latitude input by config data
	 */
	function updateLatInput() {
		$latInput.val(config.lat);
	}

	/**
	 * Update longitude input by config data
	 */
	function updateLngInput() {
		$lngInput.val(config.lng);
	}

	/**
	 * Update city input by config data
	 */
	function updateCityInput() {
		$cityInput.val(config.city);
	}

	/**
	 * Show page loading effect
	 */
	function showPageLoading() {
		$pageLoading.fadeIn('slow');
	}

	/**
	 * Hide page loading effect
	 */
	function hidePageLoading() {
		$pageLoading.fadeOut('slow');
	}

	/**
	 * Hide page loading effect with delay
	 */
	function hidePageLoadingWithDelay() {
		var delayTime = 600;

		setTimeout(function () {
			$pageLoading
				.delay(delayTime)
				.fadeOut('slow');
		}, delayTime);
	}

	/**
	 * Set google map zoom level
	 *
	 * @see https://developers.google.com/maps/documentation/javascript/reference
	 *
	 * @param {Number} num
	 */
	function setGoogleMapZoomLevel(num) {
		if (isZoomLevel(num)) {
			map.setZoom(num);
		}
	}

	/**
	 * Set center of google map by latitude and longitude
	 *
	 * @param {Float} lat
	 * @param {Float} lng
	 */
	function setGoogleMapLatLng(lat, lng) {
		if (isLatLng(lat) && isLatLng(lng)) {
			var latlng = new google.maps.LatLng(lat, lng);

			map.setCenter(latlng);
		}
	}

	/**
	 * Set google map style
	 *
	 * @param {JSON} style
	 */
	function setGoogleMapStyle(style) {
		map.setOptions({styles: style});
	}

	/**
	 * Remove all google map markers
	 *
	 * @see https://developers.google.com/maps/documentation/javascript/examples/marker-remove
	 */
	function removeAllGoogleMapMarkers() {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}

		markers = [];
	}

	/**
	 * Add google map marker
	 *
	 * @param {Float} lat
	 * @param {Float} lng
	 */
	function addGoogleMapMarker(lat, lng) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			map: map
		});

		markers.push(marker);
	}

	/**
	 * Add google map marker with info window
	 *
	 * @see http://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
	 * @see http://stackoverflow.com/questions/11106671/google-maps-api-multiple-markers-with-infowindows
	 * @see http://stackoverflow.com/questions/3158598/google-maps-api-v3-adding-an-infowindow-to-each-marker
	 *
	 * @param {Array} locations
	 */
	function addGoogleMapMarkerWithInfo(locations) {
		for (var i = 0; i < locations.length; i++) {
			var icon;
			var marker;
			var infowindow;

			icon = {
				url: locations[i].iconImage,
				size: new google.maps.Size(48, 48),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(24, 24),
				zIndex: 88
			};

			infowindow = new google.maps.InfoWindow();
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
				map: map,
				icon: icon,
				title: locations[i].title,
				zIndex: 1,
				draggable: false,
			});

			google.maps.event.addListener(marker, 'click', (function (marker, i) {
				return function () {
					infowindow.setContent(locations[i].content);
					infowindow.open(map, marker);
				}
			})(marker, i));

			markers.push(marker);
		}
	}

	/**
	 * Add new google map text overlay
	 *
	 * @see http://stackoverflow.com/questions/5099862/how-to-create-a-text-overlay-in-google-maps-api-v3-that-does-not-pan
	 */
	function addGoogleMapTextOverlay() {
		if (debugMode) logText('Add google map text overlay', config.city);
		$('<div id="tweet-text">Tweets about <span class="city-text">' + config.city + '</span></div>').appendTo('.container');
		var tweetTextControl = document.getElementById(tweetTextId);

		map.controls[google.maps.ControlPosition.TOP_CENTER].push(tweetTextControl);
	}

	/**
	 * Update google map text overlay (remove and add again)
	 */
	function updateGoogleMapTextOverlay() {
		if (debugMode) logText('Update google map text overlay');

		removeGoogleMapTextOverlay();
		addGoogleMapTextOverlay();
	}

	/**
	 * Remove google map text overlay
	 */
	function removeGoogleMapTextOverlay() {
		if (debugMode) logText('Remove google map text overlay');

		$tweetText = $('#' + tweetTextId);
		$tweetText.remove();
	}

	/**
	 * Update all input data by config data
	 */
	function updateAllInputData() {
		updateZoomLevelInput();
		updateLatInput();
		updateLngInput();
		updateCityInput();
	}

	/**
	 * Update config data by input field
	 */
	function updateAllConfigData() {
		updateZoomLevel();
		updateLat();
		updateLng();
		updateCity();
	}

	/**
	 * Update google map canvas
	 */
	function updateGoogleMap() {
		setGoogleMapZoomLevel(config.zoomLevel);
		setGoogleMapLatLng(config.lat, config.lng);
		updateGoogleMapTextOverlay()
	}

	/**
	 * Get search history and open the history panel
	 */
	function openHistoryPanel() {
		showPageLoading();

		// get search history data
		if (isHistoryUpdated) {
			try {
				$.get('/tweet/history', function (data) {
					var history = data;

					if (history !== '') {
						// order by most recent first
						history = splitStringByComma(history).reverse();
						$historyItem.remove();

						$.each(history, function (index, value) {
							$('<li class="history-item">' + replacePlusWithSpace(value) + '</li>').appendTo('.history-list');
						});

						isHistoryUpdated = false;
						$historyItem = $('.history-item');
					}

					if (debugMode) {
						if (history === '') {
							logText('No search history');

						} else {
							logText('Search history', history);
						}
					}
				});

			} catch (exception) {
				// if error then ?
				if (debugMode) logText('Can\'t get search history');

			} finally {
				// do nothing
			}

		} else {
			if (debugMode) logText('Not get new search history');
		}

		hidePageLoading();

		// bind history item again
		$historyItem = $('.history-item');

		// open history panel
		$historyPanel.fadeIn('slow');
	}

	/**
	 * Update search history with city name
	 *
	 * @param {String} cityName
	 */
	function updateSearchHistory(cityName) {
		try {
			$.post('/tweet/' + cleanCityName(cityName), function (data) {
				if (debugMode) {
					if (data === 'OK') {
						logText('Update search history: success');

					} else {
						logText('Can\' update search history');
					}
				}

				isHistoryUpdated = true;
			});

		} catch (exception) {
			if (debugMode) console.log(exception);
		}
	}

	/**
	 * Get new tweets from city name and update google map with new tweets
	 *
	 * @param {String} cityName
	 */
	function updateGoogleMapWithTweets(cityName) {
		showPageLoading();

		try {
			$.get('/tweet/' + cleanCityName(cityName), function (data) {
				if (data === 'Twitter - Bad Authentication data') {
					var errorMessage = 'Twitter - Bad Authentication data';
					if (debugMode) logText(errorMessage);

					popup(errorMessage);

				} else {
					if (debugMode) console.log(data);
					var results = $.parseJSON(data);

					if (results.status.toUpperCase() === 'OK') {
						var locations = $.parseJSON(results.data);

						setLatInput(results.lat);
						setLngInput(results.lng);

						// remove all previous marker on the map
						removeAllGoogleMapMarkers();

						// add new marker on the map
						addGoogleMapMarkerWithInfo(locations);

						updateAllConfigData();
						updateGoogleMap();

						// update latest search
						config.latestCity = cityName;
						if (debugMode) logText('Update Map with new tweets: success');

					} else {
						var errorMessage = results.errorMsg;
						if (debugMode) logText('Error', errorMessage);

						popup(errorMessage);
					}
				}
			});

		} catch (exception) {
			var errorMessage = 'Can\'t get tweet data';
			if (debugMode) logText(errorMessage);

			popup(errorMessage);

		} finally {
			hidePageLoading();
		}
	}

	/**
	 * Perform search tweet
	 */
	function performSearchTweets() {
		var cityName = $cityInput.val();
		if (config.latestCity.toUpperCase() !== cityName.toUpperCase()) {
			updateSearchHistory(cityName);
			updateGoogleMapWithTweets(cityName);

		} else {
			// do nothing
			if (debugMode) logText('Search: Do nothing');
		}
	}

	/*================================================================
	 #Test / Dummy
	 ================================================================*/

	/**
	 * Dummy marker and update the map
	 */
	function dummyMarker() {
		config = {
			lat: -33.92,
			lng: 151.25,
			zoomLevel: 11,
			styles: mapStyles.lightDream,
			city: 'Coogee Bay',
			latestCity: ''
		};

		var locations = [
			{
				title: 'Bondi Beach',
				content: 'Bondi Beach',
				lat: -33.890542,
				lng: 151.274856,
				iconImage: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'
			},
			{
				title: 'Coogee Beach',
				content: 'Coogee Beach',
				lat: -33.923036,
				lng: 151.259052,
				iconImage: 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png'
			},
			{
				title: 'Cronulla Beach',
				content: 'Cronulla Beach',
				lat: -34.028249,
				lng: 151.157507,
				iconImage: 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png'
			},
			{
				title: 'Manly Beach',
				content: 'Manly Beach',
				lat: -33.80010128657071,
				lng: 151.28747820854187,
				iconImage: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'
			},
			{
				title: 'Maroubra Beach',
				content: 'Maroubra Beach',
				lat: -33.950198,
				lng: 151.259302,
				iconImage: 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png'
			}
		];

		addGoogleMapMarkerWithInfo(locations);
	}

	/*================================================================
	 #Debug / Log
	 ================================================================*/

	/**
	 * Log zoom level of config into console
	 */
	function logZoomLevel() {
		logText('Zoom Level', config.zoomLevel);
	}

	/**
	 * Log latitude of config into console
	 */
	function logLat() {
		logText('Lat', config.lat);
	}

	/**
	 * Log longitude of config into console
	 */
	function logLng() {
		logText('Lng', config.lng);
	}

	/**
	 * Log city of config into console
	 */
	function logCity() {
		logText('City', config.city);
	}

	/**
	 * Log text into console
	 *
	 * @param {String} title
	 * @param {String} data
	 */
	function logText(title, data) {
		var msg = title;
		if (typeof data !== 'undefined') msg += ': ' + data;

		console.log(msg);
		$logMsg.text(msg);
	}

	/*================================================================
	 #Event listener
	 ================================================================*/

	/**
	 * When zoom level input is changed then update zoom level of google map
	 */
	$zoomLevelInput.on('input', function (e) {
		updateZoomLevel();
		if (debugMode) logZoomLevel();
		setGoogleMapZoomLevel(config.zoomLevel);
	});

	/**
	 * When latitude input is changed then update latitude of google map
	 */
	$latInput.on('input', function (e) {
		updateLat();
		if (debugMode) logLat();
		setGoogleMapLatLng(config.lat, config.lng);
	});

	/**
	 * When longitude input is changed then update longitude of google map
	 */
	$lngInput.on('input', function (e) {
		updateLng();
		if (debugMode) logLng();
		setGoogleMapLatLng(config.lat, config.lng);
	});

	/**
	 * When city input is changed then update center of google map
	 */
	$cityInput.on('input', function (e) {
		updateCity();
		if (debugMode) logCity();
		updateGoogleMapTextOverlay(config.city);
	});

	/**
	 * When click 'Remove All Markers' then remove all markers on the google map
	 */
	$removeMarkersBtn.on('click', function (e) {
		removeAllGoogleMapMarkers(markers);
	});

	/**
	 * When click 'Add text overlay' then update text overlay on the google map
	 */
	$addTextOverlayBtn.on('click', function (e) {
		updateGoogleMapTextOverlay();
	});

	/**
	 * When click 'Update text overlay' then update text overlay on the google map
	 */
	$updateTextOverlayBtn.on('click', function (e) {
		updateGoogleMapTextOverlay();
	});

	/**
	 * When click 'Remove text overlay' then remove text overlay on the google map
	 */
	$removeTextOverlayBtn.on('click', function (e) {
		removeGoogleMapTextOverlay();
	});

	/**
	 * Open history panel when click 'History' button
	 */
	$historyBtn.on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		window.event.cancelBubble = true;

		openHistoryPanel();

		return false;
	});

	/**
	 * When click 'Back to the tweets' then hide the history panel
	 */
	$historyBack.on('click', function (e) {
		$historyPanel.fadeOut('slow');
	});

	/**
	 * When click search history item then seach again
	 *
	 * @see http://stackoverflow.com/questions/1359018/in-jquery-how-to-attach-events-to-dynamic-html-elements
	 */
	$('body').on('click', historyItemSelector, function () {
		$historyPanel.fadeOut('slow');

		setCityInput($(this).text());

		// re search tweets
		performSearchTweets();
	});

	/**
	 * When click sarch button then get tweets and update the map
	 */
	$searchBtn.on('click', function (e) {
		e.preventDefault();
		if (debugMode) logText('Search city');
		performSearchTweets();

		return false;
	});

	/*================================================================
	 #Init
	 ================================================================*/

	/**
	 * Initialize config data and map options
	 */
	function initConfig() {
		debugMode = false;

		// default config
		config = {
			lat: 13.7563,
			lng: 100.5018,
			zoomLevel: 12,
			styles: mapStyles.lightDream,
			city: 'Bangkok',
			latestCity: ''
		};

		mapOptions = {
			center: {
				lat: config.lat,
				lng: config.lng
			},
			zoom: config.zoomLevel,
			styles: config.styles,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	}

	/**
	 * Initialize google map
	 */
	function initGoogleMap() {
		map = new google.maps.Map(
			document.getElementById('map-canvas'),
			mapOptions
		);

		// Google map event listener
		google.maps.event.addListener(map, 'zoom_changed', function () {
			var zoomLevel = map.getZoom();
			setZoomLevelInput(zoomLevel);

			if (debugMode) logText('Google map zoom level\'s changed', zoomLevel);
		});
	}

	/**
	 * Initialize an application
	 */
	function initialize() {
		// Init
		initConfig();
		initGoogleMap();

		// Update
		updateAllInputData();
		updateGoogleMap();

		// Others
		hidePageLoadingWithDelay();
	}

	google.maps.event.addDomListener(window, 'load', initialize);
});
