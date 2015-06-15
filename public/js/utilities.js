/**
 * Check the number is integer
 * 
 * @see http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
 * 
 * @param  {Number}  num
 * @return {boolean}
 */
function isInteger(num) {
	return num === parseInt(num, 10);
}

/**
 * Check the number is float
 * 
 * @param  {Number}  num
 * @return {Boolean}
 */
function isFloat(num) {
	return num === parseFloat(num, 10);
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
