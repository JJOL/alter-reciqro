
/**
 * Description: Standard Degree Angle Unit
 */
interface DegreeUnit {
    h: number;
    m: number;
    s: number;
};

/**
 * User Story ID: M1NG1
 * Description: Parses a geocoordinate degree string data to google maps format
 * @param  {string} locationStr
 * @returns {number, number}}
 */
export function parseDegreesToGoogleGeoPoint(locationStr: string): { lat: number, lng: number } {
    let {lat, lng} = getRegexGeoCoord(locationStr)
    
    let latDecimal = convertDegreesToDecimal(lat.h, lat.m, lat.s),
        lngDecimal = convertDegreesToDecimal(lng.h, lng.m, lng.s);

    return {
        lat: latDecimal,
        lng: lngDecimal
    };
}
/**
 * Description: Parses a string of a pair DegreeUnits to number DegreeUnits
 * @param  {string} locationStr
 * @returns {lat: DegreeUnit, lng: DegreeUnit}
 */
function getRegexGeoCoord(locationStr: string): {lat: DegreeUnit, lng: DegreeUnit} {
    const expr = /^(\d+)\°(\d+)\'(\d+\.?\d*)\"N\s(\d+)\°(\d+)\'(\d+\.?\d*)\"W$/;
    let res = expr.exec(locationStr);
    if (!res) {
        throw new Error('InvalidFormatError: String doesn\'t match Degree format.')
    }
    return {
        lat: {
            h: parseFloat(res[1]), m: parseFloat(res[2]), s: parseFloat(res[3])
        },
        lng: {
            h: parseFloat(res[4]), m: parseFloat(res[5]), s: parseFloat(res[6])
        }
    };
}
/**
 * Description: Converts degrees to decimals
 * @param  {number} h
 * @param  {number} m
 * @param  {number} s
 * @returns {number}
 */
function convertDegreesToDecimal(h: number, m: number, s: number): number {
    let secondDecimals = s / 60,
        minuteDecimals = (m + secondDecimals) / 60,
        hourDecimals   = (h + minuteDecimals);
    return hourDecimals;
}