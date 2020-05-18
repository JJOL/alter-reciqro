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