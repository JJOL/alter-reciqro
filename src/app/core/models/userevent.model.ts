/* In this case we are disabling camelcase to agree with firebase recommended naming convention.*/
/* eslint-disable camelcase */
/**
 * Class that defines the model for the interested user with an event, indicating its fields.
 */
export class UserEvent {

  // eslint-disable-next-line require-jsdoc
  constructor(
          readonly id: string,
          readonly event_id: string,
          readonly user_mail: string
  ) {}
}
