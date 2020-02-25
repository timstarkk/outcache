// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// const dotenv = require('dotenv');
// console.log(process.env.AWS_ACCESS_KEY_ID)

// Set the region 
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY_ID;
AWS.config.region = "us-east-1";

// const sendEmail = async(userData) => {
module.exports = { 
    sendEmail = async (userData) => {
        return new Promise((resolve) => {
            try {
                let emailTemplate = fs.readFileSync(path.resolve(__dirname, '../email_templates/confirmation.html'), 'utf8');
                let emailSubject = 'Outcache Rental Approved';
                let sourceAddress = 'outcachetech@gmail.com';

                console.log(userData);

                // Prepare data for template placeholders
                let emailData = {
                    name: userData.body.firstName,
                    itemName: userData.body.itemName,
                    beginDate: userData.body.beginDate,
                    endDate: userData.body.endDate
                };

                let templateHtml = handlebars.compile(emailTemplate.toString());
                let bodyHtml = templateHtml(emailData);

                let params = {
                    Destination: {
                        ToAddresses: [
                            userData.body.emailAddress
                        ]
                    },
                    Message: {
                        Body: {
                            Html: {
                                Charset: 'UTF-8',
                                Data: bodyHtml
                            },
                            Text: {
                                Charset: 'UTF-8',
                                Data: emailSubject
                            }
                        },
                        Subject: {
                            Charset: 'UTF-8',
                            Data: emailSubject
                        }
                    },
                    Source: sourceAddress,
                    ReplyToAddresses: [
                        sourceAddress
                    ]
                };

                let sendPromise = new AWS.SES({apiVersion: '2010-12-01'})
                    .sendEmail(params)
                    .promise();

                sendPromise.then(
                    function(data) {
                        //  data.MessageId
                        console.log(data.MessageId);
                        resolve(true);
                    }).catch(
                    function(err) {
                        console.error(err, err.stack);
                        resolve(false);
                    });
            } catch (error) {
                resolve(false);
                console.log(error);
            }
        });
    }
};

