(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce,widgetService,$routeParams,currentUser) {
        var model = this;
        model.userId=currentUser._id//$routeParams['userId'];
        model.websiteId=$routeParams['websiteId'];
        model.pageId=$routeParams['pageId'];
        model.handleSort = handleSort;

        function init() {
            //model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            widgetService.findWidgetsByPageId(model.pageId)
                .then(renderWidget);
            function renderWidget(widget){
                model.widgets = widget;
            }
            model.trust = trust;
            model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
            model.widgetUrl = widgetUrl;
        }
        init();


        function handleSort(start , end) {
            if (start===end){
                return;
            }
            widgetService.sendSortOrder(model.pageId,start,end)
                .then(null,
                    function (response) {
                        model.widgets = angular.copy(model.widgets);
                    }
                );
            
        }


        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }
    }
})();