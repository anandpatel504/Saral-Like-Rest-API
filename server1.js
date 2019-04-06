

var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(express.json())

// task-1

app.get('/courses', function(req, res){
    fs.readFile( __dirname + "/" + "courses.json", function(err, data){
        return res.json(data)
        // res.send(data)
    })
})

// task-2 

app.post('/courses', function(req, res){
    courses = req.body
    console.log(courses)
    fs.readFile( __dirname + "/" + "courses.json", function(err, data){
        if (err){
            res.send("check your json file");
        }else{
            data = JSON.parse(data);
            courses['id'] = data.length + 1
            data.push(courses);
            var myJSON = JSON.stringify(data);
            fs.writeFile( __dirname + "/" + "courses.json", myJSON, function(err, data){
                res.send(courses)
                return res.json("sucess")
                // console.log("sucess");
            });
        }
    })
})


// task-3

 app.get('/courses/:id', function(req, res){

    var id = req.params.id
    console.log(id)

     fs.readFile( __dirname + "/" + "/courses.json", function (err, data){
        
        var data = JSON.parse(data);
    
        for (i of data){
            if (i["id"] == id){
                var good = true;
                break
            }else{
                var bad = false;
            }
            } 
            if (good == true){
                return res.json(i);
            }
            else if (bad == false){
                return res.json({"errorMsg":"di gayi courseId ko check karo galat hai"})  
        }
     });
 })
 
//  task-4

app.put('/courses/:id', function(req, res){
    fs.readFile(__dirname + "/courses.json",(err, data)=>{

        var data1 = JSON.parse(data);
        for (var i of data1){

            if(i['id'] === parseInt(req.params.id)){
                if(i.hasOwnProperty("name") == req.body.hasOwnProperty("name")){
                    i["name"] = req.body["name"];
                }
                if (i.hasOwnProperty("description") == req.body.hasOwnProperty("description")){
                    i["description"] = req.body["description"];
                }
            }
        }
        console.log(data1)
        var myJSON = JSON.stringify(data1);
        fs.writeFile( __dirname + "/courses.json", myJSON, function (err, data){
            return res.json(data1[parseInt(req.params.id)-1])

        });

    });
})

// task-5

app.get('/courses/:id/exercise', function(req,res){
    
    var data=fs.readFileSync(__dirname+"/courses.json");
    var courses=JSON.parse(data)
    var userDetails=courses[req.params.id-1].exercise;
    return res.json(userDetails);

});


// task-6

app.post('/courses/:id/exercise',(req,res)=>{
    var exercises={
        courseId:req.params.id,
        name:req.body.name,
        content:req.body.content,
        hint:req.body.hint
    }
    var data=fs.readFileSync(__dirname + "/courses.json");
    data=data.toString();
    var courses=JSON.parse(data)
    exercises.id=courses[req.params.id-1].exercise.length+1;
    courses[req.params.id-1].exercise.push(exercises)
    fs.writeFileSync('courses.json',JSON.stringify(courses,null,2));
    return res.json(courses);

});

// task-7

app.get('/courses/:id/exercise/:Id',(req,res)=>{
    fs.readFile(__dirname + "/courses.json",(err,data)=>{
        var courses=JSON.parse(data);
        var userDetails=courses[req.params.id-1].exercise[req.params.Id-1];
        return res.json(userDetails);
    })
});

// task-8

app.put('/courses/:id/exercise/:Id',(req,res)=>{
    fs.readFile(__dirname + '/courses.json',(err,data)=>{
        var courses = JSON.parse(data);
        // console.log(courses)
        var userDetails = courses[req.params.id-1].exercise[req.params.Id-1];
        if(userDetails.hasOwnProperty('name')){
            userDetails.name=req.body.name;
        }
        if(userDetails.hasOwnProperty('hint')){
            userDetails.hint = 
            req.body.hint;
        }
        fs.writeFileSync('courses.json',JSON.stringify(courses,null,2));
        return res.json(courses);
    });
});

// task-9

app.get('/courses/:id/exercise/:Id/submissions',(req,res)=>{
    fs.readFile(__dirname + '/courses.json',(err,data)=>{
        var courses = JSON.parse(data);
        var userDetails=courses[req.params.id-1].exercise[req.params.Id-1];
        if(userDetails.hasOwnProperty('submission')){
            return res.json(userDetails.submission)
        }
        else{
            courses[req.params.id-1].exercise[req.params.Id-1].submission=[];
            fs.writeFileSync('courses.json',JSON.stringify(courses,null,2))
            return res.json(courses)
        }
        
    });
});

// task-10

app.post('/courses/:id/exercise/:Id/submissions', (req,res)=>{
    var submission = {
        courseId:req.params.id,
        exerciseId:req.params.Id,
        content:req.body.content,
        userName:req.body.userName
    }
    var data = fs.readFileSync(__dirname + "courses.json");
    data=data.toString();
    var courses = JSON.parse(data)
    exercises.id=courses[req.params.id-1].exercise.length+1;
    courses[req.params.id-1].submission.push(exercises);

    
    fs.readFile('/courses.json',JSON.stringify(courses,null,2))
        return res.json(courses)
    
})



var server = app.listen(4075, function(){
    var host = server.address().address
    var port = server.address().port
    console.log(host, port)
})
    
  
