(function () {
    angular
        .module("WAM")
        .service('pageService',pageService);

    function pageService() {
        var pages=[
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
            { "_id": "523", "name": "Post 3", "websiteId": "456", "description": "Lorem" }

        ];
        this.findAllPagesForWebsite = findAllPagesForWebsite;
        this.findPageById= findPageById;
        this.updatePage=updatePage;
        this.deletePage=deletePage;
        this.createPage=createPage;

        function findAllPagesForWebsite(websiteId) {
            var results=[];
            for (var w in pages){
                if(websiteId===pages[w].websiteId){
                    results.push(pages[w]);
                }
            }
            return results;

        }
        function findPageById(pageId) {
            for (var w in pages){
                if(pageId===pages[w]._id){
                    return pages[w];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            var oldpage= findPageById(pageId);
            var index=pages.indexOf(oldpage);
            pages[index]=page;
        }
        function deletePage(pageId) {
            var oldpage = findPageById(pageId);
            var index =pages.indexOf(oldpage);
            pages.splice(index,1);
        }


        function createPage(page,websiteId) {
            page._id=(new Date().getTime())+"";
            page.websiteId=websiteId;
            pages.push(page);
        }
    }
})();