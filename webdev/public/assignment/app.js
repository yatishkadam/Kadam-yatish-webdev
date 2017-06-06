(function () {
    angular
        .module("WAM",['ngRoute'])
        .directive("wdDragable",wdDragable);

    function wdDragable() {
        function linkFunction(scope, element) {
            $(element).sortable();
        }

                return {
                     link: linkFunction
                 };
        }

})();