/*
 * Copyright Vincent Blouin under the GPL License version 3
 */

define([
    "test/test-scenarios",
    "test/test-utils",
    "test/mock/triple_brain.graph_element_service_mock",
    "triple_brain.vertex_service",
    "triple_brain.user_map_autocomplete_provider",
    "triple_brain.vertex_html_builder_common"
], function (Scenarios, TestUtils, GraphElementServiceMock, VertexService, UserMapAutocompleteProvider, VertexHtmlBuilderCommon) {
    "use strict";
    describe("vertex_html_builder_common", function () {
        it("waits for suggestion to be integrated before handling autocomplete select", function () {
            var searchProvider = UserMapAutocompleteProvider.toFetchOnlyCurrentUserVerticesAndSchemas(),
                projectSearchResult = searchProvider.formatResults(
                    new Scenarios.getSearchResultsForProject().get(),
                    "project"
                )[0];
            GraphElementServiceMock.addIdentificationMock();
            var bubble1 = new Scenarios.threeBubblesGraph().getBubble1InTree();
            expect(
                bubble1.hasIdentifications()
            ).toBeFalsy();
            VertexHtmlBuilderCommon._labelAutocompleteSelectHandler(
                bubble1,
                projectSearchResult
            );
            expect(
                bubble1.hasIdentifications()
            ).toBeTruthy();
            var suggestionInTree = new Scenarios.oneBubbleHavingSuggestionsGraph().getAnySuggestionInTree();
            VertexHtmlBuilderCommon._labelAutocompleteSelectHandler(
                suggestionInTree,
                projectSearchResult
            );
            expect(
                suggestionInTree.getIdentifications().length
            ).toBe(2);
            suggestionInTree.integrate(
                TestUtils.generateVertexUri()
            );
            expect(
                suggestionInTree.getIdentifications().length
            ).toBe(3);
        });
    });
});