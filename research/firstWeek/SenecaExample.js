/*

Seneca lets you build a microservices system without worrying about production.
Everything external to business logic is hidden behind microservices.

Transport Independence:
send messages between services in many ways, all hidden from business logic

Pattern Matching:
instead of the world having to find out what type of service you are requesting,
you just let the world know what sort of messages you care about.
or you can just send your messages out into the world, and we dont care which
services receive them.

These messages between Seneca and the world are JSON documents.
To send messages with Seneca, they can be sent via HTTP/S, TCP or any mechanism
that moves bits around. And as the writer of the service that sends messages, 
you just send messages out into the world. You don't know which services receive
them.

For messages that you would like to receive, you specificy the property patterns
that you care about, and Seneca makes sure you get any messages sent by other
services that match those patterns. The patterns are a list of key-value pairs
that match the top-level properties of the JSON document.



*/

var seneca = require('seneca')()

//adds a new action to the seneca instance
seneca.add( 
  {role:'math', cmd:'sum'}, 
  function( msg, respond ) {
    var sum = msg.left + msg.right
    respond( null, { answer: sum } )
  })

seneca.act( 
  {role:'math', cmd:'sum', left:1, right:2}, 
  function( err, result ) {
    if( err ) return console.error( err )
    console.log( result )
  })
















