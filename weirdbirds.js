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
      var birds = [];
       // Generate text and print it out
       for(var i =0; i < 20; i++){

       birds.push(generator.gen('root', model));
       console.log(birds[i]);
       console.log(" ");
     }
      //  console.log(model);
