<?php

class MapController extends BaseController {

	public function __construct()
	{

	}

	public function showMap()
	{
		return View::make('hello');
	}
}
