// Require libraries
const Improv = require('improv');
const yaml = require('js-yaml');
const fs = require('fs-jetpack');

// Load our data from a file
const grammarData = yaml.load(fs.read('grammar.yaml'));

// Instantiates a new generator from the grammar, and returns a generated bird.
function generateBird() {
  // Create a generator object from this data
  const generator = new Improv(grammarData, {
    filters: [Improv.filters.mismatchFilter(), Improv.filters.unmentioned()],
    reincorporate: true
  });

  const model = {};
  // Generate text and print it out
  try {
    var bird = generator.gen('root', model).trim();
  } catch (e) {
    console.log(model);
    throw e;
  }

  // Hacks to clean up some grammar
  bird = bird.replace(/\s+/g, " ");
  bird = bird.replace(" the an ", " the ");
  bird = bird.replace(" the a ", " the ");
  bird = bird.replace(" its an ", " its ");
  bird = bird.replace(" its a ", " its ");
  bird = bird.replace(" a u", " an u");
  bird = bird.replace(" .", ".");

  return bird;

}
// check for environment needed to post to twitter. If it's missing, just do a test generation of 10 birds
if (!process.env.hasOwnProperty("consumerKey")) {
  for (let i = 0; i < 10; i++) {
    console.log(generateBird());
  }
} else {
  var Twitter = require('twitter');

  var config = {
    consumer_key: process.env.consumerKey,
    consumer_secret: process.env.consumerSecret,
    access_token_key: process.env.accessToken,
    access_token_secret: process.env.accessTokenSecret
  };
  var client = new Twitter(config);
  var bird = generateBird()
  console.log(bird);
  client.post('statuses/update', { status: bird}, function (error, tweet, response) {
    if (error) throw error;
    // console.log(tweet);  // Tweet body.
    // console.log(response);  // Raw response object.
  }
  );
}

