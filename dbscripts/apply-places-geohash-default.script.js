const applyChanges = require('./apply-change');
// const geohash = require('../src/app/core/utils/geohash.utils');
const admin = require('firebase-admin');
const geo = require('geofirex').init(admin);

console.log('Going to Apply Change: Places-GeoHash-Default');
applyChanges.mapRecords('/places', (placeDoc, batch) => {
    let placeData = placeDoc.data();
    if (!placeData.point) {
        let pos = {
            lat: placeData.location.latitude,
            lng: placeData.location.longitude
        };

        let point = geo.point(pos.lat, pos.lng);
        batch.update(placeDoc.ref, {
            point: point
        });
    }
});