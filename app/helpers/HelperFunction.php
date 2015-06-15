<?php

/**
 * Dump varible
 * 
 * @param variable $var
 * @param boolean  $die
 */
function dda($var, $die = false)
{
	echo '<pre>';
	print_r($var);
	echo '</pre>';

	if ($die) die();
}

/**
 * Dump varible and die
 * 
 * @param variable $var
 */
function ddd($var)
{
	dda($var, true);
}

/**
 * Check the string is null or empty string
 * 
 * @see http://stackoverflow.com/questions/381265/better-way-to-check-variable-for-null-or-empty-string
 * 
 * @param string $str
 */
function isNullOrEmptyString($str)
{
	return (! isset($str) || trim($str)==='');
}

/**
 * Remove string from array (if it exists)
 * 
 * @param  string $str
 * @param  array  $arr
 * @return array
 */
function removeStringFromArray($str, $arr)
{
	foreach ($arr as $key => $value) {
		if (strtoupper($value) == strtoupper($str)) unset($arr[$key]);
	}

	return $arr;
}

/**
 * Unset the cookie
 *
 * @see http://stackoverflow.com/questions/686155/remove-a-cookie
 * 
 * @param  string  $cookieName
 * @return boolean
 */
function unsetCookie($cookieName)
{
	if (isset($_COOKIE[$cookieName]))
	{
		unset($_COOKIE[$cookieName]);
		setcookie($cookieName, '', time() - 3600);

		return true;
	} else {
		return false;
	}
}

/**
 * Get client IP address
 * 
 * @see http://stackoverflow.com/questions/15699101/get-the-client-ip-address-using-php
 * @see http://stackoverflow.com/questions/3003145/how-to-get-the-client-ip-address-in-php
 * 
 * @return string
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
