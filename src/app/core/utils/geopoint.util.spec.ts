import { parseDegreesToGoogleGeoPoint } from './geopoint.util';

describe('parseDegreesToGeoPoint', () => {

    it('should accept a Degree {xx\°yy\'zz.zz\"N aa\°bb\'cc.cc\"W} coords string representation', () => {
        expect(parseDegreesToGoogleGeoPoint('34\°35\'23.4\"N 123\°34\'1.23\"W')).toBeTruthy();
    });

    it('should calculate correct decimal conversion', () => {
        let testStr = '20\°44\'31.2\"N 100\°26\'49.4\"W';
        let latlng  = parseDegreesToGoogleGeoPoint(testStr);
        
        expect(latlng.lat).toBeCloseTo(20.742, 0.001);
        expect(latlng.lng).toBeCloseTo(100.447, 0.001);
    });

    it('should throw Invalid Format Error with an incorrect string', () => {
        expect(() => parseDegreesToGoogleGeoPoint('34\°3523.4\"N 123\°34\'1.23\"W')).toThrowMatching(err => {
            return err.toString().match(/InvalidFormatError/);
        });
    });


});