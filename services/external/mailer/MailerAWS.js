/**
 * Created by guy on 9/23/18.
 */
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

module.exports = class MailerAWS {
    mail(email, subject, body) {
        console.log(`MailerAWS email: \r\nTo: ${email}, \r\nSubject: ${subject}\r\n${body}`);


        const params = {
            Destination: {
                ToAddresses: [email]
            },
            Message: {
                Body: {
                    // Html: {
                    //     Charset: "UTF-8",
                    //     Data: "HTML_FORMAT_BODY"
                    // },
                    Text: {
                        Charset: "UTF-8",
                        Data: body
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject
                }
            },
            Source: 'sharonhalim18@gmail.com',
            ReplyToAddresses: ['sharonhalim18@gmail.com']
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
}