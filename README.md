# Map Based Search

Simple responsive website that allows the user to search for a city  and displays tweets that mention the city on a map. (support english only)

## Getting Started
1. Setup web server
2. Install [Composer](https://getcomposer.org/)
3. Browse to project directory
4. Install dependencies: `composer install`
5. Setup config
```
5.1 Server environment variable
SetEnv MBS_SITE_ENV "prod"
SetEnv MBS_SERVER_NAME "mbs.jojoee.com"

5.2 Database
app/config/database.php
app/config/local/database.php

5.3 Constant
app/config/constants.php
```

## Screenshot

[![Screenshot 1](https://raw.githubusercontent.com/jojoee/map-based-search/master/screenshot/screenshot1.jpg "Screenshot 1")](http://mbs.jojoee.com/)

## Feature
- [x] Responsive
- [x] User searches for a city and display user (that tweet the city) profile picture as the `Marker`, show between 10-20 tweets
- [x] Search tweets (tweet's radius: 50km) that contain `city` name, within 50km of location and contain coordinate data
- [x] When click the `Marker` then display `info window` which contain tweet's text and tweet's time
- [x] Search history (history of searches made) order by most recent first
- [x] Cache tweet (Backend): MySQL (1 hour for each location)
- [ ] Cache tweet (Frontend): localStorage
- [x] History search: Use cookies to identify the user (20 maximum search history item)
- [x] Map by [Google Maps](https://www.google.co.th/maps) with [Snazzy Maps](https://snazzymaps.com/)
- [ ] Task runner: [gulp.js](http://gulpjs.com/), also create build Frontend script
- [ ] Implement ORM (e.g. [Doctrine](http://www.doctrine-project.org/))
- [ ] Upgrade to Laravel 5.3
- [ ] Add deployment script (e.g. [Deployer](https://deployer.org/))
- [ ] City auto completion (or city validation)
- [ ] Popup error message when not found any tweet from search
- [x] Database migration & seed
- [ ] Add redundant resources
- [ ] Test (Backend): User acceptance
- [ ] Test (Backend): Unit
- [ ] Test (Backend): Functional
- [ ] Test (Frontend): Unit
- [ ] Test (Frontend): E2E
- [ ] Refactor (Backend): Route
- [ ] Refactor (Backend): Model
- [ ] Refactor (Backend): Separate business logic out off controller (create Service for business logic)
- [ ] Refactor (Javascript): Convert to module pattern
- [ ] Using `faker` for dummy stuff

## Compatibility
- Google Chrome 51+
- Internet Explorer 10+
- Mozilla Firefox 43+
- Opera 41+
- Safari (desktop) 5+

## Note
- Laravel 4.2
- Javascript DocBlockr: [JSDoc](http://usejsdoc.org/)
- PHP Code styling: [PhpStorm Laravel Code Style](https://github.com/michaeldyrynda/phpstorm-laravel-code-style) instead of [Laravel 4.2](http://laravel.com/docs/4.2/contributions)
- PHP DocBlockr: [phpDocumentor](http://phpdoc.org/)
- Javascript Code styling: [Airbnb](https://github.com/airbnb/javascript)
