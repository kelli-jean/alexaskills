// This is based off of the tutorial: https://github.com/alexa/skill-sample-nodejs-fact

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Turo Facts';
const GET_FACT_MESSAGE = ["Here's your fact: ", "Here's something interesting: ", "Here's some trivia: "];
const HELP_MESSAGE = 'You can say tell me a fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const CONTACT_SUPPORT_MESSAGE = 'Hello Hello! If you have questions, please take a look at support.turo.com for answers to frequently asked questions. If you are in the US, you can call customer support at 1-866-735-2901. To e-mail Turo, or if you are outside of the US, please visit support.turo.com.'
const BOOK_INSTANTLY_MESSAGE = 'You can find your instant book settings at the top of the page under the “Trip preferences” section on your car’s page. Use the checkbox to turn instant book on or off at locations where your car is available. Travelers will be able to book your car without your confirmation at locations where instant book is enabled. Instant book can be turned on for all locations or, if you prefer, at only specific locations where your car is listed. For more information, go to support.turo.com'

//=========================================================================================================================================
// These facts come from Turo.com and http://www.mdd-europe.com/50-f1-facts/
//=========================================================================================================================================
const data = [
    'Choose from thousands of unique cars for rent by local hosts on Turo.',
    'Turo is not your typical rental car company. Bypass the rental counter and rent unforgettable cars from friendly locals.',
    'With Turo, choose from over 800 unique makes and models, from affordable daily drivers to rare specialty cars.',
    'Pick up your Turo or get it delivered, wherever you need it, up to 35% less than traditional agencies.',
    'On Turo, choose from thousands of cars in over 4,700 cities and 300+ airports across the US, Canada, and the UK.',
    'Make a dent in your monthly car payments - on average, Turo hosts can cover their payments by renting out their cars just nine days per month.',
    'The Sun is an almost perfect sphere. This is not a Turo fact, just a fun fact that seems kind of obvious.',
    'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event. Something that is not rare is renting better cars on Turo.',
    'Every entering F1 driver with the surname of, Hill, has won a championship. That is an interesting fact, and did you know that on Turo you can rent the perfect car?',
    'Thirty three different drivers have won the Formula 1 Championship with Michael Schumacher still holding the record for the most titles. Be Schumacher great and rent better cars on Turo',
];

//=========================================================================================================================================
// Handlers
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit(':responseReady');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        const messageArr = GET_FACT_MESSAGE;
        const messageIndex = Math.floor(Math.random() * messageArr.length);
        const randomMessage = messageArr[messageIndex];

        const speechOutput = randomMessage + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'ContactSupport': function () {
        const speechOutput = CONTACT_SUPPORT_MESSAGE;

        this.response.cardRenderer(SKILL_NAME, CONTACT_SUPPORT_MESSAGE);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'InstantBook': function() {
        const speechOutput = BOOK_INSTANTLY_MESSAGE;

        this.response.cardRenderer(SKILL_NAME, BOOK_INSTANTLY_MESSAGE);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};
