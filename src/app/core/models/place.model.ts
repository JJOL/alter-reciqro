import { TipoInstalacion } from './tipo-instalacion.model';

export class Place {
  constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly location: {
            lat: number,
            lng: number
        },
        public readonly address: string,
        public readonly postal_code: number,
        public readonly places_type: TipoInstalacion,
        public readonly photo: string,
        public readonly qr_code: string,
  ) {}
}
