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

    const interestedSnaps = await db.collection('/user_interested_event').where('event_id', '==', eventSnap.id).get();

    const batch = db.batch();

    const interestedEmails: string[] = [];
    interestedSnaps.forEach(interestedSnap => {
      const interestedData = interestedSnap.data();
      interestedEmails.push(interestedData.user_mail);
      batch.delete(interestedSnap.ref);
    });

    await batch.commit();
  
    console.log('Correos a Procesar:');
    console.log(interestedEmails);

    // Send Email to emails
    if (interestedEmails.length > 0) {
      await sgMail.send({
        to: interestedEmails,
        from: 'alterdpto@gmail.com',
        subject: `ReciQro | El evento ${eventData.name} ha sido cancelado!`,
        html: `<p>Te avisamos que el evento "${eventData.name}" para el día ${eventData.end_date} se ha cancelado.</p>`
      }, true);
    }
    

  } catch (err) {
    console.log(err);
  }
  
});