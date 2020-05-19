/* eslint-disable quotes */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey('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');
admin.initializeApp();
const db = admin.firestore();
/**
 * User Story ID: M2NC6, M2NC7
 * Description: On a 'Event' model delete event send a email to a list of interested users of the 'Event'.
 */
export const onDeleteEvent = functions.firestore.document('/events/{eventId}').onDelete(async (eventSnap, ctx) => {

    try {
  
      const eventData = eventSnap.data();
      if (!eventData) {
        throw new Error(`NoEventDataError: For deleted event ${eventSnap.id}!`);
      }
      eventData.end_date = eventData.end_date.toDate();
  
      // Process Interested
      const interestedSnaps = await db.collection('/user_interested_event').where('event_id', '==', eventSnap.id).get();
  
      const batch = db.batch();
  
      const interestedEmails: string[] = [];
      interestedSnaps.forEach(interestedSnap => {
        const interestedData = interestedSnap.data();
        interestedEmails.push(interestedData.user_mail);
        batch.delete(interestedSnap.ref);
      });
  
      await batch.commit();
    
      console.log('Emails to process:');
      console.log(interestedEmails);
  
      // Send Email to emails
      if (interestedEmails.length > 0) {
        await broadcastEmail(
          interestedEmails,
          `ReciQro | El evento ${eventData.name} ha sido cancelado!`,
          `<p>Te avisamos que el evento "${eventData.name}" para el día ${eventData.end_date} se ha cancelado.</p>`
        );
      }
  
    } catch (err) {
      console.log(err);
    }
    
  });
  
/**
 * User Story ID: M2NC6, M2NC7
 * Description: On a 'Event' model delete event send a email to a list of interested users of the 'Event'.
 */
export const onModifyEvent = functions.firestore.document('/events/{eventId}').onUpdate(async (eventSnap, ctx) => {
  try {
    const afterData  = eventSnap.after.data();
    const beforeData = eventSnap.after.data();
    if (!afterData || !beforeData) {
      throw new Error(`NoEventDataError: For update event ${eventSnap.after.id}!`);
    }

    const triggerProps = ['start_date', 'end_date', 'location'];
    for (let prop of triggerProps) {
      if (afterData[prop] != beforeData[prop]) {
        // Property has changed! Emit Email
        let eventName = afterData.name;
        console.log(`Event ${eventName} has changed its ${prop}`);

        let interestedEmails = await getInterestedUserEmailsForEvent(eventSnap.after.id);        
        let abrirAppHtml = `<a href="${URL}/user/info/events/detail-event/${eventSnap.after.id}s">Abrir evento</a>`;
        
        console.log('Emails to process:');
        console.log(interestedEmails);
        await broadcastEmail(
          interestedEmails,
          `ReciQro | Un evento al que estabas interesado a cambiado fecha o lugar!`,
          `<p>Te avisamos que el evento "${eventName}" ha cambiado sus datos de fecha o lugar. Por favor revisa nuevamente la información del evento en la aplicación. <br>${abrirAppHtml}`);
        break;
      }
    }
  }
  catch(err) {
    console.log(err);
  }

});
  
  /**
   * User Story ID: M2NC6, M2NC7
   * Description: On a 'Event' model delete event send a email to a list of interested users of the 'Event'.
   */
  async function getInterestedUserEmailsForEvent(eventId: string): Promise<string[]> {
  
    const interestedSnaps = await db.collection('/user_interested_event').where('event_id', '==', eventId).get();
    const interestedEmails: string[] = [];
    interestedSnaps.forEach(interestedSnap => {
      const interestedData = interestedSnap.data();
      interestedEmails.push(interestedData.user_mail);
    });
  
    return interestedEmails;
  }
  
  /**
   * User Story ID: M2NC6, M2NC7
   * Description: Sends an email to a list of email accounts.
   */
   function broadcastEmail(emails: string[], subject: string, html: string): Promise<any> {
    return sgMail.send({
      to: emails,
      from: 'alterdpto@gmail.com',
      subject: subject,
      html: html
    }, true);
  }




import * as express from 'express';
import * as crawler from 'es6-crawler-detect/src';

// import * as https from 'https';
// import * as rp from 'request-promise';

const eApp = express();

/**
 * User Story ID: M2NC5 
 * Description: Create a meta tag html for social and seo website crawlers for page events.
 */
eApp.get('/user/info/events/detail-event/:detailEventId', (req, res) => {
    
  const crawlerDetector = new crawler.Crawler(req);
  if (crawlerDetector.isCrawler(req.get('user-agent'))) {
    console.log('=========================');
    console.log('|We detected a crawler! |');
    console.log('=========================');
    console.log(crawlerDetector.getMatches());

    let eventId = req.params['detailEventId'];

    if (eventId) {
      db.collection('/events').doc(eventId).get()
      .then(eventSnap => {
        if (eventSnap.exists) {
          let eventData: any = eventSnap.data();
          // Get Event Info
          let eventInfo = {
            name: eventData.name,
            description: eventData.description,
            icon: eventData.icon,
            start_date: eventData.start_date.toDate()
          };

          console.log(`On Serving Good Meta Tag for ${eventInfo.name}`);

          let htmlResp =
          `<!DOCTYPE html>` +
          `<html lang="en" xmlns:og="http://opengraphprotocol.org/schema/">`+
          `<head>`+
          `<meta property= 'og:title' content= 'ReciQro | ${eventInfo.name}' />`+
          `<meta property= 'og:image' content= '${eventInfo.icon}' />`+
          `<meta property= 'og:description' content= '${eventInfo.description}'/>`+
          `<meta property= 'og:type' content= 'website' />`+
          `<meta property= 'og:url' content= 'https://itesm-ca2020.web.app/user/info/events/detail-event/${eventId}' />`+
          `<meta property= 'fb:app_id', content= '725418228231566' />`+
          `</head>`+
          `</html>`;

          console.log('Serving: ');
          console.log(htmlResp);
            
          res.send(htmlResp);

        } else {
           sendCrawlingError(res, 'EventId does not exist');
        }
      })
      .catch((err) => {
         sendCrawlingError(res, 'Error at accessing db');
      });
    } else {
       sendCrawlingError(res, 'Invalid URL');
    }

  }

  else {
    console.log('Serving Normal Page For User!');
    
    res.sendFile(__dirname+'/index.html');
  }
    

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

/**
 * User Story ID: M2NC5 
 * Description: Send error if wrong
 */
function sendCrawlingError(res: any, errMsg: string): any {
  console.log(`On Error()`);
  console.log(errMsg);
  
  let htmlResp =
  `<!DOCTYPE html>` +
  `<html lang="en" xmlns:og="http://opengraphprotocol.org/schema/">`+
  `<meta property= 'og:title' content= 'ReciQro/>`+
  `<meta property= 'og:description' content= '${errMsg}'/>`+
  `<meta property= 'og:type' content= 'website' />`+
  `<meta property= 'og:url' content= 'https://itesm-ca2020.web.app/' />`+
  `<meta property= 'fb:app_id', content= '725418228231566' />`+
  `</html>`;

  res.send(htmlResp);
}
  
/**
 * User Story ID: M2NC5 
 * Description: process server rendered pages.
 */
export const serverPageRenderer = functions.https.onRequest((req, res) => {
  if (!req.path) {
    req.url = `/${req.url}`;
  }

  return eApp(req, res);
});