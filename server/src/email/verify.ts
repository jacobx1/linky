// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

const SENDER_EMAIL_ADDRESS = 'forms@siitr.com';
const BASE_ADDRESS = 'https://linky.jschw.in/';

const generateVerifyLink = verifyKey =>
  `${BASE_ADDRESS}api/verify/${verifyKey}`;

const generateEmailBody = verifyKey => ({ /* required */
  Html: {
   Charset: "UTF-8",
   Data: `<a href='${generateVerifyLink(verifyKey)}'>Click to verify account</a>`
  },
  Text: {
   Charset: "UTF-8",
   Data: `Go to ${generateVerifyLink(verifyKey)} in your browser`
  }
});

const generateEmailTemplate = (toAddress, verifyKey) => ({
  Destination: { /* required */
    ToAddresses: [
      toAddress,
    ]
  },
  Message: { /* required */
    Body: generateEmailBody(verifyKey),
     Subject: {
      Charset: 'UTF-8',
      Data: 'Linky: Verify account'
     }
    },
  Source: SENDER_EMAIL_ADDRESS, /* required */
  ReplyToAddresses: [
      'jacobx1@gmail.com',
    /* more items */
  ],
});

export const sendVerifyEmail = async (toAddress, verifyKey) => {
  try {
    const params = generateEmailTemplate(toAddress, verifyKey);
    const res = await new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
    console.log(res.MessageId);
  } catch (error) {
    console.error(error);
  }
}
