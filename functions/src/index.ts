import * as functions from 'firebase-functions';

export { onDeleteEvent, onModifyEvent } from './event.funcs';

import * as express from 'express';
// import * as https from 'https';
// import * as rp from 'request-promise';

const eApp = express();

eApp.get('/user/info/events/detail-event/:detailEventId', (req, res) => {
    res.sendFile(__dirname+'/index.html');
//   console.log('/user/info/events/detail-event');
//   https.get('https://itesm2020-ca.web.app', (resp) => {
//     let data = '';
//     resp.on('data', (chunk: string) => {
//       data += chunk;
//     });

//     resp.on('end', () => {
//       res.send(data);
//       console.log(data);
//     });
//   })
//     .on('error', (err: any) => {
//         console.log('Error while getting index.html from hosting!');
//         console.log(err);

//         res.status(500);
//         res.send('Unexpected Error!');
//     });
//   rp('https://www.google.com/')
//       .then((htmlString: any) => {
//         res.send(htmlString);
//       })
//       .catch((err: any) => {
        
//       });   
});

export const serverPageRenderer = functions.https.onRequest((req, res) => {

    
  if (!req.path) {
    req.url = `/${req.url}`;
  }

  return eApp(req, res);
});