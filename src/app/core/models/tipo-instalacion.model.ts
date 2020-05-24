/* In this case we are disabling camelcase to agree with firebase recommended naming convention.*/
/* eslint-disable camelcase */

import { WasteType } from './waste-type';

/**
 * Class that defines the model for the instalation type, indicating its fields.
 */
export class TipoInstalacion {
    id: string;
    name: string;
    icon_url: string;
    acceptedWastes?: string[]
}
