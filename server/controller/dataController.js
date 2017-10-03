let driver = require('../config/neo4j.js');
let session = driver.session();

module.exports={
addQuestion: function(req, res) {
        console.log("hiiiiii");
        var title = req.body.title;
        var description = req.body.queArray;
                      let query = 'unwind '+description+' as ques \
                      match C=(n:Topic)\
                       where n.name ="'+title+'"\
                       OPTIONAL MATCH path=(n:Topic {name:"'+title+'"})<-[r:Concpt_Of]-(m:Concept{name:"'+ques+'"})  return path,C';
                      session.run(query).then(function(result1){
                          console.log(JSON.stringify(result1));
                          res.send(JSON.stringify(result1));
                      });
              },
              addAnswer:function(req, res) {
                      console.log("ADD addAnswer");
                      res.send("dd");
              },
              getQuestions:function(req, res) {
                      if(req.params.name == 'topquestions'){
                        console.log("hiiiiii top questions");
                        let query = 'match (n:Question)<-[r:follows]-(:User)\
                                     with n,count(r) as follow_count,id(n) as qid optional match (n)-[:posted_by]->(u:User)\
                                     with n,follow_count,qid,u as postedBy optional match (n)<-[a:answer_of]-(:Answer)\
                                     return n,follow_count,qid,postedBy,count(a) as answer_count order by follow_count desc'
                        session.run(query).then(function(data){
                          console.log(JSON.stringify(data));
                            var result=data.records.map((row,index)=> {
                                return ({question :row._fields[0].properties.value,followcount:row._fields[1].low,questionid:row._fields[2].low,postedBy:row._fields[3].properties.name,answercount:row._fields[4].low});
                        });
                        console.log(result);
                        res.send(result);
                      });
                      }
                      else if(req.params.name == 'latestquestions'){
                        console.log("hiiiiii latest questions");
                        let query = 'match (n:Question)\
                                            return n';
                        session.run(query).then(function(result1){
                            console.log(JSON.stringify(result1));
                            res.send({result :result1});
                        });
                      }
                      else{
                        console.log("hiiiiii unanswerd questions");
                        let query = 'MATCH (n:Question)\
                                    WHERE NOT (n)<-[:answer_of]-()\
                                    optional match (n:Question)<-[r:follows]-()\
                                    RETURN n,count(r) as follow_count';
                        session.run(query).then(function(result1){
                            console.log(JSON.stringify(result1));
                            res.send({result :result1});
                        });
                      }
              },
              getSearch:function(req, res) {
                     console.log("hiiiiii getsearch");
                      sw = require('stopword');
                      var searchValue = req.body.searchValue;
                      console.log(searchValue);
                      const oldString = searchValue.split(' ');
                      const keyword = sw.removeStopwords(oldString);
                      console.log(keyword);

                      const params = {
                        "keywords" : keyword,
                        "intent" : ['what','when','can you say something','define','where','why','how','who','explain','difference','distinguish']
                      }

                      let query = 'MATCH (k:Keywords)<-[:Question_of]-(q:Question)-[:intent]-(i:QuestionIntent)\
                                      , (q)-[:answer_of]-(a:Answer) where k.name in {keywords} and i.value in {intent} return q, a';
                      session.run(query,params).then(function(data){

                        var result ;
                        if(data.records == ''){
                            result = "No results!!!!!"
                        }
                        else{
                          result=data.records.map((row,index)=> {
                              return ({answer :row._fields[1].properties.value});
                            });
                          }
                        console.log(result);
                        res.send(result);
                      });
             },
               getTopAnswered:function(req, res) {
                      console.log("hiiiiii topanswered");
                      if(req.params.name == 'topquestions'){
                        console.log("hiiiiii top questions");
                        let query = 'match (n:Question)-[r:follows]-()\
                                    return n, count(r) as rel_count\
                                    order by rel_count desc limit 50'
                        session.run(query).then(function(result1){
                            console.log(JSON.stringify(result1));
                            res.send({result :result1});
                        });
                      }
              },

              getAnswer:function(req,res){
                console.log("qid:"+req.params.questionid);
                var qid = req.params.questionid;
                let query = `match (a:Answer)-[:answer_of]->(n:Question) where id(n)=${qid}\
                              with a  match (a)-[:answered_by]->(u:User)\
                              with a,u optional match(a)<-[l:likes]-(:User)\
                              with a,u,count(l) as likes optional  match(a)<-[d:dislikes]-(:User)\
                              return a,u,likes,count(d) as dislikes`;

                session.run(query).then(function(data){
                  var result ;
                  if(data.records == ''){
                      result = "No answers!!!!!"
                  }
                  else{
                    result=data.records.map((row,index)=> {
                        return ({answer :row._fields[0].properties.value,answered_by:row._fields[1].properties.name,likes:row._fields[2].low,dislikes:row._fields[3].low});
                      });
                    }
                      res.send(result);
                });
              },

              addFollow:function(req,res){
                console.log(req.params.questionid);
                var qid = req.params.questionid;
                let query = 'match (a:Answer)-[:answer_of]->(n:Question) where id(n)=${qid}\
                              with a match (a)-[:answered_by]->(u:User)\
                              with a,u optional match(a)<-[l:likes]-(:User)\
                              with a,u,count(l) as likes optional  match(a)<-[d:dislikes]-(:User)\
                              return a,u,likes,count(d) as dislikes'

                session.run(query,params).then(function(data){
                  console.log(JSON.stringify(data));
                    var result=data.records.map((row,index)=> {
                        return ({answer :row._fields[0].properties.value,answered_by:row._fields[1].properties.name,likes:row._fields[2].low,dislikes:row._fields[3].low});
                      });
                      console.log(result);
                      res.send(result);
                });
                  res.send("follow");

              }

  };
