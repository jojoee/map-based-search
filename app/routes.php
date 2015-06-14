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
Route::get('map/get', function()
{
	return Redirect::to('/');
});
Route::get('map/get/{city}', 'MapController@get');

// Route::resource('map', 'MapController');
// Route::resource('map', 'MapController', array('only' => array('show')));
