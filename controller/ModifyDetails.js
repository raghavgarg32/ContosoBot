var rest = require('../API/Restclient');
var password = require('./LuisDialog');


exports.displayAddress = function showAddress(session, username, password){
    var url = 'http://contosobank32.azurewebsites.net/tables/contosobankbot';
    rest.showAddress(url, session, username, password, handleAddressResponse)
};

exports.displayEmail = function showEmail(session, username, password){
    var url = 'http://contosobank32.azurewebsites.net/tables/contosobankbot';
    rest.showEmail(url, session, username, password, handleEmailResponse)
};

exports.displayPhone = function showPhone(session, username, password){
    var url = 'http://contosobank32.azurewebsites.net/tables/contosobankbot';
    rest.showPhone(url, session, username, password, handlePhoneResponse)
};

exports.displayBalance = function showBalance(session, username, password){
    var url = 'http://contosobank32.azurewebsites.net/tables/contosobankbot';
    rest.showBalance(url, session, username, password, handleBalanceResponse)
};

exports.displayAllDetails = function showAllDetails(session, username, password){
    var url = 'http://contosobank32.azurewebsites.net/tables/contosobankbot';
    rest.showAllDetails(url, session, username, password, handleAllDetailsResponse)
};





exports.sendEmail = function postEmail(session, username,password, Email){
    var url = 'http://contosobank32.azurewebsites.net/tables/contosobankbot';
    rest.postEmail(url, username, password, Email);
};

exports.deleteAddress = function deleteAddress(session,username,password,Address){
    var url  = 'http://contosobank32.azurewebsites.net/tables/contosobankbot';


    rest.showAddress(url,session, username, password,function(message,session,username,password){
     var allAddress = JSON.parse(message);

        for(var i in allAddress) {

            if (allAddress[i].Address === Address && allAddress[i].username === username && allAddress[i].password === password) {


                rest.deleteAddress(url,session,username,password,Address,allAddress[i].id ,handleDeletedAddressResponse)

            }
        }


    });


};

function handleDeletedAddressResponse(body,session,username,password, Address){

        console.log('Done');


}

var correctlogin = 0;



function handleAddressResponse(message, session, username,password) {
    var addressResponse = JSON.parse(message);
    var allAddress = [];
    for (var index in addressResponse) {
        var usernameReceived = addressResponse[index].username;
        var passwordReceived = addressResponse[index].password;
        
        console.log(addressResponse[index]);
        var Address = addressResponse[index].Address;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all favourite foods unless last one
            if(addressResponse.length - 1) {
                allAddress.push(Address);
            }
            else {
                allAddress.push(Address + ', ');
            }
                // Print all favourite foods for the user that is currently logged in
        }        
    }
    if (allAddress.length == 0){
        session.send("Either your username is incorrect or your password is incorrect... Please try again");  
        
    }
    else{
        session.send("%s, your address(s) are: %s", username, allAddress); 
        correctlogin = 1;   
    }
            
    
}

function handleEmailResponse(message, session, username,password) {
    var emailResponse = JSON.parse(message);
    var allEmail = [];
    for (var index in emailResponse) {
        var usernameReceived = emailResponse[index].username;
        var passwordReceived = emailResponse[index].password;
        
        console.log(emailResponse[index]);
        var Email = emailResponse[index].Email;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all favourite foods unless last one
            if(emailResponse.length - 1) {
                allEmail.push(Email);
            }
            else {
                allEmail.push(Email + ', ');
            }
                // Print all favourite foods for the user that is currently logged in
        }        
    }
    if (allEmail.length == 0){
        session.send("Either your username is incorrect or your password is incorrect... Please try again");  
        
    }
    else{
        session.send("%s, your email(s) are: %s", username, allEmail); 
        correctlogin = 1;   
    }
            
    
}

