(function () {
    angular
        .module("WAM")
        .service("flickrService",flickrService);

    
    
    function flickrService($http) {
        this.searchPhotos=searchPhotos;
        var key = "1e2a7c5b85d10fdca6d5bf8d1cfeb30d";
        var secret = "2c9346d6d0be70eb";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
    

})();