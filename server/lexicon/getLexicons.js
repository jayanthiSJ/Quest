let getNeo4jDriver = require('../config/neo4j');
let fs = require('fs');

function createLexiconFiles(result) {

  let intentTerms = result.records[0]._fields[0].sort();
  fs.writeFile(__dirname + '/intentLexicon.json', JSON.stringify(intentTerms), 'utf8');
}
module.exports = function() {
  /* query to get all concept words, types and intents */
  let query = `MATCH (m:QuestionIntent) with collect(m.value) as intent
    RETURN DISTINCT(intent)`;

  let session = getNeo4jDriver.session();
  session.run(query).then(function(result) {
    // Completed!
    session.close();
    createLexiconFiles(result);
  }).catch(function(error) {
    console.log(error);
  });
};
