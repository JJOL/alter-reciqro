export class WasteType {
    constructor(
        public readonly id: string,  
        public readonly name : string, 
        public readonly description : string,
        public readonly icon : string,        
    ) {}
};
export class PlacesWasteTypes{
    place: string;
    waste_type: string;
}

