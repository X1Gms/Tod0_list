import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

var today = [];
var work = [];

mongoose.connect("");

const task = new mongoose.Schema({
    name:String,
})

const Task = mongoose.model("DayTasks",task);
const Work = mongoose.model("WorkTasks",task);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }))



app.get("/",(req,res)=>{
    Task.find().exec()
    .then((task)=>{
        res.render("index.ejs",{today: task});
        })
    .catch((e)=> {
        console.log(e);
    })
});

app.post("/submit",(req,res)=>{
    if(req.body["item"]){
    const item = new Task({
        name: req.body["item"],
    });

    item.save();

    }
    res.redirect("/");

});

app.get("/work",(req,res)=>{
    Work.find().exec().then((work)=>{
        res.render("work.ejs",{work: work});
    })
    .catch((e)=>{
        console.log(e);
    })
    
});

app.post("/submitw",(req,res)=>{
    if(req.body["item"]){
        const item = new Work({
            name: req.body["item"],
        });
    
        item.save();
    
    }
    res.redirect("/work");

});

app.post("/delete",(req,res)=>{
   Task.findByIdAndRemove(req.body.check).exec();
   res.redirect("/");
})

app.post("/deletew",(req,res)=>{
    Work.findByIdAndRemove(req.body.check).exec();
    res.redirect("/work");
 })


app.listen(port,()=>{
    console.log(`Running Server on port ${port}`);
});