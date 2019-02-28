/**
 * Created by guy on 9/23/18.
 */
const ejs = require('ejs');
const fs = require('fs');
const AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-2'});

module.exports = class MailerAWS {
    mail(email, subject, body, isHTML = false) {
        console.log(`MailerAWS email: \r\nTo: ${email}, \r\nSubject: ${subject}`);
        // console.log(`MailerAWS email: \r\nTo: ${email}, \r\nSubject: ${subject}\r\n${body}`);

        let bodyContent = {};
        if(isHTML){
            bodyContent = {
                Html: {
                    Charset: "UTF-8",
                    Data: body
                }
            }
        }
        else{
            bodyContent = {
                Text: {
                    Charset: "UTF-8",
                    Data: body
                }
            }
        }

        const params = {
            Destination: {
                ToAddresses: [email]
            },
            Message: {
                Body: bodyContent,
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject
                }
            },
            // Source: 'contact@nikahku.com',
            Source: '"Nikahku" <contact@nikahku.com>',
            ReplyToAddresses: ['contact@nikahku.com']
        };

        const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
        return sendPromise.then(
            function (data) {
                console.log(data.MessageId);
            }).catch(
            function (err) {
                console.error(err, err.stack);
            });
    }

    mailEJS(email, subject, ejsFile, args){
        try {
            let str = fs.readFileSync(ejsFile, 'utf8');
            let body = ejs.render(str, args);
            this.mail(email, subject, body, true);
        }
        catch(e){
            console.log("Error in mailEJS", e)
        }
    }
};