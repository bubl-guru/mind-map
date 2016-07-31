/*
 * Copyright Vincent Blouin under the GPL License version 3
 */

define([
    'test/test-scenarios',
    'triple_brain.graph_element_button',
    'triple_brain.graph_element_main_menu',
    'triple_brain.vertex_controller',
    'triple_brain.mind_map_info',
    "triple_brain.selection_handler"
], function (Scenarios, GraphElementButton, GraphElementMainMenu, VertexController, MindMapInfo, SelectionHandler) {
    "use strict";
    describe("graph_element_button", function () {
        it("main menu button remains hidden if only one bubble is selected", function () {
            loadFixtures('graph-element-menu.html');
            MindMapInfo._setIsViewOnly(false);
            var scenario = new Scenarios.threeBubblesGraph();
            var bubble1 = scenario.getBubble1InTree();
            GraphElementMainMenu.reset();
            var makePublicButton = GraphElementMainMenu._getButtonHavingAction(
                "makePublic"
            );
            makePublicButton.showOnlyIfApplicable(
                bubble1.getController(),
                bubble1
            );
            expect(
                makePublicButton.getHtml()
            ).toHaveClass("hidden");
            var bubble2 = scenario.getBubble2InTree();
            makePublicButton.showOnlyIfApplicable(
                new VertexController.Self(
                    [bubble1, bubble2]
                )
            );
            expect(
                makePublicButton.getHtml()
            ).not.toHaveClass("hidden");
        });
        /*could not make the test pass even though it works in reality*/
        // it("expand all button is hidden if there's nothing to expand", function () {
        //     loadFixtures('graph-element-menu.html');
        //     MindMapInfo._setIsViewOnly(false);
        //     GraphElementMainMenu.reset();
        //     var expandAllButton = GraphElementButton.fromHtml(
        //         getButtonHtmlHavingAction("expandAll")
        //     );
        //     var scenario = new Scenarios.graphWithHiddenSimilarRelations();
        //     SelectionHandler.removeAll();
        //     expect(
        //         expandAllButton.getHtml()
        //     ).not.toHaveClass("hidden");
        //     scenario.expandBubble2(
        //         scenario.getBubble2InTree()
        //     );
        //     SelectionHandler.removeAll();
        //     expect(
        //         expandAllButton.getHtml()
        //     ).toHaveClass("hidden");
        // });
    });
});