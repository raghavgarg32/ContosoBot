var rest = require('../API/Restclient');
var password = require('./LuisDialog');
exports.displayFavouriteFood = function getFavouriteFood(session, username, password){
    var url = 'https://foodbot32.azurewebsites.net/tables/foodbot';
    rest.getFavouriteFood(url, session, username, password, handleFavouriteFoodResponse)
};

exports.sendFavouriteFood = function postFavouriteFood(session, username, favouriteFood){
    var url = 'https://foodbot32.azurewebsites.net/tables/foodbot';
    rest.postFavouriteFood(url, username, favouriteFood);
};



exports.deleteFavouriteFood = function deleteFavouriteFood(session,username,favouriteFood){
    var url  = 'https://foodbot32.azurewebsites.net/tables/foodbot';


    rest.getFavouriteFood(url,session, username,function(message,session,username){
     var   allFoods = JSON.parse(message);

        for(var i in allFoods) {

            if (allFoods[i].favouriteFood === favouriteFood && allFoods[i].username === username) {


                rest.deleteFavouriteFood(url,session,username,favouriteFood, allFoods[i].id ,handleDeletedFoodResponse)

            }
        }


    });


};

function handleDeletedFoodResponse(body,session,username, favouriteFood){

        console.log('Done');


}


function handleFavouriteFoodResponse(message, session, username,password) {
    var favouriteFoodResponse = JSON.parse(message);
    var allFoods = [];
    for (var index in favouriteFoodResponse) {
        var usernameReceived = favouriteFoodResponse[index].username;
        var passwordReceived = favouriteFoodResponse[index].password;
        
        console.log(favouriteFoodResponse[index]);
        var favouriteFood = favouriteFoodResponse[index].favouriteFood;
        session.send("%s, password", password);  
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all favourite foods unless last one
            if(favouriteFoodResponse.length - 1) {
                allFoods.push(favouriteFood);
            }
            else {
                allFoods.push(favouriteFood + ', ');
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your favourite foods are: %s", username, allFoods);                
    
}