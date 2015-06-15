<?php

use Abraham\TwitterOAuth\TwitterOAuth;

/**
 * Helper class of TwitterOAuth library
 */
class TwitterHelper {

	private $consumerKey;
	private $consumerSecret;
	private $accessToken;
	private $accessTokenSecret;
	private $twitter;

	/**
	 * Construct method
	 * 
	 * @param string $consumerKey
	 * @param string $consumerSecret
	 * @param string $accessToken
	 * @param string $accessTokenSecret
	 */
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

	/**
	 * Verify a TwitterOAuth
	 * 
	 * @return boolean
	 */
	public function verify()
	{
		$results = $this->twitter->get("account/verify_credentials");
		
		if (isset($results->errors)) return false;
		return true;
	}

	/**
	 * Search tweets (raw data)
	 * 
	 * @param  array $args TwitterOAuth arguments
	 * @return TwitterOAuth
	 */
	public function rawSearchTweets($args)
	{
		return $this->twitter->get("search/tweets", $args);
	}

	/**
	 * Search tweets and set data into usable format
	 * 
	 * @param  array $args TwitterOAuth arguments
	 * @return TwitterOAuth
	 */
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
 	 * Convert Twitter time into Readable time format
 	 * 
	 * @see http://stackoverflow.com/questions/6823537/best-way-to-change-twitter-api-datetimes-to-a-timestamp
	 * 
	 * @param  datetime $str Twitter time
	 * @return datetime
	 */
	private function twitterTimeToReadableTime($str)
	{
		$datetime = DateTime::createFromFormat('D M j H:i:s O Y', $str);
		$datetime->setTimezone(new DateTimeZone('Asia/Bangkok'));
		return $datetime->format('Y-m-d H:i:s');
	}
	
	/**
	 * Convert Twiiter time to timestamp
	 * 
	 * @see http://stackoverflow.com/questions/6823537/best-way-to-change-twitter-api-datetimes-to-a-timestamp
	 * 
	 * @param  datetime $str Twitter time
	 * @return timestamp
	 */
	private function twiiterTimeToTimestamp($str)
	{
		$datetime = new DateTime($str);
		$datetime->setTimezone(new DateTimeZone('Asia/Bangkok'));
		$result = $datetime->format('U');

		return $result;
	}
}
