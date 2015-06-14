<?php

class MapController extends \BaseController {

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

	public function get($city)
	{
		if (Request::ajax())
		{
			$data = array();
			$consumerKey = Config::get('constants.twitterConsumerKey');
			$consumerSecret = Config::get('constants.twitterConsumerSecret');
			$accessToken = Config::get('constants.twitterAccessToken');
			$accessTokenSecret = Config::get('constants.twitterAccessTokenSecret');

			$twitter = new TwitterHelper($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret);
			if (! $twitter->verify()) die('Twitter - Bad Authentication data');

			$twiiterArgs = array(
				'q'           => $city,
				'count'       => 24, // default 15, max 100
				'geocode'     => '13.7563,100.5018,50km',
				'result_type' => 'mixed',
			);
			$tweets = $twitter->searchTweets($twiiterArgs);

			echo json_encode($tweets);
		}
		else
		{
			return Redirect::to('/');
		}
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
