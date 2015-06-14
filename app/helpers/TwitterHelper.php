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
				// $tmp['id'] = $status->id;
				// $tmp['created_at'] = $status->created_at;
				// $tmp['when'] = $this->convertTwitterTime($status->created_at);
				// $tmp['text'] = $status->text;
				// $tmp['user_id'] = $status->user->id;
				// $tmp['profile_image_url'] = $status->user->profile_image_url;
				// $tmp['lat'] = $status->geo->coordinates[0];
				// $tmp['lng'] = $status->geo->coordinates[1];

				$tmp['id'] = $status->id;
				$tmp['title'] = $tweets->search_metadata->query;
				$tmp['content'] = $status->text.' When: '.$this->twitterTimeToReadableTime($status->created_at);
				$tmp['lat'] = $status->geo->coordinates[0];
				$tmp['lng'] = $status->geo->coordinates[1];
				$tmp['iconImage'] = $status->user->profile_image_url;

				$results[] = $tmp;
			}			
		}
		
		return $results;
	}

	/**
 	* [twitterTimeToReadableTime description]
	 * @see http://stackoverflow.com/questions/6823537/best-way-to-change-twitter-api-datetimes-to-a-timestamp
	 * 
	 * @param  [type] $statuses [description]
	 * @return [type]           [description]
	 */
	private function twitterTimeToReadableTime($str)
	{
		$datetime = DateTime::createFromFormat('D M j H:i:s O Y', $str);
		$datetime->setTimezone(new DateTimeZone('Asia/Bangkok'));
		return $datetime->format('Y-m-d H:i:s');
	}
	
	/**
	 * [twiiterTimeToTimestamp description]
	 * @see http://stackoverflow.com/questions/6823537/best-way-to-change-twitter-api-datetimes-to-a-timestamp
	 * @param  [type] $str [description]
	 * @return [type]      [description]
	 */
	private function twiiterTimeToTimestamp($str)
	{
		$datetime = new DateTime($str);
		$datetime->setTimezone(new DateTimeZone('Asia/Bangkok'));
		$result = $datetime->format('U');

		return $result;
	}
}
