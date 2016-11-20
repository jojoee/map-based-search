<?php

/**
 * Main class of the application
 */
class MapController extends \BaseController {

	/** @var bool|string */
	private $currentDateTime;

	/** @var bool|string */
	private $hourAgoDateTime;

	/** @var string */
	private $radius;

	/**
	 * Construct method, set value of global variable
	 */
	public function __construct()
	{
		$this->currentDateTime = date('Y-m-d H:i:s');
		$this->hourAgoDateTime = date('Y-m-d H:i:s', strtotime('-1 hour'));
		$this->radius = '50km';
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$data = [
			'googleAnalyticsKey' => Config::get('constants.googleAnalyticsKey'),
			'googleMapApiKey'    => Config::get('constants.googleMapKey')
		];

		return View::make('map.show', $data);
	}

	/**
	 * Get tweet data by city name via ajax only
	 *
	 * @param string $city city name
	 */
	public function getTweets($city)
	{
		if ( ! Request::ajax()) {
			return Redirect::to('/');
		}

		$city = strtoupper($city);
		$record = Tweet::where('city', $city)->where('updated_at', '>', $this->hourAgoDateTime)->first();
		$errorMessage = '';

		if ($record) {
			$status = 'OK';
			$tweetsEncode = $record->data;
			$lat = $record->lat;
			$lng = $record->lng;

		} else {
			$record = Tweet::where('city', $city)->first();

			if ($record) {
				$lat = $record->lat;
				$lng = $record->lng;

			} else {
				$geo = $this->getLatLng($city);

				// if error then ?
				if (empty($geo)) {
					die();
				}

				$lat = $geo['lat'];
				$lng = $geo['lng'];
			}

			$tweets = $this->getTweetData($city, $lat, $lng);

			// if error then status = 'NOOK'
			if (empty($tweets)) {
				$status = 'NOOK';
				$tweetsEncode = json_encode([]);
				$errorMessage = 'No tweets found';

			} else {
				$status = 'OK';
				$tweetsEncode = json_encode($tweets);

				$record = Tweet::where('city', $city)->first();
				if ($record) {
					// Update the record
					Tweet::where('city', $city)->update(['data' => $tweetsEncode]);

				} else {
					// Add new record
					$tweetData = [
						'city' => $city,
						'data' => $tweetsEncode,
						'lat'  => $lat,
						'lng'  => $lng
					];
					Tweet::create($tweetData);
				}
			}
		}

		$data = [
			'status'   => $status,
			'data'     => $tweetsEncode,
			'lat'      => $lat,
			'lng'      => $lng,
			'errorMsg' => $errorMessage
		];

		echo json_encode($data);
	}

	/*================================================================
	  #Private
	  ================================================================*/

	/**
	 * Get latitude longitude by city name via Google Geocoding API
	 *
	 * @param  string $city city name
	 *
	 * @return array
	 */
	private function getLatLng($city)
	{
		$targetUrl = 'http://maps.googleapis.com/maps/api/geocode/json?address='.$city.'&sensor=false';

		try {
			$jsonData = json_decode(file_get_contents($targetUrl));
			$results = [];

			if ($jsonData->status == 'OK') {
				$results = [
					'lat' => $jsonData->results[0]->geometry->location->lat,
					'lng' => $jsonData->results[0]->geometry->location->lng
				];
			}

		} catch (Exception $e) {
			// if error then ?
			// echo 'Caught exception: ',  $e->getMessage(), "\n";
		}

		return $results;
	}

	/**
	 * Get tweet data from Twitter Search API via twitteroauth library
	 *
	 * @param  string $city city name
	 * @param  float  $lat  latitude
	 * @param  float  $lng  longitude
	 *
	 * @return array
	 */
	private function getTweetData($city, $lat, $lng)
	{
		$consumerKey = Config::get('constants.twitterConsumerKey');
		$consumerSecret = Config::get('constants.twitterConsumerSecret');
		$accessToken = Config::get('constants.twitterAccessToken');
		$accessTokenSecret = Config::get('constants.twitterAccessTokenSecret');

		$twitter = new TwitterHelper($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret);
		if ( ! $twitter->verify()) {
			die('Twitter - Bad Authentication data');
		}

		$twitterArgs = [
			'q'           => $city,
			'count'       => 24,
			'geocode'     => $lat.','.$lng.','.$this->radius,
			'result_type' => 'mixed',
		];

		$tweets = $twitter->searchTweets($twitterArgs);

		// if error return empty array
		if (empty($tweets)) {
			return [];
		}

		return $tweets;
	}

}
