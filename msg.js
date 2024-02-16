const accountSid = 'AC7288ca52f698a8d4ba5b64bde2cb84c1';
const authToken = 'd7e17df1763b7b21560551c62d67ce85';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Hello, this is a WhatsApp message sent using Node.js!',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+916374907671'
    })
    .then(message => console.log("done "+message.sid))
    .catch(error => console.error(error));
