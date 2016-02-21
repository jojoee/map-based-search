# Map Based Search

Simple responsive website that allows the user to search for a city  and displays tweets that mention the city on a map. (**support english only**)

## Usage / Featured

- User searches for a city
- Search tweets that contain `city` name, within 50km of location and contain coordinate data
- Use profile picture as the `Marker`
- When click the `Marker` then display `info window` which contain tweet's text and tweet's time
- Search history (history of searches made) order by most recent first
- Map by Google Map
- Single Application Page (SPA)
- Responsive
- Compatibility with - IE10+, Chrome, Firefox, Safari Window, Safari iPhone 5 8.1.1

## Code / Development

- MVC by Laravel
- PHP Code styling: [Laravel](http://laravel.com/docs/4.2/contributions) (PSR-0 and PSR-1)
- Javascript Code styling: [Airbnb JavaScript Style Guide() {](https://github.com/airbnb/javascript)
- PHP DocBlockr: [phpDocumentor](http://phpdoc.org/)
- Javascript DocBlockr: [JSDoc](http://usejsdoc.org/)
- Default timezone: Asia/Bangkok
- Default google map zoom level: 12
- Default center of google map: Bangkok (13.7563, 100.5018)
- History: using cookies to identify the user (20 maximum search history item)
- Always use uppercase when compare text
- Default radius of tweet search: 50km (can config by PHP code on the MapController.php)
- Tweet cache: 1 hour (for each location) (can config by PHP code on the MapController.php)
- Store tweet cache into MySQL
- The repository isn't include `vendor` folder, please run `composer install`
- Database index: `city` and `updated_at` field
- Default google map style: [light dream](https://snazzymaps.com/style/134/light-dream)
- Javascript unit test with [Jasmine](http://jasmine.github.io/) - [see test results](http://mbs.jojoee.com/jasmine) (in progress)

## Future update

- City autocomplete
- Error message when not found any tweet
- PHP unit test
- Create Laravel database migration & seed
- Add redundant resources
- Google map style setting
- Add security protection
- Update debug mode
- Update get() logic in MapController (use save() method instead)
- High-level Documentatin
- Use `post` instead of `get` on ajax of updateSearchHistory() (app.js)
- How to handle `PHP Maximum request timeout` when ajax request tweets

## Components

- [Laravel 4.2](http://laravel.com/) - [MIT](https://github.com/laravel/laravel)
- [jQuery 2.1.4](https://jquery.com/) - [MIT](https://jquery.org/license/)
- [Meyer's reset CSS 2.0](http://meyerweb.com/eric/tools/css/reset/) - [Public Domain](https://creativecommons.org/licenses/publicdomain/)
- [Font Awesome 4.3.0](http://fortawesome.github.io/Font-Awesome/) - [MIT](http://fortawesome.github.io/Font-Awesome/license/)
- [TwitterOAuth 0.5.3](https://twitteroauth.com/) - [License](https://github.com/abraham/twitteroauth/blob/master/LICENSE.md)
- [Jasmine 2.2.1](http://jasmine.github.io/) - [MIT](https://github.com/jasmine/jasmine)

## Google map style

Currently, the google map style setting is not available. [CC BY-SA 3.0](https://snazzymaps.com/about)

- [Subtle Grayscale](https://snazzymaps.com/style/15/subtle-grayscale)
- [Shades of Grey](https://snazzymaps.com/style/38/shades-of-grey)
- [Blue water](https://snazzymaps.com/style/25/blue-water)
- [Pale Dawn](https://snazzymaps.com/style/1/pale-dawn)
- [Blue Essence](https://snazzymaps.com/style/61/blue-essence)
- [Apple Maps-esque](https://snazzymaps.com/style/42/apple-maps-esque)
- [Midnight Commander](https://snazzymaps.com/style/2/midnight-commander)
- [Light Monochrome](https://snazzymaps.com/style/29/light-monochrome)
- [Retro](https://snazzymaps.com/style/18/retro)
- [Paper](https://snazzymaps.com/style/39/paper)
- [Flat Map](https://snazzymaps.com/style/53/flat-map)
- [Greyscale](https://snazzymaps.com/style/5/greyscale)
- [light dream](https://snazzymaps.com/style/134/light-dream)
