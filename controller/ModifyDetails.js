var rest = require('../API/Restclient');
var password = require('./LuisDialog');


exports.displayAddress = function showAddress(session, username, password){//Shows the user the address
    var url = 'https://contosobot32.azurewebsites.net/tables/contosobottable';
    rest.showAddress(url, session, username, password, handleAddressResponse)
};

exports.displayEmail = function showEmail(session, username, password){//Shows the user the email
    var url = 'https://contosobot32.azurewebsites.net/tables/contosobottable';
    rest.showEmail(url, session, username, password, handleEmailResponse)
};

exports.displayPhone = function showPhone(session, username, password){//Shows the user the phone
    var url = 'https://contosobot32.azurewebsites.net/tables/contosobottable';
    rest.showPhone(url, session, username, password, handlePhoneResponse)
};

exports.displayBalance = function showBalance(session, username, password){//Shows the user the balance
    var url = 'https://contosobot32.azurewebsites.net/tables/contosobottable';
    rest.showBalance(url, session, username, password, handleBalanceResponse)
};

exports.displayAllDetails = function showAllDetails(session, username, password){//Shows the user all details
    var url = 'https://contosobot32.azurewebsites.net/tables/contosobottable';
    rest.showAllDetails(url, session, username, password, handleAllDetailsResponse)
};


exports.sendAddress = function postAddress(session, username, password, Address){//Add the address to record
    var url = 'https://contosobot32.azurewebsites.net/tables/contosobottable';
    rest.postAddress(url, username, password, Address);
};

exports.sendEmail = function postEmail(session, username,password, Email){//Add the email to record
    var url = 'https://contosobot32.azurewebsites.net/tables/contosobottable';
    rest.postEmail(url, username, password, Email);
};

exports.sendPhone = function postPhone(session, username,password, Phone){//Add the phone number to record
    var url = 'https://contosobot32.azurewebsites.net/tables/contosobottable';
    rest.postPhone(url, username, password, Phone);
};


exports.deleteAddress = function deleteAddress(session,username,password,Address){//Delete the address to record
    var url  = 'https://contosobot32.azurewebsites.net/tables/contosobottable';


    rest.showAddress(url,session, username, password,function(message,session,username,password){
     var allAddress = JSON.parse(message);

        for(var i in allAddress) {
            //deteles when the password and username are correct
            if (allAddress[i].Address === Address && allAddress[i].username === username && allAddress[i].password === password) {


                rest.deleteAddress(url,session,username,password,Address,allAddress[i].id ,handleDeletedAddressResponse)

            }
        }


    });


};

function handleDeletedAddressResponse(body,session,username,password, Address){

        console.log('Done');


}

exports.deleteEmail = function deleteEmail(session,username,password,Email){//deletes email from records
    var url  = 'https://contosobot32.azurewebsites.net/tables/contosobottable';


    rest.showEmail(url,session, username, password,function(message,session,username,password){
     var allEmail = JSON.parse(message);

        for(var i in allEmail) {
            //deteles when the password and username are correct
            if (allEmail[i].Email === Email && allEmail[i].username === username && allEmail[i].password === password) {


                rest.deleteEmail(url,session,username,password,Address,allEmail[i].id ,handleDeletedEmailResponse)

            }
        }


    });


};

function handleDeletedEmailResponse(body,session,username,password, Email){

        console.log('Done');


}


exports.deletePhone = function deletePhone(session,username,password,Phone){//deletes phone number from records
    var url  = 'https://contosobot32.azurewebsites.net/tables/contosobottable';


    rest.showPhone(url,session, username, password,function(message,session,username,password){
     var allPhone = JSON.parse(message);

        for(var i in allPhone) {
            //deteles when the password and username are correct

            if (allPhone[i].Phone === Phone && allPhone[i].username === username && allPhone[i].password === password) {


                rest.deletePhone(url,session,username,password,Phone,allPhone[i].id ,handleDeletedPhoneResponse)

            }
        }


    });


};

function handleDeletedPhoneResponse(body,session,username,password, Phone){

        console.log('Done');


}

function handleAddressResponse(message, session, username,password) {//This determine how the address will be displayed
    var addressResponse = JSON.parse(message);
    var allAddress = [];
    for (var index in addressResponse) {
        var usernameReceived = addressResponse[index].username;
        var passwordReceived = addressResponse[index].password;
        
        console.log(addressResponse[index]);
        var Address = addressResponse[index].Address;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all address unless last one
            if(addressResponse.length - 1) {
                allAddress.push(Address);
            }
            else {
                allAddress.push(Address + ', ');
            }
                // Print all addresses for the user that is currently logged in
        }        
    }

    //checks if the username or the password is correct
    if (allAddress.length == 0){
        session.send("Either your username is incorrect or your password is incorrect... Please try again");  
        
    }
    else{
        session.send("%s, your address(s) are: %s", username, allAddress); 
        correctlogin = 1;   
    }
            
    
}

