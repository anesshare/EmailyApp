const sendgrid = require('sendgrid')
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail{
constructor({subject,recipients},content){
    super();
    this.sgApi = sendgrid(keys.sendGridKey)
    this.from_email=new helper.Email('testemailytest@gmail.com')
    this.subject = subject;
    this.body = new helper.Content('text/html', content)
    this.recipients= this.formatAddresses(recipients)
    this.addContent(this.body); 
    this.addClickTracking();
    this.addRecipients();
}
formatAddresses(recipients){
    return recipients.map(({email})=>{
        return new helper.Email(email)
    })
}
addClickTracking(){
    const trackSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true,true)
    trackSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(trackSettings)
}
addRecipients(){
    const personalize = new helper.Personalization()
    this.recipients.forEach(recipients =>{
        personalize.addTo(recipients)
    })
    this.addPersonalization(personalize);
}
async send() {
    const request = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON(),
    });
    console.log('SendGrid Request Body:', this.toJSON());
    try {
        const response = await this.sgApi.API(request);
        console.log('SendGrid Response:', response);
        return response;
    } catch (error) {
        console.error('SendGrid Error:', error.response ? error.response.body : error);
        throw error;
    }
}

}
module.exports= Mailer;