/**
 * Created by guy on 8/18/18.
 */

module.exports = function bind(container, emitter){
    emitter.on('recovery_token_generated', function(user){
        const mailer = container.get('mailer');
        const config = container.get('config');
        const link = `${config.get('app.domain')}reset/${user.id}/${user.recovery_token}`;
        const text = `
        Please click on this link to reset your password: 
        ${link}
        
        ${config.get('app.name')}
    `;
        mailer.mail(user.email, 'Password recovery link', text)
    });
};
