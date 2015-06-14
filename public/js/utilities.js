/**
 * [isInteger description]
 * @see http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
 * @param  {[type]}  num [description]
 * @return {Boolean}     [description]
 */
function isInteger(num) {
	return num === parseInt(num, 10);
}

function isFloat(num) {
	return num === parseFloat(num, 10);
}

/**
 * [updateZoomLevel description]
 * @see http://stackoverflow.com/questions/1133770/how-do-i-convert-a-string-into-an-integer-in-javascript
 * @return {[type]} [description]
 */
function stringToInt(str) {
	return parseInt(str);
}

function stringToFloat(str) {
	return parseFloat(str);
}
