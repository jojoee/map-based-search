</div><!-- .row -->
</div><!-- .container -->
<div class="hidden-script">
	{{ HTML::script('https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js') }}
	<script src="https://maps.googleapis.com/maps/api/js?key={{ $googleMapApiKey }}"></script>
	{{ HTML::script('https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.1.1/sweetalert2.min.js') }}
	{{ HTML::script('js/utilities.js') }}
	{{ HTML::script('js/app.js') }}
</div>
</body>
</html>