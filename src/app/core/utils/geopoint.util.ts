/**
 * Equivalence of seconds to minutes and minutes to hours
 */
const CONV_EQUIV = 60;

/**
 * Printing Significant decimals
 */
const SIGNIFICANT_DIGITS = 4;

/**
 * Description: Standard Degree Angle Unit
 */
export interface DegreeUnit {
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
    lngDecimal = -1*convertDegreesToDecimal(lng.h, lng.m, lng.s);

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
  const expr = /^(-?\d+)\°(\d+)\'(\d+\.?\d*)\"N\s(-?\d+)\°(\d+)\'(\d+\.?\d*)\"W$/;
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
  let secondDecimals = s / CONV_EQUIV,
    minuteDecimals = (m + secondDecimals) / CONV_EQUIV,
    hourDecimals   = (h + minuteDecimals);
  return hourDecimals;
}



/**
 * User Story ID: M1NG1
 * Description: Parses a google latlng decimal to Degree
 * @param  {{ lat: number, lng: number }} latlng
 * @returns {string}}
 */
export function parseGoogleGeoPointToDegrees(latlng: { lat: number, lng: number }): string  {

  let lat = convertDecimalToDegrees(latlng.lat);
  let lng = convertDecimalToDegrees(-1*latlng.lng);

  return getStringDegreeCoords(lat, lng);

}

/**
 * Description: Parses a pair of DegreeUnits into a string
 * @param  {string} locationStr
 * @returns {lat: DegreeUnit, lng: DegreeUnit}
 */
function getStringDegreeCoords(lat: DegreeUnit, lng: DegreeUnit): string {
  return `${lat.h}\°${lat.m}\'${lat.s.toFixed(SIGNIFICANT_DIGITS)}\"N ` +
           `${lng.h}\°${lng.m}\'${lng.s.toFixed(SIGNIFICANT_DIGITS)}\"W`;
}


/**
 * Description: Converts decimals to degres
 * @param  {number} decimal
 * @returns {DegreeUnit}
 */
function convertDecimalToDegrees(decimal: number): DegreeUnit {
  let h = Math.floor(decimal);
  let md = (decimal - h) * CONV_EQUIV,
    m = Math.floor(md);
  let s = (md - m) * CONV_EQUIV;
  return {
    h,
    m,
    s
  };
}