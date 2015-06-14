<?php

class Tweet extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'tweet';
	protected $fillable = array('city', 'data', 'lat', 'lng');
	public $timestamps = true;
}
