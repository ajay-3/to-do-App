var express = require('express');
var bodyParser = require("body-parser");
var tasks = require('./Data/todo');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port',(process.env.PORT||3000));

app.get("/",(req,res)=>{
    res.json("Hi there welcome to app");
})
app.post('/addtodo',(req,res)=>{
    res.json({"text":"200"});
    // // console.log("A addtoDo request has been request remotely");
    // // console.log(req.body);
    //  var newTask = req.body.text;
    //  tasks.push(newTask);
    //  let data = {
    //     "blocks": [
    //         {
    //             "type": "section",
	// 		    "fields":[{
    //                     "type": "plain_text",
    //                     "text": "ADDED TODO for \" "  + req.body.text + "\""
    //                 }
    //             ]
    //         }
    //     ]};
    //  res.json(data);
});

app.post('/marktodo', (req,res)=>{
    console.log("this is before sending response");
    console.log("A marktodo request has been request remotely");
    res.sendStatus(200);
    console.log(req.body);
     var deletetask = req.body.text;
     if(indexof(deletetask)){
        tasks.splice(indexof(deletetask),1);
        let data = {
            "blocks": [
                {
                    "type": "section",
                    "fields":[{
                            "type": "plain_text",
                            "text": "Removed TODO for \" "  + req.body.text + "\""
                        }]
                }
            ]};
        res.json(data)
     }else{
        let data={
            "blocks":[
                {
                    "type" : "section",
                    "fields" : [{
                        "type" : "plain_text",
                        "text" : "Please enter proper To-do item"
                    }]
                }
            ]
        }
        res.json(data)
     }
});

app.get('/listtodos',async (req,res)=> {
    try{ 
    console.log("the list has been called remotely");
    if(tasks.length){
      var string = tasks.join("\n");
      let data={
       "blocks":[
           {
               "type" : "section",
               "fields" : [{
                   "type" : "plain_text",
                   "text" : {
                       "type":"mrkdwn",
                        "text":string
                      } 
               }]
           }
          ]
          }
          res.json(data);
         }else{
          let data={
              "blocks":[
                  {
                      "type" : "section",
                      "fields" : [{
                          "type" : "plain_text",
                          "text" : "NO TODOS"
                      }]
                  }
                 ]};
                res.json(data);
          }}catch(error){
              res.json({"text":error});
          };
    }
   );

app.listen(app.get('port'), ()=> {
  console.log('Server is running at',app.get('port'));
});