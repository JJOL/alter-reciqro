import * as DateUtil from './date.util';

describe('DateUtil', () => {
    it('#getFullMonthName() should return the right month name for a valid index', () => {
        let monthIndA = 2; let monthNameA = 'Marzo';
        let monthIndB = 7; let monthNameB = 'Agosto';
        expect(DateUtil.getMonthFullName(monthIndA)).toEqual(monthNameA);
        expect(DateUtil.getMonthFullName(monthIndB)).toEqual(monthNameB);
    });
    it('#getFullMonthName() should return the null for an invalid index', () => {
        expect(DateUtil.getMonthFullName(-3)).toBeFalsy();
        expect(DateUtil.getMonthFullName(12)).toBeFalsy();
        expect(DateUtil.getMonthFullName(14)).toBeFalsy();
    })
})