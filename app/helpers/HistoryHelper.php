<?php

/**
 * Update search history (using cookie)
 * @param  string $history list of city names that's punctuated by comma
 * @param  string $city    city name
 * @return string
 */
function updateSearchHistory($history, $city)
{
	$maximumHistory = Config::get('constants.maximumSearchHistory');
	$punc = ',';
	$data = '';

	if (isNullOrEmptyString($history))
	{
		// Create new one
		$data = $city;
	}
	else
	{
		$data = explode($punc, $history);

		// if $city is exists already then reorder it
		// 1. remove if $city is exists
		// 2. add

		// 1. remove if $city is exists
		$data = removeStringFromArray($city, $data);

		// 2. add
		$data[] = $city;

		// if array 
		if (count($data) > $maximumHistory) array_shift($data);

		$data = implode($punc, $data);
	}

	return $data;
}
