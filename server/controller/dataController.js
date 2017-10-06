let driver = require('../config/neo4j.js');
let session = driver.session();
let intentLexicon = require('../lexicon/intentLexicon.json');

module.exports = {
  addQuestion: function(req, res) {
    sw = require('stopword');
    var searchValue = req.body.searchValue;
    var title = req.body.title;
    var user = req.body.user;
    console.log(searchValue);
    const oldString = searchValue.split(' ');
    const keyword = sw.removeStopwords(oldString);
    console.log(keyword);
    let intent = [];

    for (let i = 0; i < oldString.length; i = i + 1) {
      for (let m = 0; m < intentLexicon.length; m = m + 1) {
        let splitIntent = intentLexicon[m].split(' ');
        if (splitIntent[0] === oldString[i]) {
          let intentPhraseLength = 1;
          for (let n = 1; n < splitIntent.length && i + 1 < oldString.length; n = n + 1) {
            if (oldString[i + n] === splitIntent[n]) {
              intentPhraseLength = intentPhraseLength + 1;
            } else {
              break;
            }
          }
          if (intentPhraseLength === splitIntent.length) {
            intent = splitIntent;
          }
        }
      }
    }
    const params = {
      "keywords": keyword,
      "intent": intent
    }

    let query = `unwind ${JSON.stringify(intent)} as ques_intent\
                match (:QuestionIntent{value:ques_intent})-[:same_as]->(baseintent:QuestionIntent) with distinct collect(baseintent.value) as intent\
                MATCH (k:Keywords)<-[:Question_of]-(q:Question)-[:intent]->(i:QuestionIntent), (q)<-[:answer_of]-(a:Answer)-[:answered_by]->(u:User)\
              where k.name in {keywords} and i.value in intent\
              optional match (q)<-[:answer_of]-(a)<-[l:likes]-(:User)\
              optional match (q)<-[:answer_of]-(a)<-[d:dislikes]-(:User)  return a,u,count(l) as likes,count(d) as dislikes`;
    session.run(query, params).then(function(data) {
      var result;
      if (data.records == '') {
        let query = `merge (u:User{name:"${user}"})\
                                merge (q:Question{value:"${searchValue} "})\
                                merge (u)<-[:posted_by]-(q) \
                                merge (m:Keywords{name:"${title}"})\
                                merge (n:Topic{name:"React"})\
                                merge (m)-[r:keyword_of]->(n)\
                                merge (q)-[:Question_of]->(m)\
                                merge (qi:QuestionIntent{value:"${params.intent}"})\
                                merge (q)-[:intent]->(qi)\
                                return q`;
        session.run(query).then(function(result1) {
          res.send("Question posted");
        });
      } else {
        result = data.records.map((row, index) => {
          return ({
            answer: row._fields[0].properties.value,
            answered_by: row._fields[1].properties.name,
            likes: row._fields[2].low,
            dislikes: row._fields[3].low
          });
        });
        res.send(result);
      }

    });
  },
  addAnswer: function(req, res) {
    var qid = req.params.questionid;
    var answer = req.body.answer;
    var user = req.body.user;
    console.log(user);
    console.log(answer);
    console.log(qid);
    let query = `match (u:User{name:"${user}"}),(q:Question) where id(q)=${qid}\
                            merge(a:Answer{value:"${answer}"})
                             merge (u)<-[:answered_by]-(a)-[:answer_of]->(q) return q,a`;
    session.run(query).then(function(data) {
      res.send(data);
    });
  },
  getQuestions: function(req, res) {
    if (req.params.name == 'topquestions') {
      let query = 'match (n:Question)<-[r:follows]-(:User)\
                                     with n,count(r) as follow_count,id(n) as qid optional match (n)-[:posted_by]->(u:User)\
                                     with n,follow_count,qid,u as postedBy optional match (n)<-[a:answer_of]-(:Answer)\
                                     return n,follow_count,qid,postedBy,count(a) as answer_count order by follow_count desc'
      session.run(query).then(function(data) {
        var result = data.records.map((row, index) => {
          return ({
            question: row._fields[0].properties.value,
            followcount: row._fields[1].low,
            questionid: row._fields[2].low,
            postedBy: row._fields[3].properties.name,
            answercount: row._fields[4].low
          });
        });
        res.send(result);
      });
    } else if (req.params.name == 'latestquestions') {
      let query = `match (n:Question)-[:posted_by]->(u:User)\
                   with n,u as postedBy ,id(n) as qid optional match (n)-[f:follows]->(u:User)\
                   with n,count(f) as follow_count,qid,postedBy optional match (n)<-[a:answer_of]-(:Answer)\
                   return n,follow_count,qid,postedBy,count(a) as answer_count,n.asked_at as time order by time desc`;
      session.run(query).then(function(data) {
        console.log(JSON.stringify(data));
        var result = data.records.map((row, index) => {
          return ({
            question: row._fields[0].properties.value,
            followcount: row._fields[1].low,
            questionid: row._fields[2].low,
            postedBy: row._fields[3].properties.name,
            answercount: row._fields[4].low,
            time:row._fields[5].low
          });
        });
        res.send(result);
      });
    } else if (req.params.name == 'topAnswered') {
      let query = `match (q:Question)<-[c:answer_of]-(a:Answer)<-[r:likes]-(:User)\
                   with q,count(r) as likes,count(c) as answer_count,id(q) as qid optional match (q)-[:posted_by]->(u:User)\
                   with q,likes,answer_count,qid,u as postedBy optional match (q)<-[f:follows]-(:User)\
                   return q,likes,answer_count,qid,postedBy,count(f) as follow_count order by likes desc`;
      session.run(query).then(function(data) {
        var result = data.records.map((row, index) => {
          return ({
            question: row._fields[0].properties.value,
            answercount: row._fields[2].low,
            questionid: row._fields[3].low,
            postedBy: row._fields[4].properties.name,
            followcount: row._fields[5].low,
          });
        });
        res.send(result);
      });
    }

    else {
      let query = `MATCH (n:Question) WHERE NOT (n)<-[:answer_of]-(:Answer)\
                   with n,id(n) as qid optional match (n)-[:posted_by]->(u:User)\
                   with n,qid,u as postedBy optional match (n)<-[a:follows]-(:User)\
                   return n,qid,postedBy,count(a) as follow_count`;
      session.run(query).then(function(data) {
        console.log(JSON.stringify(data));
        var result = data.records.map((row, index) => {
          return ({
            question: row._fields[0].properties.value,
            questionid: row._fields[1].low,
            postedBy: row._fields[2].properties.name,
            followcount: row._fields[3].low
          });
        });
        res.send(result);
      });
    }
  },
  getSearch: function(req, res) {
    console.log("hiiiiii getsearch");
    sw = require('stopword');
    var searchValue = req.body.searchValue;
    console.log(searchValue);
    const oldString = searchValue.split(' ');
    const keyword = sw.removeStopwords(oldString);
    console.log(keyword);
    let intent = [];

    for (let i = 0; i < oldString.length; i = i + 1) {
      for (let m = 0; m < intentLexicon.length; m = m + 1) {
        let splitIntent = intentLexicon[m].split(' ');
        if (splitIntent[0] === oldString[i]) {
          let intentPhraseLength = 1;
          for (let n = 1; n < splitIntent.length && i + 1 < oldString.length; n = n + 1) {
            if (oldString[i + n] === splitIntent[n]) {
              intentPhraseLength = intentPhraseLength + 1;
            } else {
              break;
            }
          }
          if (intentPhraseLength === splitIntent.length) {
            intent = splitIntent;
          }
        }
      }
    }

    console.log(intent);


    const params = {
      "keywords": keyword,
      "intent": intent
    }

    let query = `unwind ${JSON.stringify(intent)} as ques_intent\
                                    match (:QuestionIntent{value:ques_intent})-[:same_as]->(baseintent:QuestionIntent) with distinct collect(baseintent.value) as intent\
                                    MATCH (k:Keywords)<-[:Question_of]-(q:Question)-[:intent]->(i:QuestionIntent), (q)<-[:answer_of]-(a:Answer)-[:answered_by]->(u:User)\
                                  where k.name in {keywords} and i.value in intent\
                                  optional match (q)<-[:answer_of]-(a)<-[l:likes]-(:User)\
                                  optional match (q)<-[:answer_of]-(a)<-[d:dislikes]-(:User)  return a,u,count(l) as likes,count(d) as dislikes`;
    session.run(query, params).then(function(data) {
      var result;
      if (data.records == '') {
        result = "No answers!!!!!"
      } else {
        result = data.records.map((row, index) => {
          return ({
            answer: row._fields[0].properties.value,
            answered_by: row._fields[1].properties.name,
            likes: row._fields[2].low,
            dislikes: row._fields[3].low
          });
        });
      }
      res.send(result);
      console.log(result);
    });
  },
  getTopAnswered: function(req, res) {
    console.log("hiiiiii topanswered");
    if (req.params.name == 'topquestions') {
      console.log("hiiiiii top questions");
      let query = 'match (n:Question)-[r:follows]-()\
                                    return n, count(r) as rel_count\
                                    order by rel_count desc limit 50'
      session.run(query).then(function(result1) {
        console.log(JSON.stringify(result1));
        res.send({
          result: result1
        });
      });
    }
  },

  getAnswer: function(req, res) {
    console.log("qid:" + req.params.questionid);
    var qid = req.params.questionid;
    let query = `match (a:Answer)-[:answer_of]->(n:Question) where id(n)=${qid}\
                              with a  match (a)-[:answered_by]->(u:User)\
                              with a,u optional match(a)<-[l:likes]-(:User)\
                              with a,u,count(l) as likes optional  match(a)<-[d:dislikes]-(:User)\
                              return a,u,likes,count(d) as dislikes`;

    session.run(query).then(function(data) {
      var result;
      if (data.records == '') {
        result = "No answers!!!!!"
      } else {
        result = data.records.map((row, index) => {
          return ({
            answer: row._fields[0].properties.value,
            answered_by: row._fields[1].properties.name,
            likes: row._fields[2].low,
            dislikes: row._fields[3].low
          });
        });
      }
      res.send(result);
    });
  },

  addFollow: function(req, res) {
    console.log(req.params.questionid);
    var qid = req.params.questionid;
    var user = req.body.user;
    let query = `match (q:Question {id:${qid}}),(u:User {name:"${user}"})\
                             WHERE NOT (q)<-[:follows]-(u)\
                             merge(q)<-[:follows]-(u) return u`;
    session.run(query).then(function(data) {
      res.send(data);
    });

  }

};
