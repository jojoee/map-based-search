<?php

function da($var, $die = false)
{
	echo '<pre>';
	print_r($var);
	echo '</pre>';

	if ($die) die();
}
