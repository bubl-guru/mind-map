/*
 * Copyright Vincent Blouin under the Mozilla Public License 1.1
 */

define([
    "triple_brain.graph_displayer",
    "triple_brain.edge",
    "triple_brain.vertex",
    'test/webapp/js/test-scenarios'
], function (GraphDisplayer, Edge, Vertex, Scenarios) {
    "use strict";
    describe("bubble", function () {
        var centerBubble,
            bubble2,
            bubble3,
            threeBubbleScenario;
        beforeEach(function () {
            threeBubbleScenario = new Scenarios.threeBubblesGraph();
            bubble2 = threeBubbleScenario.getBubble2InTree();
            bubble3 = threeBubbleScenario.getBubble3InTree();
            centerBubble = threeBubbleScenario.getCenterBubbleInTree();
        });
        it("can return parent bubble", function () {
            var parentBubble = bubble2.getParentBubble();
            expect(
                parentBubble.text()
            ).toBe("r1");
        });
        it("returns center when getting parent bubble of center vertex", function () {
            var parentBubble = centerBubble.getParentBubble();
            expect(
                parentBubble.getUri()
            ).toBe(centerBubble.getUri());
        });
        it("can return parent vertex", function () {
            var parentVertex = bubble2.getParentVertex();
            expect(
                parentVertex.text()
            ).toBe("b1");
        });
        it("returns grand parent if parent is not a vertex", function () {
            var newVertex = Scenarios.addTriple(bubble2).destinationVertex();
            expect(
                newVertex.getParentVertex().getUri()
            ).toBe(bubble2.getUri());
        });
        it("can return top most child bubble", function () {
            var newEdge = Scenarios.addTriple(
                bubble2
            ).edge();
            expect(
                bubble2.getTopMostChildBubble().getUri()
            ).toBe(newEdge.getUri());
        });

        it("returns self when getting child of leaf", function () {
            expect(
                bubble2.getTopMostChildBubble().getUri()
            ).toBe(bubble2.getUri());
        });

        it("can get bubble above an edge", function () {
            var newEdge1 = Scenarios.addTriple(bubble2).edge(),
                newEdge2 = Scenarios.addTriple(bubble2).edge();
            expect(
                newEdge2.getBubbleAbove().getId()
            ).toBe(newEdge1.getId());
        });

        it("can get bubble above a vertex", function () {
            var newVertex1 = Scenarios.addTriple(bubble2).destinationVertex(),
                newVertex2 = Scenarios.addTriple(
                    bubble2
                ).destinationVertex();
            expect(
                newVertex2.getBubbleAbove().getId()
            ).toBe(newVertex1.getId());
        });

        it("returns itself when getting bubble above center vertex", function () {
            expect(
                centerBubble.getBubbleAbove().getId()
            ).toBe(centerBubble.getId());
        });

        it("returns itself when no bubble above", function () {
            expect(
                bubble2.getBubbleAbove().getId()
            ).toBe(bubble2.getId());
        });

        it("can get bubble below", function () {
            var newEdge1 = Scenarios.addTriple(bubble2).edge(),
                newEdge2 = Scenarios.addTriple(bubble2).edge();
            expect(
                newEdge1.getBubbleUnder().getId()
            ).toBe(newEdge2.getId());
        });

        it("can get bubble below even if both bubbles only share grand-parent", function () {
            var newVertex1 = Scenarios.addTriple(bubble2).destinationVertex(),
                newVertex2 = Scenarios.addTriple(
                    bubble2
                ).destinationVertex();
            expect(
                newVertex1.getBubbleUnder().getId()
            ).toBe(newVertex2.getId());
        });

        it("can get closest bubble below even if common parent is further away than grand-parent", function () {
            var newVertex1 = Scenarios.addTriple(bubble2).destinationVertex(),
                newVertex2 = Scenarios.addTriple(
                    bubble2
                ).destinationVertex(),
                childOfNewVertex1 = Scenarios.addTriple(
                    newVertex1
                ).destinationVertex();
            expect(
                childOfNewVertex1.getBubbleUnder().getId()
            ).toBe(newVertex2.getId());
        });
        it("returns bubbles below and not it's child when it has one", function () {
            var newVertex1 = Scenarios.addTriple(bubble2).destinationVertex(),
                newVertex2 = Scenarios.addTriple(
                    bubble2
                ).destinationVertex();
            Scenarios.addTriple(
                newVertex2
            ).destinationVertex();
            expect(
                newVertex1.getBubbleUnder().getId()
            ).toBe(newVertex2.getId());
        });
        it("returns itself when getting bubble under center vertex", function () {
            expect(
                centerBubble.getBubbleUnder().getId()
            ).toBe(centerBubble.getId());
        });

        it("returns itself when no bubble under", function () {
            expect(
                bubble2.getBubbleUnder().getId()
            ).toBe(bubble2.getId());
        });

        it("can tell if it has children", function () {
            expect(
                centerBubble.hasChildren()
            ).toBeTruthy();
            expect(
                bubble2.hasChildren()
            ).toBeFalsy();
        });

        it("shows hidden relation container when has some", function () {
            expect(
                bubble2.hasHiddenRelations()
            ).toBeFalsy();
            expect(
                bubble2.hasHiddenRelationsContainer()
            ).toBeFalsy();
            expect(
                bubble3.hasHiddenRelations()
            ).toBeTruthy();
            expect(
                bubble3.hasHiddenRelationsContainer()
            ).toBeTruthy();
        });

        it("hides hidden relations container after expand", function () {
            expect(
                bubble3.hasHiddenRelationsContainer()
            ).toBeTruthy();
            threeBubbleScenario.expandBubble3(
                bubble3
            );
            expect(
                bubble3.hasHiddenRelationsContainer()
            ).toBeFalsy();
        });

        it("shows hidden relations container of bubbles from expanded bubble", function () {
            threeBubbleScenario.expandBubble3(
                bubble3
            );
            var bubble4 = threeBubbleScenario.getBubble4InTree();
            expect(
                bubble4.hasHiddenRelations()
            ).toBeTruthy();
            expect(
                bubble4.hasHiddenRelationsContainer()
            ).toBeTruthy();
        });
    });
});