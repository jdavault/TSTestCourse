"use strict";
exports.__esModule = true;
var OtherUtils_1 = require("../../app/doubles/OtherUtils");
describe('OtherUtils test suite', function () {
    describe.only('OtherStringUtils tests with spies', function () {
        var sut;
        beforeEach(function () {
            sut = new OtherUtils_1.OtherStringUtils();
        });
        test('Use a spy to track calls', function () {
            var toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
            sut.toUpperCase('asa');
            expect(toUpperCaseSpy).toBeCalledWith('asa');
        });
        test('Use a spy to track calls to other module', function () {
            var consoleLogSpy = jest.spyOn(console, 'log');
            sut.logString('abc');
            expect(consoleLogSpy).toBeCalledWith('abc');
        });
        test('Use a spy to replace the implementation of a method', function () {
            jest.spyOn(sut, 'callExternalService').mockImplementation(function () {
                console.log('calling mocked implementation!!!');
            });
            sut.callExternalService();
        });
    });
    describe('Tracking callbacks with Jest mocks', function () {
        var callBackMock = jest.fn();
        afterEach(function () {
            jest.clearAllMocks();
        });
        it('calls callback for invalid argument - track calls', function () {
            var actual = (0, OtherUtils_1.toUpperCaseWithCb)('', callBackMock);
            expect(actual).toBeUndefined();
            expect(callBackMock).toBeCalledWith('Invalid argument!');
            expect(callBackMock).toBeCalledTimes(1);
        });
        it('calls callback for valid argument - track calls', function () {
            var actual = (0, OtherUtils_1.toUpperCaseWithCb)('abc', callBackMock);
            expect(actual).toBe('ABC');
            expect(callBackMock).toBeCalledWith('called function with abc');
            expect(callBackMock).toBeCalledTimes(1);
        });
    });
    describe('Tracking callbacks', function () {
        var cbArgs = [];
        var timesCalled = 0;
        function callBackMock(arg) {
            cbArgs.push(arg);
            timesCalled++;
        }
        afterEach(function () {
            // clearing tracking fields:
            cbArgs = [];
            timesCalled = 0;
        });
        it('calls callback for invalid argument - track calls', function () {
            var actual = (0, OtherUtils_1.toUpperCaseWithCb)('', callBackMock);
            expect(actual).toBeUndefined();
            expect(cbArgs).toContain('Invalid argument!');
            expect(timesCalled).toBe(1);
        });
        it('calls callback for valid argument - track calls', function () {
            var actual = (0, OtherUtils_1.toUpperCaseWithCb)('abc', callBackMock);
            expect(actual).toBe('ABC');
            expect(cbArgs).toContain('called function with abc');
            expect(timesCalled).toBe(1);
        });
    });
    it('ToUpperCase - calls callback for invalid argument', function () {
        var actual = (0, OtherUtils_1.toUpperCaseWithCb)('', function () { });
        expect(actual).toBeUndefined();
    });
    it('ToUpperCase - calls callback for valid argument', function () {
        var actual = (0, OtherUtils_1.toUpperCaseWithCb)('abc', function () { });
        expect(actual).toBe('ABC');
    });
    it('Calculates complexity', function () {
        var someInfo = {
            length: 5,
            extraInfo: {
                field1: 'someInfo',
                field2: 'someOtherInfo'
            }
        };
        var actual = (0, OtherUtils_1.calculateComplexity)(someInfo);
        expect(actual).toBe(10);
    });
});
