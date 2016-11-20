@include('layouts.header')

<div class="page-loading">
	<div class="loading-overlay"></div>
	<div class="loading-icon">
		<i class="fa fa-cog fa-spin"></i>

		<div class="loading-text">Loading</div>
	</div>
</div><!-- .map-loading -->
<div class="history-panel hidden">
	<div class="history-overlay"></div>
	<ul class="history-list">
		<li class="history-back">Back to the tweets</li>
	</ul>
</div><!-- .history-panel -->
<div id="map-config">
	<div class="zoom-level-box">
		<label for="zoom-level">Zoom Level: </label>
		<input type="text" name="zoom-level" id="zoom-level" placeholder="Zoom level">
	</div>
	<div class="lat-box">
		<label for="lat">Lat: </label>
		<input type="text" name="lat" id="lat" placeholder="Latitude">
	</div>
	<div class="lng-box">
		<label for="lng">Lng: </label>
		<input type="text" name="lng" id="lng" placeholder="Longitude">
	</div>
	<div class="btn-box">
		<div class="remove-all-markers red-btn btn">Remove All Markers</div>
		<div class="add-text-overlay red-btn btn">Add text overlay</div>
		<div class="update-text-overlay red-btn btn">Update text overlay</div>
		<div class="remove-text-overlay red-btn btn">Remove text overlay</div>
	</div>

	<div class="latest-log hidden">
		<span>Latest log:</span>
		<span class="log-msg">No error</span>
	</div>

	{{ Form::open(['id' => 'city-form']) }}
	<div class="city-box">{{ Form::text('city', Input::old('city'), ['placeholder' => 'City name', 'id' => 'city', 'required' => 'required']) }}</div>
	<button class="search btn">Search</button>
	<button class="history btn">History</button>
	{{ Form::close() }}
</div><!-- #map-config -->
<div id="map-canvas"></div><!-- #map-canvas -->
<noscript>
	<div class="nojs">
		<div class="nojs-overlay">&nbsp;</div>
		<div class="nojs-text">Sorry, Javascript is disabled on your machine. Enable Javascript or Please open the site
			on any other Browser
		</div>
	</div>
</noscript>

@include('layouts.footer')
