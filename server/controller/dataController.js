let driver = require('../config/neo4j.js');
let session = driver.session();

module.exports={
addQuestion: function(req, res) {
        console.log("hiiiiii");
        var title = req.body.title;
        var description = req.body.description;
                  var arr1 = [];
                  var ss1 ;
                    splitdescription = (description) =>{
                    arr1 = req.body.description.split(" ");
                    arr1.map(function(ss1){
                      console.log(ss1);
                      let query = 'match C=(n:Topic)\
                       where n.name ="'+title+'"\
                       OPTIONAL MATCH path=(n:Topic {name:"'+title+'"})<-[r:Concpt_Of]-(m:Concept{name:"'+ss1+'"})  return path,C';
                      session.run(query).then(function(result1){
                          console.log(JSON.stringify(result1));
                          res.send(JSON.stringify(result1));
                      });
                    });
                }
                splitdescription(description);
              },
              addAnswer:function(req, res) {
                      console.log("ADD addAnswer");
                      res.send("ädd");
              },
              getTopQuestions:function(req, res) {
                      console.log("hiiiiii top questions");
                        res.send("ädd");
              },
              getSearch:function(req, res) {
                      console.log("hiiiiii getsearch");
                        res.send("ädd");
              },
              getUnAnswered:function(req, res) {
                      console.log("hiiiiii unanswered");
                        res.send("ädd");
              },
               getLatestQuestions:function(req, res) {
                      console.log("hiiiiii latestquestion");
                        res.send("ädd");
              },
               getTopAnswered:function(req, res) {
                      console.log("hiiiiii topanswered");
                        res.send("ädd");
              }

  };
