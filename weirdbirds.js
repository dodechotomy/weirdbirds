// Require libraries

const Improv = require('improv');
const yaml = require('js-yaml');
const fs = require('fs-jetpack');
// Load our data from a file
const grammarData = yaml.load(fs.read('grammar.yaml'));
// console.log(grammarData);
// Create a generator object from this data
const generator = new Improv(grammarData, {
    filters: [Improv.filters.mismatchFilter(), Improv.filters.unmentioned(2)],
    reincorporate: true
});

const model = {};
// Generate text and print it out
var bird = generator.gen('root', model);
console.log(bird);

//  console.log(model);

//Creating Twitter App
//Callback functions
var error = function(err, response, body) {
    console.log('ERROR [%s]', err);
        console.log(body);
};
var success = function(data) {
    console.log('Data [%s]', data);
};

var Twitter = require('twitter-node-client').Twitter;


// make a directory in the root folder of your project called data
// copy the node_modules/twitter-node-client/twitter_config file over into data/twitter_config`
// Open `data/twitter_config` and supply your applications `consumerKey`, 'consumerSecret', 'accessToken', 'accessTokenSecret', 'callBackUrl' to the appropriate fields in your data/twitter_config file

var config = process.env;
var twitter = new Twitter(config);
twitter.postTweet(bird, error, success);
