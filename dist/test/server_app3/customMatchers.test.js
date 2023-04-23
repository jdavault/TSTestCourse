"use strict";
exports.__esModule = true;
expect.extend({
    toBeValidReservation: function (reservation) {
        var validId = (reservation.id.length > 5) ? true : false;
        var validUser = (reservation.id.length > 5) ? true : false;
        return {
            pass: validId && validUser,
            message: function () { return 'expected reservation to have valid id and user'; }
        };
    },
    toHaveUser: function (reservation, user) {
        var hasRightUser = user == reservation.user;
        return {
            pass: hasRightUser,
            message: function () { return "expected reservation to have user ".concat(user, ", received ").concat(reservation.user); }
        };
    }
});
var someReservation = {
    id: '123456',
    endDate: 'someEndDate',
    startDate: 'someStartDate',
    room: 'someRoom',
    user: 'someUser'
};
describe('custom matchers test', function () {
    it('check for valid reservation', function () {
        expect(someReservation).toBeValidReservation();
        expect(someReservation).toHaveUser('someUser');
    });
});
