(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce,widgetService,$routeParams) {
        var model = this;
        model.userId=$routeParams['userId'];
        model.websiteId=$routeParams['websiteId'];
        model.pageId=$routeParams['pageId'];

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.trust = trust;
            model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
            model.widgetUrl = widgetUrl;
        }
        init();



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