function handleEmailResponse(message, session, username,password) {//This determine how the email will be displayed
    var emailResponse = JSON.parse(message);
    var allEmail = [];
    for (var index in emailResponse) {
        var usernameReceived = emailResponse[index].username;
        var passwordReceived = emailResponse[index].password;
        
        console.log(emailResponse[index]);
        var Email = emailResponse[index].Email;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all email unless last one
            if(emailResponse.length - 1) {
                allEmail.push(Email);
            }
            else {
                allEmail.push(Email + ', ');
            }
                // Print all email for the user that is currently logged in
        }        
    }
    //checks if the username or the password is correct
    if (allEmail.length == 0){
        session.send("Either your username is incorrect or your password is incorrect... Please try again");  
        
    }
    else{
        session.send("%s, your email(s) are: %s", username, allEmail); 
        correctlogin = 1;   
    }
            
    
}

function handlePhoneResponse(message, session, username,password) {//This determine how the phone numbers will be displayed
    var phoneResponse = JSON.parse(message);
    var allPhone = [];
    for (var index in phoneResponse) {
        var usernameReceived = phoneResponse[index].username;
        var passwordReceived = phoneResponse[index].password;
        
        console.log(phoneResponse[index]);
        var Phone = phoneResponse[index].Phone;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all phone numbers unless last one
            if(phoneResponse.length - 1) {
                allPhone.push(Phone);
            }
            else {
                allPhone.push(Phone + ', ');
            }
                // Print all phone numbers for the user that is currently logged in
        }        
    }
        //checks if the username or the password is correct

    if (allPhone.length == 0){
        session.send("Either your username is incorrect or your password is incorrect... Please try again");  
        
    }
    else{
        session.send("%s, your phone numeber(s) are: %s", username, allPhone); 
        correctlogin = 1;   
    }
            
    
}

function handleBalanceResponse(message, session, username,password) {//This determine how the balance will be displayed
    var balanceResponse = JSON.parse(message);
    var allBalance = [];
    for (var index in balanceResponse) {
        var usernameReceived = balanceResponse[index].username;
        var passwordReceived = balanceResponse[index].password;
        
        console.log(balanceResponse[index]);
        var Balance = balanceResponse[index].Balance;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all balance unless last one
            if(balanceResponse.length - 1) {
                allBalance.push(Balance);
            }
            else {
                allBalance.push(Balance + ', ');
            }
                // Print all balance for the user that is currently logged in
        }        
    }
            //checks if the username or the password is correct

    if (allBalance.length == 0){
        session.send("Either your username is incorrect or your password is incorrect... Please try again");  
        
    }
    else{
        session.send("%s, your account balance is: %s", username, allBalance); 
        correctlogin = 1;   
    }
            
    
}

function handleAllDetailsResponse(message, session, username,password) {//This determine how the all details will be displayed
    var balanceResponse = JSON.parse(message);
    var allBalance = [];
    for (var index in balanceResponse) {
        var usernameReceived = balanceResponse[index].username;
        var passwordReceived = balanceResponse[index].password;
        
        console.log(balanceResponse[index]);
        var Balance = balanceResponse[index].Balance;
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && password === passwordReceived) {
            //Add a comma after all balance unless last one
            if(balanceResponse.length - 1) {
                allBalance.push(Balance);
            }
            else {
                allBalance.push(Balance + ', ');
            }
                // Print all balance for the user that is currently logged in
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
            //Add a comma after all addresses unless last one
            if(addressResponse.length - 1) {
                allAddress.push(Address);
            }
            else {
                allAddress.push(Address + ', ');
            }
                // Print all addresses for the user that is currently logged in
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
            //Add a comma after all phone numbers unless last one
            if(phoneResponse.length - 1) {
                allPhone.push(Phone);
            }
            else {
                allPhone.push(Phone + ', ');
            }
                // Print all phone numbers for the user that is currently logged in
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
            //Add a comma after all emails unless last one
            if(emailResponse.length - 1) {
                allEmail.push(Email);
            }
            else {
                allEmail.push(Email + ', ');
            }
                // Print all emails for the user that is currently logged in
        }        
    }
        //checks if the username or the password is correct
    if (allBalance.length == 0 && allAddress.length == 0 && allEmail.length == 0 && allPhone.length == 0){
        session.send("Either your username is incorrect or your password is incorrect... Please try again");  
        
    }
    else{
        session.send("%s, the following are all of your account details:\n\n Your address(s): %s\n\n Your email(s): %s\n\n Your phone number(s): %s\n\n Your account balance: %s", username, allAddress,allEmail,allPhone,allBalance); 
        correctlogin = 1;   
    }
            
    
}
