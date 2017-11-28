var rest = require('../API/Restclient');
var builder = require('botbuilder');

//Calls 'getYelpData' in RestClient.js with 'displayRestaurantCards' as callback to get list of restaurant information
exports.displayCurrency = function getCurrencyData(currencyName, location, session){
    var url ='https://api.fixer.io/latest';
    rest.getCurrencyData(url,session,displayCurrency);
}

function getCurrencyData(message, currencyName,session){
    //Parses JSON
    var currencyData = JSON.parse(message);

    //Adds first 5 nutrition information (i.e calories, energy) onto list
    var currency = currencyData.rates.AUD;

    //Displays nutrition adaptive cards in chat box 
    session.send(new builder.Message(session).addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "0.5",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": currencyName.charAt(0).toUpperCase(),
                            "size": "large"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Nutritional Information"
                        }
                    ]
                },
                {
                    "type": "Container",
                    "spacing": "none",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "auto",
                                    "items": [
                                        {
                                            "type": "FactSet",
                                            "facts": currency
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }));
}