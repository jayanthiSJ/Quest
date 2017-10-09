let getNeo4jDriver = require('../config/neo4j');
let fs = require('fs');

function createLexiconFiles(result) {

  let intentTerms = result.records[0]._fields[0].sort();
  let keywords = result.records[0]._fields[1].sort();
  fs.writeFile(__dirname + '/intentLexicon.json', JSON.stringify(intentTerms), 'utf8');
  fs.writeFile(__dirname + '/keywordLexicon.json',JSON.stringify(keywords), 'utf8')
}
module.exports = function() {
  /* query to get all concept words, types and intents */
  let query = `MATCH (m:QuestionIntent) with collect(m.value) as intent match (k:Keywords) with COLLECT(distinct k.name) as keyword,intent as intent
    RETURN DISTINCT (intent),keyword`;

  let session = getNeo4jDriver.session();
  session.run(query).then(function(result) {
    // Completed!
    session.close();
    createLexiconFiles(result);
  }).catch(function(error) {
    console.log(error);
  });
};
