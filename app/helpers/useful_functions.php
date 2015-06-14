<?php

/**
 * [da description]
 * @param  [type]  $var [description]
 * @param  boolean $die [description]
 * @return [type]       [description]
 */
function dda($var, $die = false)
{
	echo '<pre>';
	print_r($var);
	echo '</pre>';

	if ($die) die();
}

function ddd($var)
{
	dda($var, true);
}

/**
 * [IsNullOrEmptyString description]
 * @see http://stackoverflow.com/questions/381265/better-way-to-check-variable-for-null-or-empty-string
 * @param [type] $question [description]
 */
function isNullOrEmptyString($str){
	return (! isset($str) || trim($str)==='');
}

/**
 * Get client IP address
 * @see  http://stackoverflow.com/questions/15699101/get-the-client-ip-address-using-php
 * @see  http://stackoverflow.com/questions/3003145/how-to-get-the-client-ip-address-in-php
 * @return [type] [description]
 */
function getClientIp()
{
	$ipAddress = '';
	if (isset($_SERVER['HTTP_CLIENT_IP']) && isNullOrEmptyString($_SERVER['HTTP_CLIENT_IP']))
		$ipAddress = $_SERVER['HTTP_CLIENT_IP'];
	else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']) && isNullOrEmptyString($_SERVER['HTTP_X_FORWARDED_FOR']))
		$ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
	else if(isset($_SERVER['HTTP_X_FORWARDED']) && isNullOrEmptyString($_SERVER['HTTP_X_FORWARDED']))
		$ipAddress = $_SERVER['HTTP_X_FORWARDED'];
	else if(isset($_SERVER['HTTP_FORWARDED_FOR']) && isNullOrEmptyString($_SERVER['HTTP_FORWARDED_FOR']))
		$ipAddress = $_SERVER['HTTP_FORWARDED_FOR'];
	else if(isset($_SERVER['HTTP_FORWARDED']) && isNullOrEmptyString($_SERVER['HTTP_FORWARDED']))
		$ipAddress = $_SERVER['HTTP_FORWARDED'];
	else if(isset($_SERVER['REMOTE_ADDR']) && isNullOrEmptyString($_SERVER['REMOTE_ADDR']))
		$ipAddress = $_SERVER['REMOTE_ADDR'];
	return $ipAddress;
}
