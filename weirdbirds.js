// Require libraries

const Improv = require('improv');
const yaml = require('js-yaml');
const fs = require('fs-jetpack');
// Load our data from a file
const grammarData = yaml.load(fs.read('grammar.yaml'));
// console.log(grammarData);

  var dryish = function() {
    var bonus = -1;

    return function (group) {
      if (!Array.isArray(group.tags)) return 0;
      if (group.tags.length === 0) return 0;
      var that = this;
      var result = group.tags.find(function (t) {
        // Return true if the tag is "novel".
        var found = that.tagHistory.find(function (u) {
          return u[0] === t[0];
        });
        return typeof found === 'undefined';
      });
      if (typeof result === 'undefined') return bonus;
      return 0;
    };
  };


  // Create a generator object from this data
const generator = new Improv(grammarData, {
    filters: [Improv.filters.mismatchFilter(), Improv.filters.unmentioned(1), dryish],
    reincorporate: true
});

const model = {};
// Generate text and print it out
var bird = generator.gen('root', model);
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
