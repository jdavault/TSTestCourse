"use strict";
exports.__esModule = true;
var Utils_1 = require("../app/Utils");
describe('Utils test suite', function () {
    describe.only('StringUtils tests', function () {
        var sut;
        beforeEach(function () {
            sut = new Utils_1.StringUtils();
        });
        it('Should return correct upperCase', function () {
            var actual = sut.toUpperCase('abc');
            expect(actual).toBe('ABC');
        });
        it('Should throw error on invalid argument - function', function () {
            function expectError() {
                var actual = sut.toUpperCase('');
            }
            expect(expectError).toThrow();
            expect(expectError).toThrowError('Invalid argument!');
        });
        it('Should throw error on invalid argument - arrow function', function () {
            expect(function () {
                sut.toUpperCase('');
            }).toThrowError('Invalid argument!');
        });
        it('Should throw error on invalid argument - try catch block', function (done) {
            try {
                sut.toUpperCase('');
                done('GetStringInfo should throw error for invalid arg!');
            }
            catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error).toHaveProperty('message', 'Invalid argument!');
                done();
            }
        });
    });
    it('should return uppercase of valid string', function () {
        var sut = Utils_1.toUpperCase;
        var expected = 'ABC';
        var actual = sut('abc');
        expect(actual).toBe(expected);
    });
    describe('ToUpperCase examples', function () {
        it.each([
            { input: 'abc', expected: 'ABC' },
            { input: 'My-String', expected: 'MY-STRING' },
            { input: 'def', expected: 'DEF' }
        ])('$input toUpperCase should be $expected', function (_a) {
            var input = _a.input, expected = _a.expected;
            var actual = (0, Utils_1.toUpperCase)(input);
            expect(actual).toBe(expected);
        });
    });
    describe('getStringInfo for arg My-String should', function () {
        test('return right length', function () {
            var actual = (0, Utils_1.getStringInfo)('My-String');
            expect(actual.characters).toHaveLength(9);
        });
        test('return right lower case', function () {
            var actual = (0, Utils_1.getStringInfo)('My-String');
            expect(actual.lowerCase).toBe('my-string');
        });
        test('return right upper case', function () {
            var actual = (0, Utils_1.getStringInfo)('My-String');
            expect(actual.upperCase).toBe('MY-STRING');
        });
        test('return right characters', function () {
            var actual = (0, Utils_1.getStringInfo)('My-String');
            expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);
            expect(actual.characters).toContain('M');
            expect(actual.characters).toEqual(expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-']));
        });
        test('return defined extra info', function () {
            var actual = (0, Utils_1.getStringInfo)('My-String');
            expect(actual.extraInfo).toBeDefined();
        });
        test('return right extra info', function () {
            var actual = (0, Utils_1.getStringInfo)('My-String');
            expect(actual.extraInfo).toEqual({});
        });
    });
});
