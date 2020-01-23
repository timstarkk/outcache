// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

require('dotenv').config();

// Set the region 
AWS.config.update({region: 'us-east-1'});

// var credentials = new AWS.SharedIniFileCredentials({profile: 'personal'});
// AWS.config.credentials = credentials;

// const sendEmail = async(userData) => {
// exports.sendEmail = async (userData) => {
//     return new Promise((resolve) => {
//         try {
//             let emailTemplate = fs.readFileSync(path.resolve(__dirname, './confirmation.html'), 'utf8');
//             let emailSubject = 'Outcache Rental Approved';
//             let sourceAddress = 'info@outcache.com';

//             console.log(userData);

//             // Prepare data for template placeholders
//             let emailData = {
//                 name: userData.firstName,
//             };

//             let templateHtml = handlebars.compile(emailTemplate.toString());
//             let bodyHtml = templateHtml(emailData);

//             let params = {
//                 Destination: {
//                     ToAddresses: [
//                         userData.emailAddress
//                     ]
//                 },
//                 Message: {
//                     Body: {
//                         Html: {
//                             Charset: 'UTF-8',
//                             Data: bodyHtml
//                         },
//                         Text: {
//                             Charset: 'UTF-8',
//                             Data: emailSubject
//                         }
//                     },
//                     Subject: {
//                         Charset: 'UTF-8',
//                         Data: emailSubject
//                     }
//                 },
//                 Source: sourceAddress,
//                 ReplyToAddresses: [
//                     sourceAddress
//                 ]
//             };

//             let sendPromise = new AWS.SES({apiVersion: '2010-12-01'})
//                 .sendEmail(params)
//                 .promise();

//             sendPromise.then(
//                 function(data) {
//                     //  data.MessageId
//                     console.log(data.MessageId);
//                     resolve(true);
//                 }).catch(
//                 function(err) {
//                     console.error(err, err.stack);
//                     resolve(false);
//                 });
//         } catch (error) {
//             resolve(false);
//         }
//     });
// };

// sendEmail({firstName: 'Tommy', emailAddress: 'tpvinyard@gmail.com'})