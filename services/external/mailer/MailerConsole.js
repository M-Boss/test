/**
 * Created by guy on 8/18/18.
 */


export default class MailerConsole{

    mail(email, subject, body){
        console.log(`Fake email sent: \r\nTo: ${email}, \r\nSubject: ${subject}\r\n${body}`);
    }
}