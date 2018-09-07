var builder = require('botbuilder');
var food = require("./ModifyDetails");
var details = require("./ModifyDetails");
var currency = require('./Currency');
var qna = require('./QnAMaker');
var correctlogin = require("./ModifyDetails");

// Some sections have been omitted
var isAttachment = false;


exports.startDialog = function (bot) {
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/5b5a0321-ac9b-4115-a730-85383d54dc84?subscription-key=b41aa5a69ef74f248bf75f815a7aefd5&verbose=true&timezoneOffset=0&q=');
    
    bot.recognizer(recognizer);

    bot.dialog('ShowAddress', [ //This shows the user thier addresses
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");//For safety asks user for username
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.userData.username = results.response;            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter in your password:");//For safety asks user for password

            session.userData.password = result.response;//Stores password in password

            next();                        
                    },
                    function (session, result, next) {
              
                        session.userData.password = result.response;
                        
                        // details.displayAddress(session, session.userData.username, session.userData.password);  // displays address to user
                        
                        session.send("Retrieving your Addresss...please wait");//give user loading message
                        session.send("1/23 Example Road, Example Suburb, Auckland")
                        next();
                    },
                   function (session) {
                    //Tells user what they could do next  

                    builder.Prompts.choice(session, "Would you like to reask it or go back", "Show me my address|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({//This triggers the function when this intent is picked up
        matches: 'ShowAddress'
    });    

    bot.dialog('ShowEmail', [//This shows the user thier email
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");//For safety asks user for username
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.userData.username = results.response;

                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");//For safety asks user for password
            
            session.userData.password = result.response;//Stores password in password
            next();                        
                    },
                    function (session, result, next) {
              
                        session.userData.password = result.response;
                        // details.displayEmail(session, session.conversationData["username"], session.conversationData["password"]); // displays email to user
                        
                        session.send("Retrieving your Email(s)...please wait");//give user loading message
                        session.send("example@gmail.com");
                        next();
                    },
                   function (session) {
                    //Tells user what they could do next 
                    builder.Prompts.choice(session, "Would you like to reask it or go back", "Show me my emails|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({//This triggers the function when this intent is picked up
        matches: 'ShowEmail'
    });    
  
    bot.dialog('ShowPhone', [//This shows the user thier phone
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");//For safety asks user for username
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.userData.username = results.response; //Stores username in username
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");//For safety asks user for password
            
            session.userData.password = result.response;//Stores password in password
            next();                        
                    },
                    function (session, result, next) {
              
                        session.userData.password = result.response;
                        // details.displayPhone(session, session.conversationData["username"], session.conversationData["password"]);  //displays phone numbers to users
                        
                        session.send("Retrieving your Phone number(s)... please wait");//give user loading message
                        session.send("021234432");
                        next();
                    },
                   function (session) {
                    //Tells user what they could do next 
                    builder.Prompts.choice(session, "Would you like to reask it or go back", "Show me my phone numbers|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({//This triggers the function when this intent is picked up
        matches: 'ShowPhone'
    });   

    bot.dialog('ShowBalance', [//This shows the user thier balance
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");//For safety asks user for username
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.userData.username = results.response; //Stores username in username
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");//For safety asks user for password
            
            session.userData.password = result.response;
            next();                        
                    },
                    function (session, result, next) {
              
                        session.userData.password = result.response;//Stores password in password
                        // details.displayBalance(session, session.conversationData["username"], session.conversationData["password"]);  //Displays the account balance to the user
                        
                        session.send("Retrieving your Account Balance... please wait");//Gives loading message to user
                        session.send("$250,000,000,000")
                        next();
                    },
                   function (session) {
                    //Tells user what they could do next 

                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my balance|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({//This triggers the function when this intent is picked up
        matches: 'ShowBalance'
    });   
    
    bot.dialog('ShowAllDetails', [//This shows the user thier all details
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");//For safety asks user for username
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.userData.username = results.response; //Stores username in username
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");//For safety asks user for password
            
            session.userData.password = result.response;
            next();                        
                    },
                    function (session, result, next) {
              
                        session.userData.password = result.response;//Stores password in password
                        // details.displayAllDetails(session, session.conversationData["username"], session.conversationData["password"]);  // displays all details to user
                        
                        session.send("Retrieving your all of your details...please wait");//Gives loading message to user
                        session.send("Address: 1/23 Example Road, Example Suburb, Auckland\nPhone: 021234432\nEmail: example@gmail.com\nBalance: $250,000,000,000");
                        next();
                    },
                   function (session) {
                    //Tells user what they could do next 

                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me all details|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({//This triggers the function when this intent is picked up
        matches: 'ShowAllDetails'
    });   
    
    

    bot.dialog('DeleteAddress', [//Deletes address from users addresses
        function (session, args, next) {
            session.dialogData.args = args || {};        
            session.send("Delete Address is not currently allowed through this chatbot, \nPlease complete this operation through website.");
            // builder.Prompts.text(session, "Please enter the username of your account:");//Asks username for safety
                
                // next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.userData.username = results.response; //Stores username into username
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");//Asks password for safety
            
            session.userData.password = result.response;
            next();                        
                    },
                    function (session, result, next) {
                        
                        session.userData.password = result.response;//Stores password into password
                        var addressEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'address');
                        
                        if (addressEntity) {//If address is found then it is deleted other wise its not
                            session.send('Deleting \'%s\'...', addressEntity.entity);
                            details.deleteAddress(session,session.conversationData['username'],session.conversationData["password"],addressEntity.entity); //Finds phone number in users response
                        } else {
                            session.send("I am sorry I could not understand your request... please try again");
                            }
                        
                        next();
                    },
                   function (session) {
                    //Gives user confirmation and suggests what they can do next
                    session.send('Done');                    
                    builder.Prompts.choice(session, "Go back? or check if has been deleted?", "I would like to modify personal infromation|Show my address", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({//When the following intent is found it triggers the function
        matches: 'DeleteAddress'
    });  

    bot.dialog('DeletePhone', [//Deletes phone numbers from users phone numbers
        function (session, args, next) {
            session.dialogData.args = args || {};        
            session.send("Delete Phone number is not currently allowed through this chatbot, \nPlease complete this operation through website.");

                // builder.Prompts.text(session, "Please enter the username of your account:");//Asks username for safety
                
                // next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.userData.username = results.response; //Stores username into username
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");//Asks password for safety
            
            session.userData.password = result.response;
            next();                        
                    },
                    function (session, result, next) {
                        session.send("This data is stored")
                        session.userData.password = result.response;//Stores password in password
                        var phoneEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'Phone');//Finds phone number in users response
                        
                        if (phoneEntity) {//If phone number is found then it is deleted other wise its not
                            session.send('Deleting \'%s\'...', phoneEntity.entity);
                            details.deletePhone(session,session.conversationData['username'],session.conversationData["password"],phoneEntity.entity); //<--- CALLL WE WANT
                        } else {
                            session.send("I am sorry I could not understand your request... please try again");
                            }
                        
                        next();
                    },
                   function (session) {
                    //Gives user confirmation and suggests what they can do next
                    session.send('Done');                                        
                    builder.Prompts.choice(session, "Go back? or check if has been deleted?", "I would like to modify personal infromation|Show my phone numbers", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({//When the following intent is found it triggers the function
        matches: 'DeletePhone'
    }); 

     

    bot.dialog('BankInformation', function (session) {//Acts a menu to provide user indication for bank information
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
               //Summarizes what the user can do here and gives the options as well
                   .title("Information about your friendly neighbourhood Contoso Bank")
                   .text("What would you like to know about your Contoso Bank? And what can I help you with?")
                   .images([builder.CardImage.create(session, 'http://3mkm08kox71vtynw1b1wbtpab.wpengine.netdna-cdn.com/wp-content/uploads/2017/02/GettyImages-117455512.jpg')])
                   .buttons([
                       builder.CardAction.imBack(session, "What are the office hours.", "Office Hours"),
                       builder.CardAction.imBack(session, "What are the contact details", "Contact Us"),                
                       builder.CardAction.imBack(session, "I have a question", "Questions about Conotoso Bank"),
                       builder.CardAction.imBack(session, "Home", "Back"),
                       
                   ]),
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'BankInformation' });//When this intent is picked up it triggers this function

       bot.dialog('PersonalDetails', function (session) {//Acts a menu to provide user indication for Personal Details
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
                    //Summarizes what the user can do here and gives the options as well
                   .title("See or modify your securily kept personal details here")
                   .text("Moved houses? Changed work? Changed details? looking to buy something and don't how much money you have? Here I can answer all of those questions")
                   .images([builder.CardImage.create(session, 'https://img-aws.ehowcdn.com/877x500p/photos.demandstudios.com/getty/article/251/93/79168281.jpg')])
                   .buttons([
                       builder.CardAction.imBack(session, "I would like to see my personal information", "Show Personal Details"),
                       builder.CardAction.imBack(session, "I would like to modify personal infromation", "Modify Personal Details"),                
                       builder.CardAction.imBack(session, "I would like to make a transaction", "Transactions"),
                       builder.CardAction.imBack(session, "Home", "Back"),
                       
                   ]),
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'PersonalDetails' });//When this intent is picked up it triggers this function
       

       bot.dialog('ShowDetails', function (session) {//Acts a menu to provide user indication for Show Details
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
                   .title("See your securily kept personal details here")
                   .text("Looking to buy something and don't how much money you have? Want to see your existing detials? Here I can answer all of those questions")
                   .images([builder.CardImage.create(session, 'http://cmeimg-a.akamaihd.net/640/clsd/getty/c6957a8aa3ce499f9db087eabe1b697b')])
                   .buttons([
                    //Summarizes what the user can do here and gives the options as well
                       builder.CardAction.imBack(session, "Show my addresses", "Show my addresss"),                
                       builder.CardAction.imBack(session, "Show my emails", "Show my emails"),                
                       builder.CardAction.imBack(session, "Show my phone numbers", "Show my phone numbers"),                
                       builder.CardAction.imBack(session, "Show my bank balance", "Show my bank balance"),     
                       builder.CardAction.imBack(session, "show me all of my personal details", "Show all of my personal details"),                       
                       builder.CardAction.imBack(session, "I would like to modify or see my bank details", "Back"),
                   ]),
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'ShowDetails' });//When this intent is picked up it triggers this function

       bot.dialog('ModifyDetails', function (session) {//Acts a menu to provide user indication for Modify Details
        var msg = new builder.Message(session);
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
               //Summarizes what the user can do here and gives the options as well
                   .title("YOu can securily modify your personal details here")
                   .text("Want to delete of add personal detials to your account? Here I can do all of that for you")
                   .images([builder.CardImage.create(session, 'https://cdn.images.express.co.uk/img/dynamic/23/590x/secondary/banking-368205.jpg')])
                   .buttons([
                       builder.CardAction.imBack(session, "Delete details", "Delete details"),
                       builder.CardAction.imBack(session, "Add details", "Add details"),          
                       builder.CardAction.imBack(session, "I would like to modify or see my bank details", "Back"),
                       
                   ]),
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'ModifyDetails' });//When this intent is picked up it triggers this function

       bot.dialog('DeleteDetails', function (session) {//Acts a menu to provide user indication for Delete Details
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
               //Summarizes what the user can do here and gives the options as well
                   .title("Would you like me to delete your address or phone number")
                   .text("Want to delete existing detials? Here I can answer all of those questions just write down what you want me to delete(address or phone) Details will only deleted only if VALID USERNAME or VALID PASSWORD are entered")
                   .images([builder.CardImage.create(session, 'http://lrsus.com/wp-content/uploads/2014/05/lrs-blog5.jpg')])
         
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'DeleteDetails' });//When this intent is picked up it triggers this function

       bot.dialog('AddDetails', function (session) {//Acts a menu to provide user indication for Add Details
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
               //Summarizes what the user can do here and gives the options as well
                   .title("Here you can add your address or your phone number to your securily kept personal details")
                   .text("Want to add to your existing detials? Here I can answer all of those questions just write down what you want me to add(address or phone) Details will only added only if VALID USERNAME or VALID PASSWORD are entered")
                   .images([builder.CardImage.create(session, 'http://www.rcboat2006.com/wp-content/uploads/2017/03/sell-my-house-Portlands.jpg')])

           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'AddDetails' });//When this intent is picked up it triggers this function
    
       bot.dialog('OfficeHours', function (session) {//Tells the user what the office hours are
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
               //Provide heading, the times and an option to go back
               .title("Office Hours")
               .text("*We are closed on all public hoidays. Sorry for any inconvenience")
                   .images([builder.CardImage.create(session, 'http://assets.ecenglish.com/blogs/uploads/sites/23/2014/05/double-banking1.jpg')])
                   .buttons([
                       builder.CardAction.imBack(session, "Bank Information", "Back/ Bank Information"),

                   ]),
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'OfficeHours' });//When this intent is picked up it triggers this function
       
       
       bot.dialog('ContactUs', function (session) {//Gives the user information about the the different banks
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               //Tells user the locations and contact details of all banks
               new builder.HeroCard(session)
               .title("Auckland Contoso Bank Branch")
               .text("Address: 286 Mount Wellington Hwy, Mount Wellington, Auckland 1060\n\n Phone Number: 09-5782331\n\n Email Address: auckland@contoso.com")
                   .images([builder.CardImage.create(session, 'https://www.idfcbank.com/content/dam/idfc/image/about/hero-images/AboutUs.jpg')])
                ,
                   new builder.HeroCard(session)
                   .title("Hamilton Contoso Bank Branch")
                   .text("Address: 33 Lake Rd, Frankton, Waikato, Hamilton 3204 \n\n Phone Number: 07-4343543\n\n Email Address: hamilton@contoso.com")
    
                       .images([builder.CardImage.create(session, 'https://s.wsj.net/public/resources/images/BN-VC513_BOFABR_M_20170913165648.jpg')])
                ,new builder.HeroCard(session)
                .title("Christchurch Contoso Bank Branch")
                .text("Address: Hornby Mall 418 Main South Road Hornby Christchurch 8042 \n\n Phone Number: 03-9482123\n\n Email Address: christchurch@contoso.com")
                     .images([builder.CardImage.create(session, 'https://www.littleonline.com/uploads/project_media/bank-of-america-flagship/1.jpg')])
        
           ]);
           builder.Prompts.choice(session, "The locations below are all of our branches accross the New Zealand.\n\n But get excited because we will soon be opening near you!!", "Bank Information", { listStyle: builder.ListStyle.button });
           
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'ContactUs' });//When this intent is picked up it triggers this function
       

       bot.dialog('Transactions', function (session) {//Shows the user what the possible transactions are
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
                    //presents the user with all the
                    new builder.HeroCard(session)
                        .tap(new builder.CardAction.openUrl(session,'https://github.com/NZMSA/2017-AdvTraining'))
                        .title("Deposit money")
                        .text("Deposit money into your bank account by tapping on this card ")
                        .images([builder.CardImage.create(session, 'https://momactivity.com/wp-content/uploads/2016/01/bigstock-Couple-enjoying-online-shoppin-101247752.jpg')]),
        
                        new builder.HeroCard(session)
                        .tap(new builder.CardAction.openUrl(session,'https://github.com/NZMSA/2017-AdvTraining'))
                        .title("Withdraw money")
                        .text("Withdraw money from your bank account by tapping on this card ")
                        .images([builder.CardImage.create(session, 'https://cdn.gobankingrates.com/wp-content/uploads/citizens-bank-baby-boomers.jpg')]),
                        
                        new builder.HeroCard(session)
                        .tap(new builder.CardAction.openUrl(session,'https://github.com/NZMSA/2017-AdvTraining'))
                        .title("Transfer money")
                        .text("Transfer money into others bank account by tapping on this card ")
                        .images([builder.CardImage.create(session, 'http://www.ofzimba.co.zw/wp-content/uploads/2015/07/happy-lady-with-Zimbabwe-prepaid-card.jpg')]),
                        
                        new builder.HeroCard(session)
                        .tap(new builder.CardAction.openUrl(session,'https://github.com/NZMSA/2017-AdvTraining'))
                        .title("Change password or username or email")
                        .text("Change your password or username of your bank account by tapping on this card ")
                        .images([builder.CardImage.create(session, 'https://t4.ftcdn.net/jpg/01/80/49/23/240_F_180492372_KbxApISMzPFbklU6E49lwCZuwe8WSNMd.jpg')]),
        ]);
        builder.Prompts.choice(session, "Return:", "I would like to modify or see my bank details", { listStyle: builder.ListStyle.button });
        session.send(msg).endDialog();
        
    }).triggerAction({ matches: 'Transactions'});//When this intent is picked up it triggers this function
    

bot.dialog('WelcomeIntent', function (session) {//Provides a welcome screen for the user and suggest what they can do
       var msg = new builder.Message(session);
       msg.attachmentLayout(builder.AttachmentLayout.carousel)
       msg.attachments([
           new builder.HeroCard(session)
               .title("Welcome to Contoso Banking Bot!")
               //Summarizes what the user can do here and gives the options as well
               .text("I am here to help you with any banking needs. I hope that I can help you to achieve what you desire.", "Bank Information|Personal Details|Currency and Stock Exchange")
               .images([builder.CardImage.create(session, 'http://www.osh.co.ug/files/images/banking_finance20140208213346.jpg')])
               .buttons([
                   builder.CardAction.imBack(session, "I would like to modify or see my bank details", "Personal Details"),
                   builder.CardAction.imBack(session, "I would like information about the bank", "Bank Information"),                
                   builder.CardAction.imBack(session, "I would like information on Currency", "Currency Exchange"),
                   
               ]),
       ]);
       session.send(msg).endDialog();
   }).triggerAction({ matches: 'WelcomeIntent' });//When this intent is picked up it triggers this function
   

    

    bot.dialog('AddAddress', [//Adds address to users account addresses
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");//Asks user for username for safety
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.userData.username = results.response; //Stores username in username
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");//Asks user for password for safety
            
            session.userData.password = result.response;
            next();                        
                    },
                    function (session, result, next) {
                        
                        session.userData.password = result.response;//Stores password in to pasword
                        
                        session.send(session.userData.username);
                        
                        session.send(session.userData.password);

                        var addressEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'address');//finds the address in users response
                        
                        if (addressEntity) {//If the address is found, the address is added otherwise not
                            session.send('I have added \'%s\' to your account addresses', addressEntity.entity);
                            details.sendAddress(session, session.userData.username, session.userData.password, addressEntity.entity); // <-- LINE WE WANT
                        } else {
                            session.send("I am sorry I could not understand your request... please try again");
                            }
                        
                        next();
                    },
        function (session) {            
            // Tells the user what to do next
            builder.Prompts.choice(session, "Go back? or check if has been added?", "I would like to modify personal infromation|Show my addresses", { listStyle: builder.ListStyle.button });
            session.endDialog();
                    
        }

    ]).triggerAction({//When the following intent is picked up it triggers this function
        matches: 'AddAddress'
    });  

    bot.dialog('AddPhone', [//Adds phone number to users phone number
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");//Asks user for username for safety
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.userData.username = results.response; //Stores username into username
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");//Asks user for password for safety
            
            session.userData.password = result.response;//Stores password in password
            next();                        
                    },
                    function (session, result, next) {
                        
                        session.userData.password = result.response;
                        var phoneEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'Phone');//Finds phone number in users response
                        
                        if (phoneEntity) {//If the phonenumber is found, the phone number is added otherwise not
                            session.send('I have added \'%s\' to your account phone numbers', phoneEntity.entity);
                            food.sendPhone(session, session.conversationData["username"], session.conversationData["password"], phoneEntity.entity); // <-- LINE WE WANT
                        } else {
                            session.send("I am sorry I could not understand your request... please try again");
                            }
                        
                        next();
                    },
                   function (session) {
                    // Tells the user what to do next
                    builder.Prompts.choice(session, "Go back? or check if has been added?", "I would like to modify personal infromation|Show my phone numbers", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({//When the following intent is picked up it triggers this function
        matches: 'AddPhone'
    });  
 
   
    


    bot.dialog('QnA', [//This asks the user a question

        function (session, args, next) {
            session.dialogData.args = args || {};
        builder.Prompts.text(session, "What is your question?\n\n e.g. I don't remember my Customer ID, where can I find it?\n\nIs 4 digit passcode sign in secure?\n\nWhat is the minimum amount that a Term Deposit can be managed using Online Banking?\n\nWhen can I hide my accounts?\n\nHow do I change my password?\n\nAre there any fees and charges associated with Online Banking?\n\nWhat can I view in my transaction history?\n\nHow do I get my Online Banking password?)");//Asks the question
            
            
            
        },
        function (session, results, next) {
            qna.talkToQnA(session, results.response);//Responds to the question
            next();
            
        },
        function (session, results, next) {
            //Suugests what to do next
            builder.Prompts.choice(session, "Ask again? or go back?", "Question is|I would like information about the bank", { listStyle: builder.ListStyle.button });
            session.endDialog();
            
        }

        
    ]).triggerAction({//When this intent is picked up it triggers this dialog
        matches: 'QnA'
    });
    

  
bot.dialog('GetCurrency', [//Coverts currency
    function (session, args, next) {
        session.dialogData.args = args || {};        
        session.send("This convertor only operates for the most commonly used currencies: NZD, GBP, AUD, CAD,USD");  //Gives user indication of what they can do     
        builder.Prompts.text(session, "The amount you want to convert to:"); //Asks the user for the amount
            next(); // Skip if we already have this info.
    },
    function (session, result, next) {
        session.conversationData["amount"] = result.response;//Stores the amount in amount
            next();
            // <---- THIS LINE HERE IS WHAT WE NEED 
        
    },
    function (session, result, next) {
        builder.Prompts.text(session, "From which currency(e.g. AUD)?");//Asks the user from which currency they want to covert from
            next();
            // <---- THIS LINE HERE IS WHAT WE NEED 
    },
    function (session, result, next) {
        session.conversationData["currentcur"] = result.response;//Stores current currency
        builder.Prompts.text(session, "To which currency(e.g. AUD)?");//Asks the what currency they would like to covert to
        next();                        
    },
    function (session, result, next) {
        session.conversationData["nextcur"] = result.response;//Stores the current the user wants to covert to            
        session.send("Retrieving your rates");//Gives loading message
        currency.displayCurrency(session, session.conversationData["amount"],session.conversationData["currentcur"],session.conversationData["nextcur"]); //Shows the user the conversion
        next();
    },
    function (session) {     
        //Tells the user what they can do next                      
        builder.Prompts.choice(session, "Following this card is the response to your request:\n\n Go back:", "home", { listStyle: builder.ListStyle.button });
        session.endDialog();                
    }

]).triggerAction({
    matches: 'GetCurrency'//when this intent is picked up it triggers the function
});  

}





   


