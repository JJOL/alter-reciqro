/**
 * Class that defines the model for the delegation, indicating its fields.
 */
export class DelegationModel {
  /**
   *  User Story ID: M4NC5
     * Constructor takes as arguments the id and name of the delegation.
     * @param  {string} publicreadonlyid
     * @param  {string} publicreadonlyname
     */
  constructor(
        public readonly id: string,
        public readonly name: string,
  ) {}
}  