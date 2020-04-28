/* eslint-disable max-params */
/**
 * Class that defines the model for the administrator, indicating its fields.
 */
export class AdminModel {
  /**
   * @param  {string} publicreadonlyalias
   * @param  {string} publicreadonlydelegation_id
   * @param  {number} publicreadonlypoints
   * @param  {string[]} publicreadonlyroles
   */
  constructor(
    public readonly id: string,
    public readonly alias: string,
    // eslint-disable-next-line camelcase
    public readonly delegation_id: string,
    public readonly points: number,
    public readonly roles: string[]
  ) {}
}  