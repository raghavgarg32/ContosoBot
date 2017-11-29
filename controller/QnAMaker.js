var rest = require('../API/Restclient');

//Gets the qna answers
exports.talkToQnA = function postQnAResults(session, question){
    var url = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/aa129982-6b2e-47dd-80f8-32f6eac87325/generateAnswer';
    rest.postQnAResults(url, session, question, handleQnA)
};

function handleQnA(body, session, question) {
    session.send(body.answers[0].answer);
};