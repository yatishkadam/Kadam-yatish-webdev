var app =require("../../express");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
var widgetModel = require("../models/widget/widget.model.server");

app.get("/api/page/:pageId/widget",findWidgetsByPageId);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/api/widget/:widgetId",updateWidget);
app.get("/api/widget/:widgetId",findWidgetById);
app.delete("/api/widget/:widgetId",deleteWidget);
app.post("/api/page/:pageId/widget",createWidget);
app.get("/api/page/:pageId/reorderWidgets",reorderWidgets);

function findWidgetsByPageId(req,res) {
    var pageId = req.params.pageId;
    var results=[];
    widgetModel.findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            //console.log("__________findWidgetsByPageId__________");
            //console.log(widgets);
            res.json(widgets);
        });
}

function createWidget(req,res) {
    var widget=req.body;
    var pageId=req.params.pageId;
    widget._page=pageId;
    widgetModel.findAllWidgetsForPage(pageId).then(function (results) {
        //console.log(results);
        widget.index =results.length;
        //console.log("________________________________________widget ______________________________________");
        //console.log(widget);
        widgetModel.createWidget(widget)
            .then(
                function (widget) {
                    //console.log("________return_____________");
                    //console.log(widget);
                    res.json(widget._id);
                }
            );
    });
}

function findWidgetById(req,res) {
    var widgetId=req.params.widgetId;
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            //console.log("_____find WidgetById_________");
            //console.log(widget);
            res.json(widget);
        });
}

function deleteWidget(req,res) {
    var widgetId=req.params.widgetId;
    widgetModel.deleteWidget(widgetId)
        .then(function(status){
        res.sendStatus(200);
    });
}

function updateWidget(req,res) {
    var widgetId = req.params.widgetId;
    var newWidget = req.body;
    widgetModel.updateWidget(widgetId,newWidget)
        .then(function (status) {
            res.sendStatus(200);
        });
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

    widget=widgetModel.findWidgetById(widgetId);
    widget.url = '/assignment/uploads/'+filename;
    console.log(widget.url);
    widgetModel.updateWidget(widgetId,widget)
        .then(function(){
            var callbackUrl= "/assignment/#!/user/"+userId+"/websites/"+websiteId+"/pages/"+pageId+"/widget";
            res.redirect(callbackUrl);
        });
}


function reorderWidgets(req,res) {
    //console.log("____________ reorderwidgets _____________");
    var pageId = req.params.pageId;
    var start = req.query.from;
    var end = req.query.to;
    if (start && end) {
        widgetModel.reorderwidgets(pageId, start, end)
            .then(function () {
                res.sendStatus(200);
            });
    }
}
//         widgetModel.findAllWidgetsForPage(pageId)
//             .then(function (widgets) {
//                 var widgetList =widgets;
//                 if (start>end){
//                     console.log("____________ start>>>end _____________");
//                     i=parseInt(end);
//                     while(i<=start){
//                         if (i == start)
//                             widgetList[start].index=end;
//                         else
//                             widgetList[i].index+=1;
//                         i+=1;
//                     }
//                     updateWidgetList(widgetList)
//                         .then(function () {
//                             res.sendStatus(200);
//                         });
//                 }
//                 else if(end>start){
//                     console.log("____________ end>>>start _____________");
//                     i=parseInt(start);
//                     while(i<=end){
//                         if (i == start)
//                             widgetList[start].index=end;
//                         else
//                             widgetList[i].index-=1;
//                         i+=1;
//                     }
//                     updateWidgetList(widgetList)
//                         .then(function () {
//                             console.log("done");
//                             res.sendStatus(200);
//                         });
//                 }
//                 else if(end===start)
//                 {
//                     end=start;
//                     res.sendStatus(200);
//                     return;
//                 }if (start>end){
//                     console.log("____________ start>>>end _____________");
//                     i=parseInt(end);
//                     while(i<=start){
//                         if (i == start)
//                             widgetList[start].index=end;
//                         else
//                             widgetList[i].index+=1;
//                         i+=1;
//                     }
//                     updateWidgetList(widgetList)
//                         .then(function () {
//                             res.sendStatus(200);
//                         });
//                 }
//                 else if(end>start){
//                     console.log("____________ end>>>start _____________");
//                     i=parseInt(start);
//                     while(i<=end){
//                         if (i == start)
//                             widgetList[start].index=end;
//                         else
//                             widgetList[i].index-=1;
//                         i+=1;
//                     }
//                     updateWidgetList(widgetList)
//                         .then(function () {
//                             console.log("done");
//                             res.sendStatus(200);
//                         });
//                 }
//                 else if(end===start)
//                 {
//                     end=start;
//                     res.sendStatus(200);
//                     return;
//                 }
//         });
//     }
// }
