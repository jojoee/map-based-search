@include('layouts.header')

<div class="map-loading hidden">
	<div class="loading-overlay"></div>
	<div class="loading-icon">
		<i class="fa fa-cog fa-spin"></i>
		<div class="loading-text">Loading</div>
	</div>
</div>
<div id="map-config"><!-- #map-config -->
	<label for="zoom-level">Zoom Level: </label><input type="text" name="zoom-level" id="zoom-level">
	<label for="lat">Lat: </label><input type="text" name="lat" id="lat">
	<label for="lng">Lng: </label><input type="text" name="lng" id="lng">
	<div class="remove-all-markers btn">Remove All Markers</div>
	<div class="add-text-overlay btn">Add text overlay</div>
	<div class="update-text-overlay btn">Update text overlay</div>
	<div class="remove-text-overlay btn">Remove text overlay</div>
	{{ Form::open(array('id' => 'city-form')) }}
		{{ Form::text('city', Input::old('city'), array('placeholder' => 'City', 'id' => 'city', 'required' => 'required')) }}
		{{ Form::submit('Search') }}
	{{ Form::close() }}
</div>
<div id="map-canvas"></div><!-- #map-canvas -->
<noscript>
	<div class="nojs">
		<div class="nojs-overlay">&nbsp;</div>
		<div class="nojs-text">Sorry, Javascript is disabled on your machine. Enable Javascript or Please open the site on any other Browser</div>
	</div>
</noscript>

@include('layouts.footer')
