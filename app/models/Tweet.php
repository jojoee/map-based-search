<?php

class Tweet extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'tweets';

	protected $fillable = ['city', 'data', 'lat', 'lng'];
	public $timestamps = true;
}
