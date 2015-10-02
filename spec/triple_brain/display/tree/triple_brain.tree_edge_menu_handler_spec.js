/*
 * Copyright Vincent Blouin under the GPL License version 3
 */

define([
    'test/test-scenarios',
    'test/test-utils',
    'test/mock',
    'triple_brain.tree_edge_menu_handler',
    'triple_brain.mind_map_info'
], function (Scenarios, TestUtils, Mock, TreeEdgeMenuHandler, MindMapInfo) {
    "use strict";
    describe("graph_displayer_as_tree_common", function () {
        beforeEach(function () {});
        it("can remove edge", function () {
            var threeBubblesScenario = new Scenarios.threeBubblesGraph();
            var bubble1 = threeBubblesScenario.getBubble1InTree();
            var numberOfChild = bubble1.getNumberOfChild();
            var relation1 = bubble1.getTopMostChildBubble();
            Mock.mockRemoveEdge();
            MindMapInfo.setIsAnonymous(false);
            TreeEdgeMenuHandler.forSingle().removeAction(
                relation1
            );
            expect(
                bubble1.getNumberOfChild()
            ).toBe(numberOfChild - 1);
        });
        it("changes to a group relation when adding a child", function () {
            var threeBubblesScenario = new Scenarios.threeBubblesGraph();
            var bubble1 = threeBubblesScenario.getBubble1InTree();
            expect(
                TestUtils.getChildWithLabel(bubble1, "r1").isGroupRelation()
            ).toBeFalsy();
            MindMapInfo._setIsViewOnly(false);
            TreeEdgeMenuHandler.forSingle().addChildAction(
                TestUtils.getChildWithLabel(bubble1, "r1")
            );
            expect(
                TestUtils.getChildWithLabel(bubble1, "r1").isGroupRelation()
            ).toBeTruthy();
        });
    });
});


