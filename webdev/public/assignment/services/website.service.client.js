(function () {
    angular
        .module("WAM")
        .service('websiteService',websiteService);
    
    function websiteService($http) {
        this.findAllwebsiteForUser= findAllwebsiteForUser;
        this.findWebsiteById= findWebsiteById;
        this.updateWebsite=updateWebsite;
        this.deleteWebsite=deleteWebsite;
        this.createWebsite=createWebsite;


        //function to render all the websites for a particular user
        function findAllwebsiteForUser(userId) {
            var url="/api/websites/"+userId;
            return $http.get(url)
                .then(renderUser);
            //return the websites
            function renderUser(response) {
                return response.data;
            }

        }
        //find website given the website id
        function findWebsiteById(websiteId) {
            var url="/api/website/"+websiteId;
            return $http.get(url)
                .then(renderUser);
            //return the websites
            function renderUser(response) {
                return response.data;
            }
        }

        //update the website name and description
        function updateWebsite(websiteId, website) {
            var url="/api/website/"+websiteId;
            return $http.put(url,website)
                .then(renderStatus);
            function renderStatus(response) {
                return response.data;
            }
        }

        //delete the website
        function deleteWebsite(websiteId) {
            var url="/api/website/"+websiteId;
            return $http.delete(url)
                .then(renderStatus);
            function renderStatus(response) {
                return response.data;
            }
        }


        function createWebsite(website,userId) {
            website.developerId=userId;
            var url="/api/user/"+userId+"/website";
            return $http.post(url,website)
                .then(renders);
            function renders(response) {
                return response.data;
            }
        }
    }
})();