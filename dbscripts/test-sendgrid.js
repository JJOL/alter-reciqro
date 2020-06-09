const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
  to: 'jjoulk@gmail.com',
  from: 'aqropio@municipiodequeretaro.gob.mx',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });