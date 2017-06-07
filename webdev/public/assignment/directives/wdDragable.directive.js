(function () {
    angular
        .module("WAM")
        .directive("wdDragable",wdDragable);

    function wdDragable() {
        function linkFunction(scope, element) {

            scope.dragStart = function(e, ui) {
                this.startIndex=ui.item.index();
            };
            scope.dragEnd = function(e, ui) {
                    endIndex = ui.item.index();

                // $scope.sortableArray.splice(end, 0,
                //     $scope.sortableArray.splice(start, 1)[0]);
                //
                // $scope.$apply();
                scope.callback({arg1: this.startIndex, arg2: endIndex});

            };
            $(element).sortable({
                start: scope.dragStart,
                update:scope.dragEnd
            });
        }

        return {
            scope: { callback: '&' },
            link: linkFunction
        };
}
})();