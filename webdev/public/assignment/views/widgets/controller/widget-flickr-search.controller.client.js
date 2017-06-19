(function () {
    angular
        .module("WAM")
        .controller("flickrImageSearchController",flickrImageSearchController);
function flickrImageSearchController(flickrService,widgetService,$location,$routeParams,currentUser,userService) {

    var model =this;
    model.userId=currentUser._id;//$routeParams['userId'];
    model.websiteId=$routeParams['websiteId'];
    model.pageId=$routeParams['pageId'];
    var widgetId=$routeParams.widgetId;
    model.searchPhotos =searchPhotos;
    model.selectPhoto=selectPhoto;
    function init() {
        widgetService.findWidgetById(widgetId)
            .then(function (widget) {
                model.widget = widget;
            });
    }
    init();


    function searchPhotos(searchTerm) {
        flickrService
            .searchPhotos(searchTerm)
            .then(function(response) {
                data = response.data.replace("jsonFlickrApi(","");
                data = data.substring(0,data.length - 1);
                data = JSON.parse(data);
                model.photos = data.photos;
            });
    }
    function selectPhoto(photo) {
        var farm=photo.farm;
        var server=photo.server;
        var id=photo.id;
        var secret=photo.secret;
        url="https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+"_m.jpg";
        model.widget.url=url;
        widgetService.updateWidget(widgetId,model.widget)
            .then(function () {
                $location.url("/websites/"+model.websiteId+"/pages/"+model.pageId+"/widget");
            });

        //https://farm{{photo.farm}}.staticflickr.com/{{photo.server}}/{{photo.id}}_{{photo.secret}}_m.jpg" width="250px" height="250px" style="padding: 5px
    }
    function logout() {
        userService
            .logout()
            .then(function () {
                $location.url("/login");
            });
    }


}
})();