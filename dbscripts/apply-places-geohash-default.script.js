const applyChanges = require('./apply-change');
const geohash = require('../src/app/core/utils/geohash.utils');


console.log('Going to Apply Change: Places-GeoHash-Default');
applyChanges.mapRecords('/places', (placeDoc, batch) => {
    let placeData = placeDoc.data();
    if (!placeData.geohash) {
        let pos = {
            lat: placeData.location.latitude,
            lng: placeData.location.longitude
        };

        let calcGeohash = geohash.encode(pos.lat, pos.lng, 11);


        batch.update(placeDoc.ref, {
            geohash: calcGeohash
        });
    }
});