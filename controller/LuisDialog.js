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
                        
                        session.send("Retrieving your Addresss...please wait");
                        
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
                        
                        session.send("Retrieving your Email(s)...please wait");
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my emails|Personal Information", { listStyle: builder.ListStyle.button });
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
                        
                        session.send("Retrieving your Phone number(s)... please wait");
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my phone numbers|Personal Information", { listStyle: builder.ListStyle.button });
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
                        
                        session.send("Retrieving your Account Balance... please wait");
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me my balance|Personal Information", { listStyle: builder.ListStyle.button });
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
                        
                        session.send("Retrieving your all of your details...please wait");
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following is the is the response:\n\n Would you like to reask it or go back", "Show me all details|Personal Information", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({
        matches: 'ShowAllDetails'
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
                            session.send("I am sorry I could not understand your request... please try again");
                            }
                        
                        next();
                    },
                   function (session) {
                    session.send('Done');                    
                    builder.Prompts.choice(session, "Following this card is the response to your request:\n\n Go back:", "Delete Details", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({
        matches: 'DeleteAddress'
    });  

    bot.dialog('DeletePhone', [
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
                        var phoneEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'Phone');
                        
                                    // Checks if the food entity was found
                        if (phoneEntity) {
                            session.send('Deleting \'%s\'...', phoneEntity.entity);
                            details.deletePhone(session,session.conversationData['username'],session.conversationData["password"],phoneEntity.entity); //<--- CALLL WE WANT
                        } else {
                            session.send("I am sorry I could not understand your request... please try again");
                            }
                        
                        next();
                    },
                   function (session) {
                    session.send('Done');                                        
                    builder.Prompts.choice(session, "Following this card is the response to your request:\n\n Go back:", "Delete Details", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({
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
            .images([builder.CardImage.create(session, 'http://www.htmlcsscolor.com/preview/gallery/0079D6.png')])
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
                       builder.CardAction.imBack(session, "I would like to modify or see my bank details", "Back"),
                       
                       
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
                   .images([builder.CardImage.create(session, 'https://cdn.images.express.co.uk/img/dynamic/23/590x/secondary/banking-368205.jpg')])
                   .buttons([
                       builder.CardAction.imBack(session, "Delete details", "Delete details"),
                       builder.CardAction.imBack(session, "Add details", "Add details"),          
                       builder.CardAction.imBack(session, "I would like to modify or see my bank details", "Back"),
                       
                   ]),
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'ModifyDetails' });

       bot.dialog('DeleteDetails', function (session) {
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
                   .title("Would you like me to delete your address or phone number")
                   .text("Want to delete existing detials? Here I can answer all of those questions just write down what you want me to delete(address or phone) Details will only deleted only if VALID USERNAME or VALID PASSWORD are entered")
                   .images([builder.CardImage.create(session, 'http://lrsus.com/wp-content/uploads/2014/05/lrs-blog5.jpg')])
         
           ]);
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'DeleteDetails' });

       bot.dialog('AddDetails', function (session) {
        
           
           var msg = new builder.Message(session);
           msg.attachmentLayout(builder.AttachmentLayout.carousel)
           msg.attachments([
               new builder.HeroCard(session)
                   .title("Here you can add your address or your phone number to your securily kept personal details")
                   .text("Want to add to your existing detials? Here I can answer all of those questions just write down what you want me to add(address or phone) Details will only added only if VALID USERNAME or VALID PASSWORD are entered")
                   .images([builder.CardImage.create(session, 'http://www.rcboat2006.com/wp-content/uploads/2017/03/sell-my-house-Portlands.jpg')])

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
           builder.Prompts.choice(session, "The locations below are all of our branches accross the New Zealand.\n\n But get excited because we will soon be opening near you!!", "Bank Information", { listStyle: builder.ListStyle.button });
           
           session.send(msg).endDialog();
       }).triggerAction({ matches: 'ContactUs' });

       bot.dialog('Transactions', function (session) {
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
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
        
    }).triggerAction({ matches: 'Transactions'});


    

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
                            session.send('I have added \'%s\' to your account addresses', addressEntity.entity);
                            details.sendAddress(session, session.conversationData["username"], session.conversationData["password"], addressEntity.entity); // <-- LINE WE WANT
                        } else {
                            session.send("I am sorry I could not understand your request... please try again");
                            }
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following this card is the response to your request:\n\n Go back:", "Delete Details", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
        }

    ]).triggerAction({
        matches: 'AddAddress'
    });  

    bot.dialog('AddPhone', [
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
                        var phoneEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'Phone');
                        
                                    // Checks if the food entity was found
                        if (phoneEntity) {
                            session.send('I have added \'%s\' to your account phone numbers', phoneEntity.entity);
                            food.sendPhone(session, session.conversationData["username"], session.conversationData["password"], phoneEntity.entity); // <-- LINE WE WANT
                        } else {
                            session.send("I am sorry I could not understand your request... please try again");
                            }
                        
                        next();
                    },
                   function (session) {
                                   
                    builder.Prompts.choice(session, "Following this card is the response to your request:\n\n Go back:", "Delete Details", { listStyle: builder.ListStyle.button });
                    session.endDialog();
                    
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