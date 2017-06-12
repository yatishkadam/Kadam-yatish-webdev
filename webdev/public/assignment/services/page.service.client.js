(function () {
    angular
        .module("WAM")
        .service('pageService',pageService);

    function pageService($http) {
        this.findAllPagesForWebsite = findAllPagesForWebsite;
        this.findPageById= findPageById;
        this.updatePage=updatePage;
        this.deletePage=deletePage;
        this.createPage=createPage;

        function findAllPagesForWebsite(websiteId) {
            var url = "/api/pages/" + websiteId;
            return $http.get(url)
                .then(renderPages);
            //return the websites
            function renderPages(response) {
                return response.data;
            }
        }
        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url)
                .then(renderPages);
            //return the websites
            function renderPages(response) {
                return response.data;
            }
        }

        function updatePage(pageId, page) {
            var url="/api/page/"+pageId;
            return $http.put(url,page)
                .then(renderStatus);
            function renderStatus(response) {
                return response.data;
            }
        }
        function deletePage(pageId) {
            var url="/api/page/"+pageId;
            return $http.delete(url)
                .then(renderStatus);
            function renderStatus(response) {
                return response.data;
            }
        }


        function createPage(page,websiteId) {
            page._websiteId=websiteId;
            var url="/api/page";
            return $http.post(url,page)
                .then(render);
            function render(response) {
                return response;
            }
        }
    }
})();