<?php

use Abraham\TwitterOAuth\TwitterOAuth;

class TwitterHelper {

	private $consumerKey;
	private $consumerSecret;
	private $accessToken;
	private $accessTokenSecret;
	private $twitter;

	public function __construct($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret)
	{
		$this->consumerKey = $consumerKey;
		$this->consumerSecret = $consumerSecret;
		$this->accessToken = $accessToken;
		$this->accessTokenSecret = $accessTokenSecret;

		$this->twitter = new TwitterOAuth(
			$this->consumerKey,
			$this->consumerSecret,
			$this->accessToken,
			$this->accessTokenSecret
		);
	}

	public function verify()
	{
		$results = $this->twitter->get("account/verify_credentials");
		
		if (isset($results->errors)) return false;
		return true;
	}

	/**
	 * [rawSearchTweets description]
	 * development purpose
	 * 
	 * @param  [type] $args [description]
	 * @return [type]       [description]
	 */
	public function rawSearchTweets($args)
	{
		return $this->twitter->get("search/tweets", $args);
	}

	public function searchTweets($args)
	{
		$tweets = $this->rawSearchTweets($args);

		$results = array();
		if (! empty($tweets->statuses))
		{
			$tmp = array();
			foreach ($tweets->statuses as $status)
			{
				$tmp['id'] = $status->id;
				$tmp['created_at'] = $status->created_at;
				$tmp['when'] = $this->convertTwitterTime($status->created_at);
				$tmp['text'] = $status->text;
				$tmp['user_id'] = $status->user->id;
				$tmp['profile_image_url'] = $status->user->profile_image_url;
				$tmp['lat'] = $status->geo->coordinates[0];
				$tmp['lng'] = $status->geo->coordinates[1];

				$results[] = $tmp;
			}			
		}
		return $results;
	}

	/**
 	* [convertTwitterTime description]
	 * @see http://stackoverflow.com/questions/6823537/best-way-to-change-twitter-api-datetimes-to-a-timestamp
	 * @see http://stackoverflow.com/questions/16089296/php-convert-datetime-from-twitter-feed
	 * 
	 * @param  [type] $statuses [description]
	 * @return [type]           [description]
	 */
	private function convertTwitterTime($str)
	{
		$datetime = new DateTime($str);
		$datetime->setTimezone(new DateTimeZone('Asia/Bangkok'));
		$result = $datetime->format('U');

		return $result;
	}
}
