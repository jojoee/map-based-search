# Map Based Search

Simple responsive website that allows the user to search for a city  and displays tweets that mention the city on a map. (**support english only**)

## Usage / Featured

- User searches for a city
- Search tweets that contain `city` name, within 50km of location and contain coordinate date
- Use profile picture as the `Marker`
- When click the `Marker` then display `info window` which contain tweet's text and tweet's time
- Search history (history of searches made) order by most recent first
- Map by Google Map
- Single Application Page (SPA)
- Responsive
- Compatibility with - IE10+, Chrome, Firefox, Safari Window, Safari iPhone5 8.1.1

## Code / Development

- MVC by Laravel
- PHP Code styling: [Laravel](http://laravel.com/docs/4.2/contributions) (PSR-0 and PSR-1)
- Javascript Code styling: [Airbnb JavaScript Style Guide() {](https://github.com/airbnb/javascript)
- PHP DocBlockr: [phpDocumentor](http://phpdoc.org/)
- Javascript DocBlockr: [JSDoc](http://usejsdoc.org/)
- Default timezone: Asia/Bangkok
- Default zoom level: 12
- Default center of map: Bangkok (13.7563, 100.5018)
- History: using cookies to identify the user and 20 maximum search history
- Always use uppercase when compare text
- Default radius of the tweet search: 50km (can config by PHP code on the MapController.php)
- Tweet cache: 1 hour (for each location) (can config by PHP code on the MapController.php)
- Store tweet cache into MySQL
- The repository isn't include `vendor` folder, please run `composer install`
- Database index: `city` and `updated_at` field
- Default google map style: [light dream](https://snazzymaps.com/style/134/light-dream)

## Acknowledged issue

- Can't validate city name before send a request (cause don't have all city names in database)
- Can't control lat and lng that's provided by google map api
- Can't use `Google Places API` for city autocomplete

Due to `Google Places API` will provide the city name and other infomations (such as, search `Bangkok` then it'll return `Bangkok Thailand`, search `London` then it'll return `London, United Kingdom`) which's hard to search the tweet that contain the returned data

## Future update

- PHP unit test
- Javascript unit test
- Create Laravel database migration & seed
- Add redundant resources
- Google map style setting
- Add security protection
- Update debug mode
- Update get() logic in MapController (use save() method instead)
- High-level Documentatin
- Use `post` instand of `get` on ajax of updateSearchHistory() (app.js)
- How to handle `PHP Maximum request timeout` when ajax request tweets

## Components

- [Laravel 4.2](http://laravel.com/)
- [jQuery 2.1.4](https://jquery.com/)
- [Font Awesome 4.3.0](http://fortawesome.github.io/Font-Awesome/)
- [TwitterOAuth 0.5.3](https://twitteroauth.com/)

## Google map style

Currently, the google map style setting is not available

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
