jQuery(document).ready(function() {

	var $zoomLevelInput = $('#zoom-level');
	var $latInput = $('#lat');
	var $lngInput = $('#lng');

	var $cityForm = $('#city-form');
	var $cityInput = $('#city');

	var $removeMarkersBtn = $('.remove-all-markers');
	var $addTextOverlayBtn = $('.add-text-overlay');
	var $updateTextOverlayBtn = $('.update-text-overlay');
	var $removeTextOverlayBtn = $('.remove-text-overlay');
	
	var tweetTextId = 'tweet-text';
	var $tweetText = $('#' + tweetTextId);
	var $cityText = $('.city-text');

	var $mapLoading  = $('.map-loading');
	var latestCity;
	
	function updateZoomLevel() {
		config.zoomLevel = stringToInt($zoomLevelInput.val());
	}

	function updateLat() {
		config.lat = stringToFloat($latInput.val());
	}

	function updateLng() {
		config.lng = stringToFloat($lngInput.val());
	}

	function updateCity() {
		config.city = $cityInput.val();
	}

	// function getZoomLevel() {
	// 	return stringToInt($zoomLevelInput.val());
	// }

	// function getLat() {
	// 	return stringToFloat($latInput.val());
	// }

	// function getLng() {
	// 	return stringToFloat($lngInput.val());
	// }

	function logZoomLevel() {
		logText('Zoom Level', config.zoomLevel);
	}

	function logLat() {
		logText('Lat', config.lat);
	}

	function logLng() {
		logText('Lng', config.lng);
	}

	function logCity() {
		logText('City', config.city);
	}

	function logText(title, data) {
		if (typeof data === 'undefined') {
			data = '';
		} else {
			data = ': ' + data;
		}
		console.log(title + data);
	}

	function setInputZoomLevel(num) {
		$zoomLevelInput.val(num);
	}

	function setInputLat(num) {
		$latInput.val(num);
	}

	function setInputLng(num) {
		$lngInput.val(num);	
	}

	function updateInputCity(num) {
		$cityInput.val(num);
	}

	/**
	 * Update zoom level input by config data
	 */
	function updateInputZoomLevel() {
		$zoomLevelInput.val(config.zoomLevel);
	}

	/**
	 * Update lat input by config data
	 */
	function updateInputLat() {
		$latInput.val(config.lat);
	}

	/**
	 * Update lng input by config data
	 * @return {[type]} [description]
	 */
	function updateInputLng() {
		$lngInput.val(config.lng);
	}

	/**
	 * Update city input by config data
	 */
	function updateInputCity() {
		$cityInput.val(config.city);
	}

	/*================================================================
		#Google map
		================================================================*/

	/**
	 * [isZoomLevel description]
	 * @see https://developers.google.com/maps/documentation/javascript/maxzoom
	 * @param  {[type]}  num [description]
	 * @return {Boolean}     [description]
	 */
	function isZoomLevel(num) {
		return (isInteger(num) && num >= 0 && num <= 22);
	}

	/**
	 * [isLatLng description]
	 * @see https://answers.yahoo.com/question/index?qid=20071121075230AATuvo3
	 * @param  {[type]}  num [description]
	 * @return {Boolean}     [description]
	 */
	function isLatLng(num) {
		return (isFloat(num) && num >= -180 && num <= 180);
	}

	/**
	 * [setGoogleMapZoomLevel description]
	 * @see https://developers.google.com/maps/documentation/javascript/reference
	 * @param {[type]} num [description]
	 */
	function setGoogleMapZoomLevel(num) {
		if (isZoomLevel(num)) map.setZoom(num);
	}

	function setGoogleMapLatLng(lat, lng) {
		if (isLatLng(lat) && isLatLng(lng)) {
			var latlng = new google.maps.LatLng(lat, lng);
			map.setCenter(latlng);
		}
	}

	function setGoogleMapStyle(style) {
		map.setOptions({styles: style});
	}

	/**
	 * [removeGoogleMapAllMarkers description]
	 *
	 * @see https://developers.google.com/maps/documentation/javascript/examples/marker-remove
	 * @return {[type]} [description]
	 */
	function removeGoogleMapAllMarkers() {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}

		markers = [];
	}

	function addGoogleMapMarker(lat, lng) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			map: map
		});

		markers.push(marker);
	}

	/**
	 * [addGoogleMapMarkerWithInfo description]
	 * @see http://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
	 * @see http://stackoverflow.com/questions/11106671/google-maps-api-multiple-markers-with-infowindows
	 * @see http://stackoverflow.com/questions/3158598/google-maps-api-v3-adding-an-infowindow-to-each-marker
	 * @param {[type]} locations [description]
	 */
	function addGoogleMapMarkerWithInfo(locations) {
		for (var i = 0; i < locations.length; i++) {
			var icon;
			var marker;
			var infowindow;

			icon = 'https://maps.google.com/mapfiles/kml/shapes/schools_maps.png';

			// icon = {
			// 	path: google.maps.SymbolPath.CIRCLE,
			// 	scale: 10
			// },

			icon = {
				url: locations[i].iconImage,
				size: new google.maps.Size(48, 48),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(24, 24),
				zIndex: 88,


				// url: 'http://pbs.twimg.com/profile_images/601164070566277120/Qs1eXUyx_normal.jpg',
				// scale: 10,
				// size:new google.maps.Size(34,34)},
				// shape:{coords:[17,17,18],type:'circle'},
				// optimized:false
			};

			// icon = new google.maps.MarkerImage(
			// 	'http://i.imgur.com/3YJ8z.png',
			// 	new google.maps.Size(19,25),    // size of the image
			// 	new google.maps.Point(0,0), // origin, in this case top-left corner
			// 	new google.maps.Point(9, 25)    // anchor, i.e. the point half-way along the bottom of the image
			// );
			
			// shape = {
			// 	coords: [1, 1, 1, 20, 18, 20, 18 , 1],
			// 	type: 'circle'
			// };

			infowindow = new google.maps.InfoWindow();
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
				map: map,
				icon: icon,
				title: locations[i].title,
				zIndex: 1,
				draggable: false,
			});

			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					infowindow.setContent(locations[i].content);
					infowindow.open(map, marker);
				}
			})(marker, i));

			markers.push(marker);
		}
	}

	/**
	 * [addGoogleMapTextOverlay description]
	 *
	 * http://stackoverflow.com/questions/5099862/how-to-create-a-text-overlay-in-google-maps-api-v3-that-does-not-pan
	 */
	function addGoogleMapTextOverlay() {
		if (debugMode) logText('Add text overlay', config.city);

		$('<div id="tweet-text">Tweets about <span class="city-text">' + config.city + '</span></div>').appendTo('.container');
		var tweetTextControl = document.getElementById(tweetTextId);
		map.controls[google.maps.ControlPosition.TOP_CENTER].push(tweetTextControl);
	}

	function updateGoogleMapTextOverlay() {
		if (debugMode) logText('Update text overlay');

		removeGoogleMapTextOverlay();
		addGoogleMapTextOverlay();
	}

	function removeGoogleMapTextOverlay() {
		if (debugMode) logText('Remove text overlay');
		
		$tweetText = $('#' + tweetTextId);
		$tweetText.remove();
	}

	/**
	 * [updateAllInputDatas description]
	 * Update input data by config data
	 * @return {[type]} [description]
	 */
	function updateAllInputData() {
		updateInputZoomLevel();
		updateInputLat();
		updateInputLng();
		updateInputCity();
	}

	/**
	 * Update config data from input field
	 * @return {[type]} [description]
	 */
	function updateAllConfigData() {
		updateZoomLevel()
		updateLat()
		updateLng();
		updateCity();
	}

	/**
	 * Update map canvas
	 * @return {[type]} [description]
	 */
	function updateGoogleMap() {
		setGoogleMapZoomLevel(config.zoomLevel);
		setGoogleMapLatLng(config.lat, config.lng);	
		updateGoogleMapTextOverlay()
	}

	function getLocationData() {

	}

	/*================================================================
		#Test / Dummy
		================================================================*/

	/**
	 * Dummy marker on the google map
	 * not work
	 * 
	 * @return {[type]} [description]
	 */
	function dummyMarker() {
		config = {
			lat: -33.92,
			lng: 151.25,
			zoomLevel: 11,
			styles: mapStyles.lightDream,
			city: 'Coogee Bay' // this is not a city name
		};
		updateAllInputData();
		updateGoogleMap();

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
		#Event listener
		================================================================*/

	$zoomLevelInput.on('input',function(e){
		updateZoomLevel();
		if (debugMode) logZoomLevel();
		setGoogleMapZoomLevel(config.zoomLevel);
	});

	$latInput.on('input',function(e){
		updateLat();
		if (debugMode) logLat();
		setGoogleMapLatLng(config.lat, config.lng);
	});

	$lngInput.on('input',function(e){
		updateLng();
		if (debugMode) logLng();
		setGoogleMapLatLng(config.lat, config.lng);
	});

	$cityInput.on('input',function(e){
		updateCity();
		if (debugMode) logCity();
		updateGoogleMapTextOverlay(config.city);
	});

	$removeMarkersBtn.on('click', function(e) {
		removeGoogleMapAllMarkers(markers);
	});

	$updateTextOverlayBtn.on('click', function(e) {
		addGoogleMapTextOverlay();
	});

	$removeTextOverlayBtn.on('click', function(e) {
		removeGoogleMapTextOverlay();
	});

	$cityForm.on('submit', function(e) {
		e.preventDefault();
		$mapLoading.fadeIn('slow');
		cityName = $cityInput.val();

		if (latestCity.toUpperCase() !== cityName.toUpperCase()) {
			try {
				$.get('/map/get/' + cityName, function(data) {
					var results = $.parseJSON(data);
					if (debugMode) console.log(results);

					if (results.status === 'OK') {
						var locations = $.parseJSON(results.data);

						setInputLat(results.lat);
						setInputLng(results.lng);

						// remove all previous marker on the map
						removeGoogleMapAllMarkers();

						// add new marker on the map
						addGoogleMapMarkerWithInfo(locations);

						updateAllConfigData();
						updateGoogleMap();

						$mapLoading.fadeOut('slow');
					} else {
						// if error then ?
					}
				});

			} catch(exception){ 
				// if error then ?
				
			} finally {
				$mapLoading.fadeOut('slow');
				
			}

			latestCity = cityName;
		} else {
			// do nothing
		}

		return false;
	});

	/*================================================================
		#Init
		================================================================*/

	function initConfig() {
		debugMode = true;

		config = {
			lat: 13.7563,
			lng: 100.5018,
			zoomLevel: 12,
			styles: mapStyles.lightDream,
			city: 'Bangkok'
		};
		latestCity = '';

		mapOptions = {
			center: {
				lat: config.lat,
				lng: config.lng
			},
			zoom: config.zoomLevel,
			styles: config.styles,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	}

	function initMarker() {
		
		// var locations = [
		// 	{
		// 		title: 'Bangkok',
		// 		content: 'Bangkok',
		// 		lat: -33.92,
		// 		lng: 151.25,
		// 		iconImage: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'
		// 	}
		// ];

		// addGoogleMapMarkerWithInfo(locations);
	}

	function initGoogleMap() {
		map = new google.maps.Map(
			document.getElementById('map-canvas'),
			mapOptions
		);
	}

	/**
	 * Initialize an application
	 */
	function initialize() {
		initConfig();
		initGoogleMap();
		updateAllInputData();
		updateGoogleMap();

		initMarker();
	}

	google.maps.event.addDomListener(window, 'load', initialize);
});
