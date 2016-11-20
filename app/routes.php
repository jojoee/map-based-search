<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', 'MapController@index');
Route::get('tweet', function () {
	return Redirect::to('/');
});
Route::get('tweet/history/', function () {
	if ( ! Request::ajax()) {
		return Redirect::to('/');
	}

	$cookieName = Config::get('constants.historyCookieName');
	$history = Cookie::get($cookieName);

	return Response::make($history);
});
Route::get('tweet/{city}', 'MapController@getTweets');

Route::post('tweet', function () {
	return Redirect::to('/');
});
Route::post('tweet/{city}', function ($city) {
	if ( ! Request::ajax()) {
		return Redirect::to('/');
	}

	$cookieName = Config::get('constants.historyCookieName');
	$history = updateSearchHistory(Cookie::get($cookieName), $city);
	$cookie = Cookie::forever($cookieName, $history);

	return Response::make('OK')->withCookie($cookie);
});

App::missing(function ($exception) {
	return Redirect::to('/');
});
