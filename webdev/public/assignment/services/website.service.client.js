(function () {
    angular
        .module("WAM")
        .service('websiteService',websiteService);
    
    function websiteService() {
        var websites=[
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];
        this.findAllwebsiteForUser= findAllwebsiteForUser;
        this.findWebsiteById= findWebsiteById;
        this.updateWebsite=updateWebsite;
        this.deleteWebsite=deleteWebsite;
        this.createWebsite=createWebsite;

        function findAllwebsiteForUser(userId) {
            var results=[];
            for (var w in websites){
                if(userId===websites[w].developerId){
                    results.push(websites[w]);
                }
            }
            return results;

        }
        function findWebsiteById(websiteId) {
            for (var w in websites){
                if(websiteId===websites[w]._id){
                    return websites[w];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            var oldWebsite= findWebsiteById(websiteId);
            var index=websites.indexOf(oldWebsite);
            websites[index]=website;
        }
        function deleteWebsite(websiteId) {
            var oldWebsite= findWebsiteById(websiteId);
            var index=websites.indexOf(oldWebsite);
            websites.splice(index,1);
        }


        function createWebsite(website,userId) {
            website._id=(new Date().getTime())+"";
            website.developerId=userId;
            websites.push(website);
        }
    }
})();