const applyChanges = require('./apply-change');

console.log('Going to Apply Change: Places-Last-Update-Date-Default');
let now = new Date();
applyChanges.mapRecords('/places', (placeDoc, batch) => {
    let placeData = placeData.data();
    if (!placeData.last_updated_date) {
        batch.update(placeDoc.ref, {
            last_updated_date: now
        });
    }
});