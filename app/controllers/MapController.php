<?php

class MapController extends \BaseController {

	private $currentTimestamp;
	private $hourAgo;
	private $radius;

	public function __construct()
	{
		$this->currentTimestamp = date('Y-m-d H:i:s');
		$this->hourAgo = date('Y-m-d H:i:s', strtotime('-1 hour'));
		$this->radius = '50km';
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$data = array();
		return View::make('map.show', $data);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	private function getLatLng($city)
	{
		$targetUrl = 'http://maps.googleapis.com/maps/api/geocode/json?address='.$city.'&sensor=false';

		try {
			$jsonData = json_decode(file_get_contents($targetUrl));

			$results = array();
			if ($jsonData->status == 'OK')
			{
				$results = array(
					'lat' => $jsonData->results[0]->geometry->location->lat,
					'lng' => $jsonData->results[0]->geometry->location->lng
				);
			}
		} catch (Exception $e) {
			// if error then ?
			// echo 'Caught exception: ',  $e->getMessage(), "\n";
		}

		return $results;
	}

	private function getTweetData($city, $lat, $lng)
	{
		$consumerKey = Config::get('constants.twitterConsumerKey');
		$consumerSecret = Config::get('constants.twitterConsumerSecret');
		$accessToken = Config::get('constants.twitterAccessToken');
		$accessTokenSecret = Config::get('constants.twitterAccessTokenSecret');

		$twitter = new TwitterHelper($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret);
		if (! $twitter->verify()) die('Twitter - Bad Authentication data');

		$twiiterArgs = array(
			'q'           => $city,
			'count'       => 24, // default 15, max 100
			'geocode'     => $lat.','.$lng.','.$this->radius, //13.7563,100.5018,50km',
			'result_type' => 'mixed',
		);

		$tweets = $twitter->searchTweets($twiiterArgs);
		// if error return empty array
		if (empty($tweets)) return array();

		return $tweets;
	}

	public function get($city)
	{
		// if (! Request::ajax()) return Redirect::to('/');
		
		$data = array();
		$city = strtoupper($city);
		$record = Tweet::where('city', $city)->where('updated_at', '>', $this->hourAgo)->first();

		if ($record)
		{
			$status = 'OK';
			$tweetsEncode = $record->data;
			$lat = $record->lat;
			$lng = $record->lng;
		}
		else
		{
			$geo = $this->getLatLng($city);
			// if error return empty array
			if (empty($geo)) die();
			$lat = $geo['lat'];
			$lng = $geo['lng'];

			$tweets = $this->getTweetData($city, $geo['lat'], $geo['lng']);
			// if error then status = 'NOOK'
			if (empty($tweets))
			{
				$status = 'NOOK';
				$tweetsEncode = json_encode(array());
			}
			else
			{
				$status = 'OK';
				$tweetsEncode = json_encode($tweets);

				$record = Tweet::where('city', $city)->first();
				if ($record)
				{
					Tweet::where('city', $city)->update(array('data' => $tweetsEncode));
				}
				else
				{
					$tweetData = array(
						'city'  => $city,
						'data'  => $tweetsEncode,
						'lat'   => $lat,
						'lng'   => $lng
					);
					Tweet::create($tweetData);
				}
			}
		}

		$data = array(
			'status'  => $status,
			'data'    => $tweetsEncode,
			'lat'     => $lat,
			'lng'     => $lng
		);

		echo json_encode($data);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($q)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