function handlePhoneResponse(message, session, username,password) {
    var phoneResponse = JSON.parse(message);
    var allPhone = [];
    for (var index in phoneResponse) {
        var usernameReceived = phoneResponse[index].username;
        var passwordReceived = phoneResponse[index].password;
        
        console.log(phoneResponse[index]);
        var Phone = phoneResponse[index].Phone;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all favourite foods unless last one
            if(phoneResponse.length - 1) {
                allPhone.push(Phone);
            }
            else {
                allPhone.push(Phone + ', ');
            }
                // Print all favourite foods for the user that is currently logged in
        }        
    }
    if (allPhone.length == 0){
        session.send("Either your username is incorrect or your password is incorrect... Please try again");  
        
    }
    else{
        session.send("%s, your phone numeber(s) are: %s", username, allPhone); 
        correctlogin = 1;   
    }
            
    
}

function handleBalanceResponse(message, session, username,password) {
    var balanceResponse = JSON.parse(message);
    var allBalance = [];
    for (var index in balanceResponse) {
        var usernameReceived = balanceResponse[index].username;
        var passwordReceived = balanceResponse[index].password;
        
        console.log(balanceResponse[index]);
        var Balance = balanceResponse[index].Balance;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all favourite foods unless last one
            if(balanceResponse.length - 1) {
                allBalance.push(Balance);
            }
            else {
                allBalance.push(Balance + ', ');
            }
                // Print all favourite foods for the user that is currently logged in
        }        
    }
    if (allBalance.length == 0){
        session.send("Either your username is incorrect or your password is incorrect... Please try again");  
        
    }
    else{
        session.send("%s, your account balance is: %s", username, allBalance); 
        correctlogin = 1;   
    }
            
    
}

function handleAllDetailsResponse(message, session, username,password) {
    var balanceResponse = JSON.parse(message);
    var allBalance = [];
    for (var index in balanceResponse) {
        var usernameReceived = balanceResponse[index].username;
        var passwordReceived = balanceResponse[index].password;
        
        console.log(balanceResponse[index]);
        var Balance = balanceResponse[index].Balance;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all favourite foods unless last one
            if(balanceResponse.length - 1) {
                allBalance.push(Balance);
            }
            else {
                allBalance.push(Balance + ', ');
            }
                // Print all favourite foods for the user that is currently logged in
        }        
    }

    var addressResponse = JSON.parse(message);
    var allAddress = [];
    for (var index in addressResponse) {
        var usernameReceived = addressResponse[index].username;
        var passwordReceived = addressResponse[index].password;
        
        console.log(addressResponse[index]);
        var Address = addressResponse[index].Address;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all favourite foods unless last one
            if(addressResponse.length - 1) {
                allAddress.push(Address);
            }
            else {
                allAddress.push(Address + ', ');
            }
                // Print all favourite foods for the user that is currently logged in
        }        
    }

    var phoneResponse = JSON.parse(message);
    var allPhone = [];
    for (var index in phoneResponse) {
        var usernameReceived = phoneResponse[index].username;
        var passwordReceived = phoneResponse[index].password;
        
        console.log(phoneResponse[index]);
        var Phone = phoneResponse[index].Phone;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all favourite foods unless last one
            if(phoneResponse.length - 1) {
                allPhone.push(Phone);
            }
            else {
                allPhone.push(Phone + ', ');
            }
                // Print all favourite foods for the user that is currently logged in
        }        
    }

    var emailResponse = JSON.parse(message);
    var allEmail = [];
    for (var index in emailResponse) {
        var usernameReceived = emailResponse[index].username;
        var passwordReceived = emailResponse[index].password;
        
        console.log(emailResponse[index]);
        var Email = emailResponse[index].Email;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all favourite foods unless last one
            if(emailResponse.length - 1) {
                allEmail.push(Email);
            }
            else {
                allEmail.push(Email + ', ');
            }
                // Print all favourite foods for the user that is currently logged in
        }        
    }

    
    if (allBalance.length == 0 && allAddress.length == 0 && allEmail.length == 0 && allPhone.length == 0){
        session.send("Either your username is incorrect or your password is incorrect... Please try again");  
        
    }
    else{
        session.send("%s, the following are all of your account details:\n\n Your address(s): %s\n\n Your email(s): %s\n\n Your phone number(s): %s\n\n Your account balance: %s", username, allAddress,allEmail,allPhone,allBalance); 
        correctlogin = 1;   
    }
            
    
}