// Require libraries

const Improv = require('improv');
const yaml = require('js-yaml');
const fs = require('fs-jetpack');
// Load our data from a file
const grammarData = yaml.load(fs.read('grammar.yaml'));
// console.log(grammarData);

  // Create a generator object from this data
const generator = new Improv(grammarData, {
    filters: [Improv.filters.mismatchFilter(), Improv.filters.unmentioned()],
    reincorporate: true
});

const model = {};
// Generate text and print it out
var bird = generator.gen('root', model).trim();
bird = bird.replace("  ", " ");
bird = bird.replace(" the an", " the");
bird = bird.replace(" the a", " the");
bird = bird.replace(" its an", " its");
bird = bird.replace(" its a", " its");
console.log(bird);


var Twitter = require('twitter');

var config = {
  consumer_key: process.env.consumerKey,
  consumer_secret: process.env.consumerSecret,
  access_token_key: process.env.accessToken,
  access_token_secret: process.env.accessTokenSecret
};
var client = new Twitter(config);
client.post('statuses/update', {status: bird},  function(error, tweet, response) {
  if(error) throw error;
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
