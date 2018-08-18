/**
 * Created by guy on 8/18/18.
 */
const container = require('../services/bootstrap');

const emitter = container.get('emitter');

emitter.on('recovery_token_generated', function(user){
    const mailer = container.get('mailer');
    const config = container.get('config');
    const link = `${config.get('app.domain')}/auth/recover/reset?token=${user.recovery_token}&email=${user.email}`;
    const text = `
        Please click on this link to reset your password: 
        ${link}
        
        ${config.app.name}
    `;
    mailer.mail(user.email, 'Password recovery link', text)
});