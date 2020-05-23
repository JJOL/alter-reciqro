const admin = require('firebase-admin');
const accountCred = require('./itesm-ca2020-firebase-adminsdk-eqczu-f2234474ce.json');
admin.initializeApp({
    credential: admin.credential.cert(accountCred),
    databaseURL: 'https://itesm-ca2020.firebaseio.com'
});

const db = admin.firestore();
async function mapRecords(collectionName, updateFn) {
    const batch = db.batch();

    console.log(`Going to update ${collectionName}...`);
    
    try {
        const objs = await db.collection(collectionName).get();
        console.log(`Data objects retrieved!`);

        objs.forEach(doc => {
            console.log(`Going to update ${doc.id}.`);
            updateFn(doc, batch);
        });

        await batch.commit();

        console.log(`Update over ${collectionName} successfull!`);
    } catch(err) {
        console.log(err);
    }
}


module.exports.db = db;
module.exports.mapRecords = mapRecords;

// mapRecords('/quesos', (doc, batch) => {
//     let qData = doc.data();
//     let typeStr = qData.name.substring(0,4) + '-type';
//     batch.update(doc.ref, { type: typeStr });
// });

