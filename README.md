# Map Based Search

Simple responsive website that allows the user to search for a city  and displays tweets that mention the city on a map. (**support english only**)

## Featured / Code

- User searches for a city
- Responsive
- Search tweets that contain `city` name, within 50km of location and contain coordinate date
- Use profile picture as the `Marker`
- When click the `Marker` then display `info window` which contain tweet's text and tweet's time
- History button (history of searches made) using cookies to identify the user
- Map by Google Map
- Single Application Page (SPA)

## Code / Development

- PHP Code styling: [Laravel](http://laravel.com/docs/4.2/contributions) (PSR-0 and PSR-1)
- Javascript Code styling: [Airbnb JavaScript Style Guide() {](https://github.com/airbnb/javascript)
- PHP DocBlockr: [phpDocumentor](http://phpdoc.org/)
- Javascript DocBlockr: [JSDoc](http://usejsdoc.org/)
- Timezone: Asia/Bangkok
- Default zoom level: 12
- Default center of map: Bangkok (13.7563, 100.5018)
- History: using cookies to identify the user (order by: most recent) (default maximum: 20)
- Tweet cache: 1 hour (for each location)
- Always use uppercase when compare text
- The Repository isn't include `vendor` folder, please run `composer install`
- Radius of the twitter search (50km) and time to live of the cache (1 hour) can config by PHP code on the MapController.php
- Database index: `city` and `updated_at` field

## Acknowledged issue

- Can't validate city name before send a request (cause don't have all city names in database)
- Can't control lat and lng that's provided by google map api
- Can't use `Google Places API` for city autocomplete

due to `Google Places API` will provide the city name and other infomations (such as, search `Bangkok` then it'll return `Bangkok Thailand`, search `London` then it'll return `London, United Kingdom`) which's hard to search the tweet that contain the returned data

## Future update

- Add schema SQL
- PHP unit test
- Javascript unit test
- Create Laravel database migration & seed
- Add redundant resources
- Google map style setting
- Add security protection
- Update debug mode
- Update get() logic in MapController (use save() method instead)
- Compatibility with - IE10+, Chrome 39+, Firefox 31+, Safari Window 5.1.7+, Safari iPhone5 8.1.1
- High-level Documentatin
- Use `post` instand of `get` on ajax of updateSearchHistory() (app.js)
- How to handle `php maximum request timeout` when ajax request tweets

## Components

- [Laravel 4.2](http://laravel.com/)
- [jQuery 2.1.4](https://jquery.com/)
- [Font Awesome 4.3.0](http://fortawesome.github.io/Font-Awesome/)
- [TwitterOAuth 0.5.3](https://twitteroauth.com/)

## Google map style (not available)

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
