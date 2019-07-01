// nodejs- express framwork :
// (https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm)


var express = require("express");
var fs = require("fs");
var app = express();
var bodyparser = require("body-parser");

app.use(express.json());

// list of all newcourses
app.get("/newcourses", (req, res)=>{
    fs.readFile(__dirname + "/courses.json", (err, data)=>{
        var mydata = JSON.parse(data)
        res.send(mydata);
    })
})

// create new newcourse
app.post("/newcourses", (req, res)=>{
    var courses = req.body;
    // console.log(newcourses);
    fs.readFile(__dirname + "/courses.json", (err, data)=>{
        if (err){
            res.send({"err": "check your json file"})
        }else{
            var mydata = JSON.parse(data);
            var courses = {
                name: req.body.name,
                description: req.body.description,
            }
            courses.id = mydata.length + 1;
            mydata.push(courses);
            console.log(mydata);
            var newJSON = JSON.stringify;
            fs.writeFile(__dirname + "/courses.json",newJSON(mydata,null,2))
                // res.send(newcourses)
                return res.json(courses)
                console.log("data successfull")
        }
    })
})

// get course details by id
app.get("/newcourses/:id", (req, res)=>{
    var id = req.params.id;
    console.log(id);
    fs.readFile(__dirname + "/courses.json", (err, data)=>{
        var mydata = JSON.parse(data);
        for (var i of mydata){
            if (i.id == id){
                var good = true;
                break;
            }else{
                var bad = false;
            }
        }if (good == true){
            return res.json(i);
        }else{
            return ({"err": "check your json file"})
        }
    })
})

// edit a course by id
app.put("/newcourses/:id", (req, res)=>{
    fs.readFile(__dirname + "/courses.json", (err, data)=>{
        var mydata = JSON.parse(data);
        for (let i of mydata){
            if (i["id"] == req.params.id){
                if (i.name = req.body.hasOwnProperty("name")){
                    i.name = req.body.name;
                }
                if (i.description = req.body.hasOwnProperty("description")){
                    i.description = req.body.description;
                }
            }
        }
        console.log(mydata);
        fs.writeFile(__dirname + "/courses.json",JSON.stringify(mydata,null,2))
            return res.json(mydata[req.params.id-1]);   

    })
})

// get exercises of a course
app.get("/newcourses/:id/exercises", (req, res)=>{
    fs.readFile(__dirname + "/exercises.json", (err, data)=>{
        if (err){
            return ({"ErrorMsg": "check your json file"});
        }else{
            var mydata = JSON.parse(data);
            var userDetails = mydata[req.params.id-1].exercises;
            return res.json(userDetails);
        }
    })
})

// create exercise of newcourse
app.post("/newcourses/:id/exercises", (req, res)=>{
    fs.readFile(__dirname + "/exercises.json", (err, data)=>{
        if (err){
            console.log({"Error": "chek your json file"});
        }else{
            var mydata = JSON.parse(data);
            var exercises = {
                courseId:req.params.id,
                name:req.body.name,
                content:req.body.content,
                hint:req.body.hint
            }
            exercises.id = mydata[req.params.id-1].exercises.length+1;
            mydata[req.params.id-1].exercises.push(exercises)
            // console.log(mydata);
            fs.writeFile('exercises.json',JSON.stringify(mydata,null,2));
            return res.json(mydata);
            console.log("successfully");
        }
    })
})

// get exercise by Id
app.get("/newcourses/:id/exercises/:Id", (req, res)=>{
    fs.readFile(__dirname + "/exercises.json", (err, data)=>{
        if (err){
            return res.send({"Error": "check your json file"});
        }else{
            var mydata = JSON.parse(data);
            if(req.params.Id > mydata[req.params.id-1].exercises.length){
            return res.send({"Error": "This content is not available in your JSON."})
        } else{
            console.log(mydata);
            var userDetails = mydata[req.params.id-1].exercises[req.params.Id-1];
            return res.json(userDetails);
        }
        }
    })
})

// edit exercise by id
app.put("/newcourses/:id/exercises/:Id", (req, res)=>{
    fs.readFile(__dirname + "/exercises.json", (err, data)=>{
        if (err){
            return res.send({"Error": "check your json file"});
        }else{
            var mydata = JSON.parse(data);
            var userDetails = mydata[req.params.id-1].exercises[req.params.Id-1];
            if (userDetails.hasOwnProperty("name")){
                userDetails.name = req.body.name;
            }
            if (userDetails.hasOwnProperty("hint")){
                userDetails.hint = req.body.hint;
            }
        }
        fs.writeFile(__dirname + "/exercises.json", JSON.stringify(mydata,null,2))
            return res.send(mydata);
            console.log("successfully");
    })
})

// get submissions of an exercise
app.get("/newcourses/:id/exercises/:Id/submissions", (req, res)=>{
    fs.readFile(__dirname + "/submissions.json", (err, data)=>{
        if (err){
            return res.send({"ErrorMsg": "check your json file"});
        }else{
            var mydata = JSON.parse(data);
            // console.log(mydata);
            var userDetails = mydata[req.params.id-1].exercises[req.params.Id-1];
            if (userDetails.hasOwnProperty("submissions")){
                // userDetails.submissions = req.body.submissions;
                return res.json(userDetails.submissions);
            }else{
                mydata[req.params.id-1].exercises[req.params.Id-1].submissions=[];
                fs.writeFileSync(__dirname + "/submissions.json", JSON.stringify(mydata,null,2))
                    return res.json(mydata);
                    console.log("succesfull");
            }
        }
    })
})

// create submissions of an exercise
app.post("/newcourses/:id/exercises/:Id/submissions", (req, res)=>{
    fs.readFile(__dirname + "/submissions.json", (err, data)=>{
        if (err){
            return res.send({"ErrorMsg": "check your json file"});
        }else{
            var mydata = JSON.parse(data);
            var submissions = {
                courseId: req.params.id,
                exerciseId: req.params.Id,
                content: req.body.content,
                userName: req.body.userName
            }
            submissions.id = mydata[req.params.id-1].exercises[req.params.Id-1].submissions.length+1;
            mydata[req.params.id-1].exercises[req.params.Id-1].submissions.push(submissions);
            console.log(mydata);
            fs.writeFile(__dirname + "/submissions.json", JSON.stringify(mydata,null,2))
                return res.send(mydata);
                console.log("successfull");
        }
    })
})

var server = app.listen(3032)
console.log("sucess");
