const MONTH_FULLNAMES_MAP = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
/**
 * User Story ID: M1NG6
 * Description: Returns month name of the i'th month given.
 * @param  {number} monthIndex
 * @returns string
 */
export function getMonthFullName(monthIndex: number): string {
  return MONTH_FULLNAMES_MAP[monthIndex];
}
/**
 * User Story ID: M1NG6
 * Description: Returns array of month names
 * @returns string[]
 */
export function getAllMonthNames(): string[] {
  return MONTH_FULLNAMES_MAP;
}