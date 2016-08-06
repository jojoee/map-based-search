<?php

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
*/

$app = new Illuminate\Foundation\Application;

/*
|--------------------------------------------------------------------------
| Detect The Application Environment
|--------------------------------------------------------------------------
|
| Laravel takes a dead simple approach to your application environments
| so you can just specify a machine name for the host that matches a
| given environment, then we will automatically detect it for you.
|
*/

define('MBS_SITE_ENV', getenv('MBS_SITE_ENV'));
define('MBS_SERVER_NAME', getenv('MBS_SERVER_NAME'));

define('MBS_DB_LOCAL_HOST', getenv('MBS_DB_LOCAL_HOST'));
define('MBS_DB_LOCAL_NAME', getenv('MBS_DB_LOCAL_NAME'));
define('MBS_DB_LOCAL_USER', getenv('MBS_DB_LOCAL_USER'));
define('MBS_DB_LOCAL_PASS', getenv('MBS_DB_LOCAL_PASS'));

define('MBS_DB_PROD_HOST', getenv('MBS_DB_PROD_HOST'));
define('MBS_DB_PROD_NAME', getenv('MBS_DB_PROD_NAME'));
define('MBS_DB_PROD_USER', getenv('MBS_DB_PROD_USER'));
define('MBS_DB_PROD_PASS', getenv('MBS_DB_PROD_PASS'));

define('GOOGLE_ANALYTICS_KEY', getenv('GOOGLE_ANALYTICS_KEY'));
define('GOOGLE_MAP_KEY',       getenv('GOOGLE_MAP_KEY'));

define('TWITTER_CONSUMER_KEY',        getenv('TWITTER_CONSUMER_KEY'));
define('TWITTER_CONSUMER_SECRET',     getenv('TWITTER_CONSUMER_SECRET'));
define('TWITTER_ACCESS_TOKEN',        getenv('TWITTER_ACCESS_TOKEN'));
define('TWITTER_ACCESS_TOKEN_SECRET', getenv('TWITTER_ACCESS_TOKEN_SECRET'));

// die(gethostname());
if (MBS_SITE_ENV === 'local')
{
	$env = $app->detectEnvironment(array(
		'local' => array(gethostname()),
	));
}
else
{
	$env = $app->detectEnvironment(array(
		'production' => array(MBS_SERVER_NAME),
	));
}

/*
|--------------------------------------------------------------------------
| Bind Paths
|--------------------------------------------------------------------------
|
| Here we are binding the paths configured in paths.php to the app. You
| should not be changing these here. If you need to change these you
| may do so within the paths.php file and they will be bound here.
|
*/

$app->bindInstallPaths(require __DIR__.'/paths.php');

/*
|--------------------------------------------------------------------------
| Load The Application
|--------------------------------------------------------------------------
|
| Here we will load this Illuminate application. We will keep this in a
| separate location so we can isolate the creation of an application
| from the actual running of the application with a given request.
|
*/

$framework = $app['path.base'].
                 '/vendor/laravel/framework/src';

require $framework.'/Illuminate/Foundation/start.php';

/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/

return $app;
