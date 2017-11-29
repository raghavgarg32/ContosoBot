var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/0461118e-0ab3-4545-9472-804e20a57eeb/url?iterationId=3a6b4006-bd1b-4660-a64e-2dcab087dcdb',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': 'bd63bc40d4e7459588ca028e17109b4a'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}