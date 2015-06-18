/**
 * Custom Matcher
 *	
 * @see http://stackoverflow.com/questions/20941343/jasmine-expectresultcode-tobe200-or-409/20941702#20941702
 * @see http://stackoverflow.com/questions/21236794/jasmine-any-boolean-jasmine-anyboolean
 */

beforeEach(function() {

	//initialize object

	jasmine.addMatchers({
		toBeBetween: function (lower, higher) {
			return {
				compare: function (actual, lower, higher) {
					return {
						pass: (actual >= lower && actual <= higher),
						message: actual + ' is not between ' + lower + ' and ' + higher
					}
				}
			};
		},
		toBeBoolean : function () {
			return {
				compare : function (actual, expected) {
					return {
						pass : (typeof actual === 'boolean'),
						message : 'Expected ' + actual + ' is not boolean'
					};
				}
			};
		}
	});
});

describe( 'Map Based Search - utilities.js', function() {

	it('isInteger()', function() {
		expect(isInteger(2)).toBeTruthy();
		expect(isInteger(100)).toBeTruthy();
		expect(isInteger('14')).toBeTruthy();
		expect(isInteger('1400')).toBeTruthy();

		expect(isInteger('')).toBeFalsy();
		expect(isInteger('Map')).toBeFalsy();
		expect(isInteger('search')).toBeFalsy();
	});

	it('isFloat()', function() {
		expect(isFloat(2.23)).toBeTruthy();
		expect(isFloat(10.235894)).toBeTruthy();
		expect(isFloat('14.158484')).toBeTruthy();
		expect(isFloat('140.8484848484848')).toBeTruthy();

		expect(isFloat('')).toBeFalsy();
		expect(isFloat('Map')).toBeFalsy();
		expect(isFloat('search')).toBeFalsy();
	});

	it('stringToInt()', function() {
		expect(stringToInt(2)).toEqual(2);
		expect(stringToInt(2.23)).toEqual(2);
		expect(stringToInt('2')).toEqual(2);
		expect(stringToInt('2.33')).toEqual(2);
	});

	it('stringToFloat()', function() {
		expect(stringToFloat(2)).toEqual(2);
		expect(stringToFloat(2.23)).toEqual(2.23);
		expect(stringToFloat('2')).toEqual(2);
		expect(stringToFloat('2.33')).toEqual(2.33);
	});

	// it('splitStringByComma()', function() {
	// 	var data;
	// 	var expect;
	// 	data = 'a,b';
	// 	expect = ['a', 'b'];
	// });


	// it('replaceSpaceWithPlus()', function() {

	// });

	// it('replaceSlashWithPlus()', function() {

	// });

	// it('replacePlusWithSpace()', function() {

	// });

	// it('splitStringByComma()', function() {

	// });

});
