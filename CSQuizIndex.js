// Created by Shawn Mitchell January 19, 2017

'use' strict';

var questions = [
    {
        "What is a linked list?": [
            "A structure that connects nodes to each other to form a list",
            "A structure that stores data based on its value",
            "A structure that connects multiple nodes to each other"
        ]
    },
    {
        "What is a max heap": [
            "A tree like structure that stores the greatest value at the head"
        ]
    }
  ];

//routes the incoming request based on type(launchRequest, IntentRequest)
exports.handler = function (event, context) {
  try{
    consoler.log("event.session.application.applicationID=" + event.session.application.applicationID);

    //need to input my skill's application ID
    if(event.session.application.applicationID !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
      context.fail("Invalid Application ID");
    }

    if(event.session.new){
      onSessionStarted({requestId: event.request.requestId}, event.session);
    }

    if(event.request.type === "LaunchRequest") {
      onLaunch(event.request,event.session,
        function callback(sessionAttributes,speechletResponse){
          context.succeed(buildResponse(sessionAttributes,speechletResponse));
        });
    }
    else if(event.request.type === "IntentRequest"){
      onIntent(event.request,event.session,
        function callback(sessionAttributes,speechletResponse){
          context.succeed(buildResponse(sessionAttributes,speechletResponse));
        });
    }
    else if(event.request.type === "SessionEndedRequest") {
      onSessionEnded(event.request, event.session);
      context.succeed();
    }

  }
  catch(e) {
    context.fail("Exception: " + e);
  }
};
