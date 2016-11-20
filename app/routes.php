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
Route::get('get/{city}', 'MapController@getTweets');

Route::get('search', function () {
	return Redirect::to('/');
});
Route::get('search/get', function () {
	if ( ! Request::ajax()) {
		return Redirect::to('/');
	}

	$cookieName = Config::get('constants.historyCookieName');
	$history = Cookie::get($cookieName);

	return Response::make($history);
});
Route::get('search/update', function () {
	return Redirect::to('/');
});
Route::get('search/update/{city}', function ($city) {
	if ( ! Request::ajax()) {
		return Redirect::to('/');
	}

	$cookieName = Config::get('constants.historyCookieName');
	$history = updateSearchHistory(Cookie::get($cookieName), $city);
	$cookie = Cookie::forever($cookieName, $history);

	return Response::make('OK')->withCookie($cookie);
});

Route::get('jasmine', function () {
	return View::make('tests.jasmine');
});
App::missing(function ($exception) {
	return Redirect::to('/');
});
