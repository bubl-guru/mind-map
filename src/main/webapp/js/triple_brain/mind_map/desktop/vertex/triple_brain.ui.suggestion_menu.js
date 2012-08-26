/**
 * Copyright Mozilla Public License 1.1
 */

define([
    "jquery",
    "triple_brain/mind_map/triple_brain.freebase",
    "triple_brain/mind_map/desktop/triple_brain.mind-map_template",
    "triple_brain/mind_map/desktop/triple_brain.ui.graph",
    "triple_brain/mind_map/triple_brain.point",
    "triple_brain/mind_map/triple_brain.external_resource",
    "triple_brain/mind_map/triple_brain.vertex",
    "triple_brain/mind_map/triple_brain.edge"
],
    function ($, Freebase, MindMapTemplate, Graph, Point, ExternalResource, VertexService, EdgeService) {
        var api = {
            ofVertex:function (vertex) {
                return new SuggestionMenu(vertex);
            }
        }

        function SuggestionMenu(vertex) {
            var suggestionMenu = this;
            var html;
            this.create = function () {
                html = MindMapTemplate['suggestions_menu'].merge();
                Graph.addHTML(
                    html
                );
                addTitle();
                addSubTitle();
                addSuggestionList();
                position();
                html.click(function (menuClickEvent) {
                    menuClickEvent.stopPropagation();
                });
                return suggestionMenu;
            }

            this.reEvaluatePosition = function () {
                position();
            }

            function addTitle() {
                $(html).append(
                    MindMapTemplate['suggestions_menu_title'].merge()
                );
            }

            function addSubTitle() {
                $(html).append(
                    MindMapTemplate['suggestions_menu_sub_title'].merge()
                );
            }

            function addSuggestionList() {
                var suggestionsList = MindMapTemplate['suggestions_list'].merge();
                $(html).append(
                    suggestionsList
                );
                $.each(vertex.suggestions(), function () {
                    var suggestion = this;
                    var htmlSuggestion = MindMapTemplate['suggestion'].merge({
                        domain_id:Freebase.idInFreebaseURI(suggestion.domainUri()),
                        label:suggestion.label()
                    });
                    $(htmlSuggestion).draggable();
                    $(suggestionsList).append(htmlSuggestion);
                    $(htmlSuggestion).bind('dragstop', function (event) {
                        var currentSuggestion = this;
                        var newVertexPosition = Point.fromCoordinates(
                            $(this).offset().left + $(this).width() / 2,
                            $(this).offset().top
                        );
                        VertexService.addRelationAndVertexAtPositionToVertex(
                            vertex,
                            newVertexPosition,
                            function (triple) {
                                var edgeLabel = $(currentSuggestion).html();
                                EdgeService.updateLabel(
                                    triple.edge(),
                                    edgeLabel
                                );
                                triple.edge().setText(edgeLabel);
                                var typeId = $(currentSuggestion).attr('type-id');
                                var typeUri = Freebase.freebaseIdToURI(typeId);
                                var type = ExternalResource.withUriAndLabel(
                                    typeUri,
                                    $(currentSuggestion).text()
                                );
                                VertexService.addType(
                                    triple.destinationVertex(),
                                    type
                                );
                            }
                        );
                        $(this).remove();
                    });
                });
            }

            function position() {
                var menuOffset = Point.fromCoordinates(
                    vertex.width(),
                    vertex.height() / 2 - $(html).height() / 2
                )

                var menuPosition = Point.sumOfPoints(
                    vertex.position(),
                    menuOffset
                );
                if (isMenuPositionOffScreen(menuPosition)) {
                    menuPosition.y = 10;
                }

                $(html).css('left', menuPosition.x);
                $(html).css('top', menuPosition.y);
            }

            function isMenuPositionOffScreen(menuPosition) {
                return menuPosition.y < 10;
            }
        }

        return api;
    }
);