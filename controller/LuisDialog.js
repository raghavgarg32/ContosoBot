var builder = require('botbuilder');
var food = require("./ModifyDetails");
var details = require("./ModifyDetails");
var restaurant = require('./RestaurantCard');
var nutrition = require('./NutritionCard');
var qna = require('./QnAMaker');
var correctlogin = require("./ModifyDetails");

// Some sections have been omitted
var isAttachment = false;


exports.startDialog = function (bot) {
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/a60b1df0-f068-4d7d-8dd1-87b95d1bb02c?subscription-key=c2def163238d4646a900f56a275998bc&verbose=true&timezoneOffset=0&q=');
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/57455a20-6e38-4154-ba15-991b714afd9a?subscription-key=92739006b7e04eada749df2c8ffed87b&verbose=true&timezoneOffset=0&q=	');
    
    bot.recognizer(recognizer);

    bot.dialog('GetCalories', function (session, args) {
        //if (!isAttachment(session)) {

            // Pulls out the food entity from the session if it exists
            var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'food');

            // Checks if the for entity was found
            if (foodEntity) {
                session.send('Calculating calories in %s...', foodEntity.entity);
                nutrition.displayNutritionCards(foodEntity.entity, session);

            } else {
                session.send("I was unable to understand your request... Please try again");
            }
        //}
    }).triggerAction({
        matches: 'GetCalories'
    });

    bot.dialog('GetFavouriteFood', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Enter a password to setup your account.");
            
            session.conversationData["password"] = result.response;
            next();                        
                    },
                    function (session, result, next) {
              
                        session.conversationData["password"] = result.response;
                        food.displayFavouriteFood(session, session.conversationData["username"], session.conversationData["password"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
                        
                        session.send("Retrieving your favourite foods");
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my account balance|Back", { listStyle: builder.ListStyle.button });
                                              
        }

    ]).triggerAction({
        matches: 'GetFavouriteFood'
    });

  
    bot.dialog('ShowAddress', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.conversationData["username"] = results.response;
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");
            
            session.conversationData["password"] = result.response;
            next();                        
                    },
                    function (session, result, next) {
              
                        session.conversationData["password"] = result.response;
                        details.displayAddress(session, session.conversationData["username"], session.conversationData["password"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
                        
                        session.send("Retrieving your Addresss");
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my address|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({
        matches: 'ShowAddress'
    });    

    bot.dialog('ShowEmail', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.conversationData["username"] = results.response;
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");
            
            session.conversationData["password"] = result.response;
            next();                        
                    },
                    function (session, result, next) {
              
                        session.conversationData["password"] = result.response;
                        details.displayEmail(session, session.conversationData["username"], session.conversationData["password"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
                        
                        session.send("Retrieving your Email(s)");
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my address|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({
        matches: 'ShowEmail'
    });    
  
    bot.dialog('ShowPhone', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.conversationData["username"] = results.response;
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");
            
            session.conversationData["password"] = result.response;
            next();                        
                    },
                    function (session, result, next) {
              
                        session.conversationData["password"] = result.response;
                        details.displayPhone(session, session.conversationData["username"], session.conversationData["password"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
                        
                        session.send("Retrieving your Phone number(s)");
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my address|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({
        matches: 'ShowPhone'
    });   

    bot.dialog('ShowBalance', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.conversationData["username"] = results.response;
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");
            
            session.conversationData["password"] = result.response;
            next();                        
                    },
                    function (session, result, next) {
              
                        session.conversationData["password"] = result.response;
                        details.displayBalance(session, session.conversationData["username"], session.conversationData["password"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
                        
                        session.send("Retrieving your Account Balance)");
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my address|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({
        matches: 'ShowBalance'
    });   
    
    bot.dialog('ShowAllDetails', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.conversationData["username"] = results.response;
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");
            
            session.conversationData["password"] = result.response;
            next();                        
                    },
                    function (session, result, next) {
              
                        session.conversationData["password"] = result.response;
                        details.displayAllDetails(session, session.conversationData["username"], session.conversationData["password"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
                        
                        session.send("Retrieving your all of your details)");
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my address|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({
        matches: 'ShowAllDetails'
    });   
    
    

  bot.dialog('DeleteFavourite', [
        function (session, args, next) {
            session.dialogData.args = args || {};
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results,next) {
            
            //Add this code in otherwise your username will not work.
            if (results.response) {
                session.conversationData["username"] = results.response;
            }

            session.send("You want to delete one of your favourite foods.");

            // Pulls out the food entity from the session if it exists
            var foodEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'food');

            // Checks if the for entity was found
            if (foodEntity) {
                session.send('Deleting \'%s\'...', foodEntity.entity);
                food.deleteFavouriteFood(session,session.conversationData['username'],foodEntity.entity); //<--- CALLL WE WANT
            } else {
                session.send("No food identified! Please try again");
            }
        

    }]).triggerAction({
        matches: 'DeleteFavourite'
    });


    bot.dialog('DeleteAddress', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.conversationData["username"] = results.response;
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");
            
            session.conversationData["password"] = result.response;
            next();                        
                    },
                    function (session, result, next) {
                        
                        session.conversationData["password"] = result.response;
                        var addressEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'address');
                        
                                    // Checks if the food entity was found
                        if (addressEntity) {
                            session.send('Deleting \'%s\'...', addressEntity.entity);
                            details.deleteAddress(session,session.conversationData['username'],session.conversationData["password"],addressEntity.entity); //<--- CALLL WE WANT
                        } else {
                            session.send("No food identified!!!");
                            }
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my address|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({
        matches: 'DeleteAddress'
    });  
    bot.dialog('DeleteEmail', [
        function (session, args, next) {
            session.dialogData.args = args || {};
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results,next) {
            
            //Add this code in otherwise your username will not work.
            if (results.response) {
                session.conversationData["username"] = results.response;
            }

            session.send("You want to delete one of your favourite foods.");

            // Pulls out the food entity from the session if it exists
            var foodEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'food');

            // Checks if the for entity was found
            if (foodEntity) {
                session.send('Deleting \'%s\'...', foodEntity.entity);
                food.deleteFavouriteFood(session,session.conversationData['username'],foodEntity.entity); //<--- CALLL WE WANT
            } else {
                session.send("No food identified! Please try again");
            }
        

    }]).triggerAction({
        matches: 'DeleteEmail'
    });
    bot.dialog('DeletePhone', [
        function (session, args, next) {
            session.dialogData.args = args || {};
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results,next) {
            
            //Add this code in otherwise your username will not work.
            if (results.response) {
                session.conversationData["username"] = results.response;
            }

            session.send("You want to delete one of your favourite foods.");

            // Pulls out the food entity from the session if it exists
            var foodEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'food');

            // Checks if the for entity was found
            if (foodEntity) {
                session.send('Deleting \'%s\'...', foodEntity.entity);
                food.deleteFavouriteFood(session,session.conversationData['username'],foodEntity.entity); //<--- CALLL WE WANT
            } else {
                session.send("No food identified! Please try again");
            }
        

    }]).triggerAction({
        matches: 'DeletePhone'
    });



    bot.dialog('WantFood', function (session, args) {
        
                //if (!isAttachment(session)) {
                    // Pulls out the food entity from the session if it exists
                    var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'food');
        
                    // Checks if the for entity was found
                    if (foodEntity) {
                        session.send('Looking for restaurants which sell %s...', foodEntity.entity);
                        restaurant.displayRestaurantCards(foodEntity.entity, "auckland", session);
                    } else {
                        session.send("No food identified! Please try again");
                    }
                //}
        
            }).triggerAction({
                matches: 'WantFood'
            });

 // Add dialog to return list of shirts available
bot.dialog('WelcomeIntent', function (session) {
 
    
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel)
    msg.attachments([
        new builder.HeroCard(session)
            .title("Welcome to Contoso Banking Bot!")
            .text("I am here to help you with any banking needs. I hope that I can help you to achieve what you desire.", "Bank Information|Personal Details|Currency and Stock Exchange")
            .images([builder.CardImage.create(session, 'http://cdn.marketplaceimages.windowsphone.com/v8/images/6e04c950-e28a-46fc-bc83-fe244d8a9de9?imageType=ws_icon_large')])
            .buttons([
                builder.CardAction.imBack(session, "I would like to modify or see my bank details", "Personal Details"),
                builder.CardAction.imBack(session, "I would like information about the bank", "Bank Information"),                
                builder.CardAction.imBack(session, "I would like information  on Currency and Stock Exchange", "Currency and Stock Exchange"),
                
            ]),
    ]);
    session.send(msg).endDialog();
}).triggerAction({ matches: 'WelcomeIntent' });

    bot.dialog('BankInformation', function (session) {
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
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
       }).triggerAction({ matches: 'BankInformation' });

       bot.dialog('PersonalDetails', function (session) {
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
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
       }).triggerAction({ matches: 'PersonalDetails' });

       bot.dialog('ShowDetails', function (session) {
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
                   .title("See your securily kept personal details here")
                   .text("Looking to buy something and don't how much money you have? Want to see your existing detials? Here I can answer all of those questions")
                   .images([builder.CardImage.create(session, 'http://cmeimg-a.akamaihd.net/640/clsd/getty/c6957a8aa3ce499f9db087eabe1b697b')])
                   .buttons([
                       builder.CardAction.imBack(session, "Show my addresss", "Show my addresss"),                
                       builder.CardAction.imBack(session, "Show my emails", "Show my emails"),                
                       builder.CardAction.imBack(session, "Show my phone numbers", "Show my phone numbers"),                
                       builder.CardAction.imBack(session, "Show my bank balance", "Show my bank balance"),     
                       builder.CardAction.imBack(session, "show me all of my personal details", "Show all of my personal details"),                       
                       builder.CardAction.imBack(session, "I would like to see my personal information", "Back"),
                       
                       
                   ]),
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'ShowDetails' });

       bot.dialog('ModifyDetails', function (session) {
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
                   .title("YOu can securily modify your personal details here")
                   .text("Want to delete of add personal detials to your account? Here I can do all of that for you")
                   .images([builder.CardImage.create(session, 'http://3mkm08kox71vtynw1b1wbtpab.wpengine.netdna-cdn.com/wp-content/uploads/2017/02/GettyImages-117455512.jpg')])
                   .buttons([
                       builder.CardAction.imBack(session, "Delete details", "Delete details"),
                       builder.CardAction.imBack(session, "Add details", "Add details"),                             
                   ]),
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'ModifyDetails' });

       bot.dialog('DeleteDetails', function (session) {
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
                   .title("Here you can delete your securily kept personal details")
                   .text("Want to delete existing detials? Here I can answer all of those questions")
                   .images([builder.CardImage.create(session, 'http://3mkm08kox71vtynw1b1wbtpab.wpengine.netdna-cdn.com/wp-content/uploads/2017/02/GettyImages-117455512.jpg')])
                   .buttons([
                       builder.CardAction.imBack(session, "Delete my addresss", "Delete my addresss"),                
                       builder.CardAction.imBack(session, "Delete my emails", "Delete my emails"),                
                       builder.CardAction.imBack(session, "Delete my phone numbers", "Delete my phone numbers"),                
                       
                   ]),
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'DeleteDetails' });

       bot.dialog('AddDetails', function (session) {
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
                   .title("Here you can add to your securily kept personal details")
                   .text("Want to add to your existing detials? Here I can answer all of those questions")
                   .images([builder.CardImage.create(session, 'http://3mkm08kox71vtynw1b1wbtpab.wpengine.netdna-cdn.com/wp-content/uploads/2017/02/GettyImages-117455512.jpg')])
                   .buttons([
                       builder.CardAction.imBack(session, "Add my addresss", "Add my addresss"),                
                       builder.CardAction.imBack(session, "Add my emails", "Add my emails"),                
                       builder.CardAction.imBack(session, "Add my phone numbers", "Add my phone numbers"),                
                       
                   ]),
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'AddDetails' });
    
       bot.dialog('OfficeHours', function (session) {
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
               .title("Office Hours")
               .text("*We are closed on all public hoidays. Sorry for any inconvenience")
                   .images([builder.CardImage.create(session, 'http://www.drmac.co.nz/wp-content/uploads/2012/06/Office-Hours-2017.png')])
                   .buttons([
                       builder.CardAction.imBack(session, "Bank Information", "Back/ Bank Information"),

                   ]),
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'OfficeHours' });
       
       bot.dialog('ContactUs', function (session) {
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
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
           session.send(msg).endDialog();
           builder.Prompts.choice(session, "The locations above are all of our branches accross the New Zealand.\n\n But get excited because we will soon be opening near you!!", "Bank Information", { listStyle: builder.ListStyle.button });
       }).triggerAction({ matches: 'ContactUs' });

       bot.dialog('Transactions', function (session) {
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .tap(new builder.CardAction.openUrl(session,'https://github.com/NZMSA/2017-AdvTraining'))
                .title("Deposit money")
                .text("Deposit money into your bank account by tapping on this card ")
                .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/whiteshirt.png')]),
 
                new builder.HeroCard(session)
                .tap(new builder.CardAction.openUrl(session,'https://github.com/NZMSA/2017-AdvTraining'))
                .title("Withdraw money")
                .text("Withdraw money from your bank account by tapping on this card ")
                .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/whiteshirt.png')]),
                
                new builder.HeroCard(session)
                .tap(new builder.CardAction.openUrl(session,'https://github.com/NZMSA/2017-AdvTraining'))
                .title("Transfer money")
                .text("Transfer money into others bank account by tapping on this card ")
                .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/whiteshirt.png')]),
                
                new builder.HeroCard(session)
                .tap(new builder.CardAction.openUrl(session,'https://github.com/NZMSA/2017-AdvTraining'))
                .title("Change password or username")
                .text("Change your password or username of your bank account by tapping on this card ")
                .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/whiteshirt.png')]),
        ]);
        session.send(msg).endDialog();
    }).triggerAction({ matches: 'Transactions'});


    bot.dialog('LookForFavourite', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
        

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }
                // Pulls out the food entity from the session if it exists
                var foodEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'food');
    
                // Checks if the food entity was found
                if (foodEntity) {
                    session.send('Thanks for telling me that \'%s\' is your favourite food', foodEntity.entity);
                    food.sendFavouriteFood(session, session.conversationData["username"], foodEntity.entity); // <-- LINE WE WANT
    
                } else {
                    session.send("No food identified!!!");
                }
            }
        
    ]).triggerAction({
        matches: 'LookForFavourite'
    });

    bot.dialog('AddAddress', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.conversationData["username"] = results.response;
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");
            
            session.conversationData["password"] = result.response;
            next();                        
                    },
                    function (session, result, next) {
                        
                        session.conversationData["password"] = result.response;
                        var addressEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'address');
                        
                                    // Checks if the food entity was found
                        if (addressEntity) {
                            session.send('Thanks for telling me that \'%s\' is your favourite food', addressEntity.entity);
                            food.sendAddress(session, session.conversationData["username"], session.conversationData["password"], addressEntity.entity); // <-- LINE WE WANT
                        } else {
                            session.send("No food identified!!!");
                            }
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my address|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({
        matches: 'AddAddress'
    });  

    
    bot.dialog('AddEmail', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
                builder.Prompts.text(session, "Please enter the username of your account:");
                
                next(); // Skip if we already have this info.
        
        },
        function (session, results, next) {
                    session.conversationData["username"] = results.response;
            
                
                next()
                // <---- THIS LINE HERE IS WHAT WE NEED 
            
        },
        function (session, result, next) {
            builder.Prompts.text(session, "Please enter the password of your account:");
            
            session.conversationData["password"] = result.response;
            next();                        
                    },
                    function (session, result, next) {
                        
                        session.conversationData["password"] = result.response;
                        var emailEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'Email');
                        
                                    // Checks if the food entity was found
                        if (emailEntity) {
                            session.send('Thanks for telling me that \'%s\' is your favourite food', emailEntity.entity);
                            food.sendEmail(session, session.conversationData["username"], session.conversationData["password"], emailEntity.entity); // <-- LINE WE WANT
                        } else {
                            session.send("No food identified!!!");
                            }
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my address|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({
        matches: 'AddEmail'
    });  

    
   
    
    bot.dialog('AddPhone', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
        

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }
                // Pulls out the food entity from the session if it exists
                var foodEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'food');
    
                // Checks if the food entity was found
                if (foodEntity) {
                    session.send('Thanks for telling me that \'%s\' is your favourite food', foodEntity.entity);
                    food.sendFavouriteFood(session, session.conversationData["username"], foodEntity.entity); // <-- LINE WE WANT
    
                } else {
                    session.send("No food identified!!!");
                }
            }
        
    ]).triggerAction({
        matches: 'AddPhone'
    });

    bot.dialog('QnA', [

        function (session, args, next) {
            session.dialogData.args = args || {};
            builder.Prompts.text(session, "What is your question?\n\n (Type 'Bank information' to return back or\n\n 'Question' to ask another question \n\nafter the question has been responded too)");
            
            
            
        },
        function (session, results, next) {
            qna.talkToQnA(session, results.response);
            next();
            
        },

        
    ]).triggerAction({
        matches: 'QnA'
    });
    

}