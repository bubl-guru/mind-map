/*
 * Copyright Vincent Blouin under the GPL License version 3
 */

define([
        "jquery",
        "triple_brain.vertex",
        "triple_brain.edge",
        "triple_brain.group_relation",
        "triple_brain.identification"
    ],
    function ($, Vertex, Edge, GroupRelation, Identification) {
        "use strict";
        var api = {};
        api.enhancedVerticesInfo = function (serverGraph, centralVertexUri) {
            var vertices = serverGraph.vertices,
                originalEdges = serverGraph.edges,
                centralBubble = vertexWithId(centralVertexUri),
                edgesFacade = arrayOfEdgesHavingThoseRelatedToCenterVertexOnTop(),
                nonEnhancedEdges = {},
                joinIfMoreSimilarRelations = {},
                childrenGroupedByIdentifiers = {};
            centralBubble.isInvolved = true;
            initRelationsOfVertex(
                centralBubble
            );
            $.each(edgesFacade, function () {
                    updateVerticesChildrenWithEdge(
                        this
                    );
                }
            );
            $.each(childrenGroupedByIdentifiers, function(sourceVertexKey, relationIdentifiers){
                $.each(sortIdentifiersByNumberOfRelationsDesc(relationIdentifiers), function(identifierUri, tuple){
                    console.log(tuple);
                    debugger;
                });
            });
            serverGraph.edges = edgesFacade;
            function updateVerticesChildrenWithEdge(edge) {
                initRelationsOfVertex(
                    vertexWithId(
                        edge.getSourceVertex().getUri()
                    )
                );
                initRelationsOfVertex(
                    vertexWithId(
                        edge.getDestinationVertex().getUri()
                    )
                );
                updateRelationsIdentification(edge);
            }

            function arrayOfEdgesHavingThoseRelatedToCenterVertexOnTop() {
                var edges = [];
                $.each(originalEdges, function () {
                    edges.push(
                        isGraphElementFacadeBuilt(this) ? this : Edge.fromServerFormat(
                            this
                        )
                    );
                });
                edges.sort(function (edge1, edge2) {
                    var edge1IsRelated = isEdgeRelatedToCenterVertex(edge1),
                        edge2IsRelated = isEdgeRelatedToCenterVertex(edge2);
                    if (edge1IsRelated === edge2IsRelated) {
                        return 0;
                    }
                    if (edge1IsRelated) {
                        return -1;
                    }
                    return 1;
                });
                return edges;
            }

            function isEdgeRelatedToCenterVertex(edge) {
                return edge.getSourceVertex().getUri() === centralVertexUri ||
                    edge.getDestinationVertex().getUri() === centralVertexUri;
            }

            function initRelationsOfVertex(vertex) {
                if (vertex.similarRelations === undefined) {
                    vertex.similarRelations = {};
                }
            }

            function updateRelationsIdentification(edge) {
                var sourceVertex = vertexWithId(
                    edge.getSourceVertex().getUri()
                    ),
                    destinationVertex = vertexWithId(
                        edge.getDestinationVertex().getUri()
                    );
                if (!sourceVertex.isInvolved && !destinationVertex.isInvolved) {
                    nonEnhancedEdges[edge.getUri()] = edge;
                    return;
                }
                if (destinationVertex.isInvolved && !sourceVertex.isInvolved) {
                    sourceVertex = vertexWithId(
                        edge.getDestinationVertex().getUri()
                    );
                    destinationVertex = vertexWithId(
                        edge.getSourceVertex().getUri()
                    );
                }
                sourceVertex.isInvolved = true;
                destinationVertex.isInvolved = true;
                var edgeIdentifications = edge.getIdentifiers();
                if (edgeIdentifications.length > 0) {
                    if (undefined === childrenGroupedByIdentifiers[sourceVertex.getUri()]) {
                        childrenGroupedByIdentifiers[sourceVertex.getUri()] = {};
                    }
                    var identifiers = childrenGroupedByIdentifiers[sourceVertex.getUri()];
                    $.each(edgeIdentifications, function () {
                        var identifier = this;
                        if(undefined === identifiers[identifier.getUri()]){
                            identifiers[identifier.getUri()] = [];
                        }
                        identifiers[identifier.getUri()].push(
                            {
                                vertex:destinationVertex,
                                edge:edge
                            }
                        );
                    });


                    // setupGroupRelation(edgeIdentifications, true);
                    // if (edgeIdentifications.length > 1) {
                    //     $.each(edgeIdentifications, function () {
                    //         setupGroupRelation(
                    //             this,
                    //             false
                    //         );
                    //     });
                    // }
                } else {
                    var key = edge.getUri(),
                        groupRelation = sourceVertex.similarRelations[key];
                    if (undefined === groupRelation) {
                        groupRelation = GroupRelation.usingIdentification(
                            Identification.fromFriendlyResource(
                                edge
                            )
                        );
                    }
                    groupRelation.addVertex(
                        destinationVertex,
                        edge
                    );
                    sourceVertex.similarRelations[key] = groupRelation;
                }
                delete nonEnhancedEdges[edge.getUri()];
                revisitNonEnhancedEdges();

                function setupGroupRelation(identifiers, createIfUndefined) {
                    var key = getIdentifiersKey(identifiers),
                        groupRelation = sourceVertex.similarRelations[key];
                    debugger;
                    if (groupRelation === undefined && createIfUndefined) {
                        groupRelation = GroupRelation.usingIdentification(
                            identifiers
                        );
                    }
                    if (groupRelation === undefined) {
                        if (joinIfMoreSimilarRelations[key] === undefined) {
                            joinIfMoreSimilarRelations[key] = [];
                        }
                        joinIfMoreSimilarRelations[key].push({
                            destinationVertex: destinationVertex,
                            edge: edge
                        });
                    }
                    else {
                        groupRelation.addVertex(
                            destinationVertex,
                            edge
                        );
                        sourceVertex.similarRelations[key] = groupRelation;
                        if (joinIfMoreSimilarRelations[key] !== undefined) {
                            $.each(joinIfMoreSimilarRelations[key], function () {
                                groupRelation.addVertex(
                                    this.destinationVertex,
                                    this.edge
                                );
                            });
                            joinIfMoreSimilarRelations[key] = undefined;
                        }
                    }
                }
            }

            function getIdentifiersKey(identifiers) {
                var key = "";
                if (Array.isArray(identifiers)) {
                    $.each(identifiers, function () {
                        key += this.getExternalResourceUri();
                    });
                }
                else {
                    key = identifiers.getExternalResourceUri();
                }
                return key;
            }

            function revisitNonEnhancedEdges() {
                $.each(nonEnhancedEdges, function () {
                    updateRelationsIdentification(this);
                });
            }

            function vertexWithId(vertexId) {
                var serverFormat = vertices[vertexId];
                if (isGraphElementFacadeBuilt(serverFormat)) {
                    return serverFormat;
                }
                return vertices[vertexId] = Vertex.fromServerFormat(
                    vertices[vertexId]
                );
            }

            function isGraphElementFacadeBuilt(graphElementServerFormat) {
                return graphElementServerFormat["getLabel"] !== undefined;
            }
            function sortIdentifiersByNumberOfRelationsDesc(identifiers) {
                var sortedKeys = Object.keys(identifiers).sort(
                    function (a, b) {
                        var relationsA = identifiers[a];
                        var relationsB = identifiers[b];
                        if(relationsA.length === relationsB.length) {
                            return 0
                        }
                        if(relationsA.length > relationsB.length) {
                            return -1;
                        }
                        return 1;
                    });
                var sortedIdentifiers = {};
                $.each(sortedKeys, function () {
                    sortedIdentifiers[this] = identifiers[this];
                });
                return sortedIdentifiers;
            }
        };
        return api;
    }
);