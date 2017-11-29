var rest = require('../API/Restclient');
var builder = require('botbuilder');

//Calls 'getCurrencyData' in RestClient.js with 'displayCurrency' as callback to get list of all currencies
exports.displayCurrency = function getCurrencyData(session,amount, currentcur, nextcur){
    var url = "https://api.fixer.io/latest?base="+currentcur;
    rest.getCurrencyData(url, session,amount, currentcur, nextcur, handleCurrencyResponse)
};

//This displays the currencies
function handleCurrencyResponse(message, session, amount, currentcur, nextcur) {
    var CurrencyResponse = JSON.parse(message);//Takes in JSON
    var allCurrency = [];

    
    // Prints conversion to NZD in a card form
    if (nextcur === 'NZD' && currentcur !== 'NZD'){
        var attachment = [];        
        var card = new builder.HeroCard(session)
        .title("The Converted Amount Is: %s",(CurrencyResponse.rates.NZD * amount))  
        .text("Original Amount: %s\n\nConversion Rate: %s", amount, CurrencyResponse.rates.NZD)
        .images([builder.CardImage.create(session, 'http://image.nj.com/home/adv-media/width380/img/mortgages_and_loans/photo/2017/05/24/MORTGAGE1.jpg')])
        
        attachment.push(card);
        var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);        
    }
    
    // Prints conversion to GBP in a card form
    else if (nextcur === 'GBP' && currentcur !== 'GBP'){
        var attachment = [];        
        var card = new builder.HeroCard(session)
        .title("The Converted Amount Is: %s",(CurrencyResponse.rates.GBP * amount))  
        .text("Original Amount: %s\n\nConversion Rate: %s", amount, CurrencyResponse.rates.GBP)
        .images([builder.CardImage.create(session, 'http://image.nj.com/home/adv-media/width380/img/mortgages_and_loans/photo/2017/05/24/MORTGAGE1.jpg')])
        
        attachment.push(card);
        var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);        
    }

    // Prints conversion to AUD in a card form
    else if (nextcur === 'AUD' && currentcur !== 'AUD'){
        var attachment = [];        
        var card = new builder.HeroCard(session)
        .title("The Converted Amount Is: %s",(CurrencyResponse.rates.AUD * amount))  
        .text("Original Amount: %s\n\nConversion Rate: %s", amount, CurrencyResponse.rates.AUD)
        .images([builder.CardImage.create(session, 'http://image.nj.com/home/adv-media/width380/img/mortgages_and_loans/photo/2017/05/24/MORTGAGE1.jpg')])
        
        attachment.push(card);
        var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);        
    }

    // Prints conversion to CAD in a card form
    else if (nextcur === 'CAD' && currentcur !== 'CAD'){
        var attachment = [];        
        var card = new builder.HeroCard(session)
        .title("The Converted Amount Is: %s",(CurrencyResponse.rates.CAD * amount))  
        .text("Original Amount: %s\n\nConversion Rate: %s", amount, CurrencyResponse.rates.CAD)
        .images([builder.CardImage.create(session, 'http://image.nj.com/home/adv-media/width380/img/mortgages_and_loans/photo/2017/05/24/MORTGAGE1.jpg')])
        
        attachment.push(card);
        var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);        
    }

    // Prints conversion to USD in a card form
    else if (nextcur === 'USD' && currentcur !== 'USD'){
        var attachment = [];        
        var card = new builder.HeroCard(session)
        .title("The Converted Amount Is: %s",(CurrencyResponse.rates.USD * amount))  
        .text("Original Amount: %s\n\nConversion Rate: %s", amount, CurrencyResponse.rates.USD)
        .images([builder.CardImage.create(session, 'http://image.nj.com/home/adv-media/width380/img/mortgages_and_loans/photo/2017/05/24/MORTGAGE1.jpg')])
        
        attachment.push(card);
        var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);        
    }
    
   


}