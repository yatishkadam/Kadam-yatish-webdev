var app =require("../../express");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
var widgetModel = require("../models/widget/widget.model.server");

var widgets=[
    { "_id": "123", "index": 0,  "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "index": 1,  "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "index": 2,  "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "index": 3,  "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "index": 4,  "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "index": 5,  "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "index": 6,  "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.get("/api/page/:pageId/widget",findWidgetsByPageId);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/api/widget/:widgetId",updateWidget);
app.get("/api/widget/:widgetId",findWidgetById);
app.delete("/api/widget/:widgetId",deleteWidget);
app.post("/api/page/:pageId/widget",createWidget);
app.get("/api/page/:pageId/reorderWidgets",reorderWidgets);
//app.put   ('/api/page/:pageId/widget', updateWidgetOrder);

function findWidgetsByPageId(req,res) {
    var pageId = req.params.pageId;
    var results=[];
    for (var w in widgets){
        if(pageId===widgets[w].pageId){
            results.push(widgets[w]);
        }
    }
    results=results.sort(function (w1,w2) {
        return w1.index>w2.index;
    });
    res.json(results);
}

function createWidget(req,res) {
    var widget=req.body;
    var pageId=req.params.pageId;
    widget._page=pageId;
    widgetModel.findAllWidgetsForPage(pageId).then(function (results) {
        console.log(results);
        widget.index =results.length;
        console.log("________________________________________widget ______________________________________");
        console.log(widget);
        widgetModel.createWidget(widget)
            .then(
                function (widget) {
                    console.log("________return_____________");
                    console.log(widget);
                    res.json(widget._id);
                }
            );
    });
}

function findWidgetById(req,res) {
    var widgetId=req.params.widgetId;
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            console.log("_____find WidgetById_________");
            console.log(widget);
            res.json(widget);
        });
    // for (var w in widgets){
    //     if(widgetId===widgets[w]._id){
    //         res.json(widgets[w]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function deleteWidget(req,res) {
    var widgetId=req.params.widgetId;
    for (var w in widgets){
        if (widgetId===widgets[w]._id){
            widgets.splice(w,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWidget(req,res) {
    var widgetId = req.params.widgetId;
    var newWidget = req.body;
    widgetModel.updateWidget(widgetId,newWidget)
        .then(function (status) {
            res.sendStatus(200);
        });
    // for (var w in widgets) {
    //     if (widgetId === widgets[w]._id) {
    //         widgets[w] = newWidget;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}
function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    for (var w in widgets){
        if (widgetId===widgets[w]._id){
            var widget = widgets[w];
        }
    }
    widget.url = '/assignment/uploads/'+filename;

    var callbackUrl= "/assignment/#!/user/"+userId+"/websites/"+websiteId+"/pages/"+pageId+"/widget";

    res.redirect(callbackUrl);
}
function reorderWidgets(req,res) {
    var pageId= req.params.pageId;
    var start=req.query.from;
    var end=req.query.to;
    if (start&&end){
        var widgetList =findWidgetsByPage(pageId);
        if (start>end){
            i=parseInt(end);
            while(i<=start){
                if (i == start)
                    widgetList[start].index=end;
                else
                    widgetList[i].index+=1;
                i+=1;
            }
            res.sendStatus(200);
            return;
        }
        else if(end>start){
            i=parseInt(start);
            while(i<=end){
                if (i == start)
                    widgetList[start].index=end;
                else
                    widgetList[i].index-=1;
                i+=1;
            }
            res.sendStatus(200);
            return;
        }
        else if(end===start)
        {
            end=start;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


//helper functions

function findWidgetsByPage(pageId){
    widgetModel.findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        });
    // var results=[];
    // for (var w in widgets){
    //     if(pageId===widgets[w].pageId){
    //         results.push(widgets[w]);
    //     }
    // }
    // results=results.sort(function (w1,w2) {
    //     return w1.index>w2.index;
    // });
    // for (var i in results){
    //     results[i].index=i;
    // }
    // return results;
}
