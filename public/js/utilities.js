/**
 * Check the number is integer
 * 
 * @see http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
 * 
 * @param  {Number}  num
 * @return {Boolean}
 */
function isInteger(num) {
	return num == parseInt(num, 10);
}

/**
 * Check the number is float
 * 
 * @param  {Number}  num
 * @return {Boolean}
 */
function isFloat(num) {
	return num == parseFloat(num, 10);
}

/**
 * Parse string to int
 * 
 * @see http://stackoverflow.com/questions/1133770/how-do-i-convert-a-string-into-an-integer-in-javascript
 *
 * @param  {String}  str
 * @return {Integer}
 */
function stringToInt(str) {
	return parseInt(str);
}

/**
 * Parse string to float
 * 
 * @param  {String} str
 * @return {Float}
 */
function stringToFloat(str) {
	return parseFloat(str);
}

/**
 * Split string by comma
 * 
 * @param  {String} str
 * @return {Array}
 */
function splitStringByComma(str) {
	return str.split(',');
}

/**
 * Replace space with plus
 * 
 * @see http://stackoverflow.com/questions/3794919/replace-all-spaces-in-a-string-with
 * 
 * @param  {String} str
 * @return {String}
 */
function replaceSpaceWithPlus(str) {
	return str.split(' ').join('+');
}

/**
 * Replace slash with plus
 * 
 * @see http://stackoverflow.com/questions/4566771/how-to-globally-replace-a-forward-slash-in-a-javascript-string
 * @see http://stackoverflow.com/questions/10610402/javascript-replace-all-commas-in-a-string
 * 
 * @param  {String} str
 * @return {String}
 */
function replaceSlashWithPlus(str) {
	return str.replace(/\//g, '+');
}

/**
 * Replace plus with space
 * 
 * @param  {String} str
 * @return {String}
 */
function replacePlusWithSpace(str) {
	return str.replace(/\+/g, ' ');	
}

/**
 * Clean city input string
 * 
 * @param  {String} str
 * @return {String}
 */
function cleanCityName(str) {
	var results;
	results = replaceSlashWithPlus(str);
	results = replaceSpaceWithPlus(str);
	return results;
}
