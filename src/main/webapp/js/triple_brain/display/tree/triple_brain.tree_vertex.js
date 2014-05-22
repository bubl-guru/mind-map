/*
 * Copyright Mozilla Public License 1.1
 */
define([
    "jquery",
    "triple_brain.ui.vertex",
    "triple_brain.event_bus"
],
    function($, Vertex, EventBus){
        var api = {},
            cache = {};
        api.withHtml = function(html){
            var id = html.prop('id');
            var cachedObject = cache[id];
            if(cachedObject === undefined){
                cachedObject = new Object(html);
                cache[id] = cachedObject;
            }
            return cachedObject;
        };
        api.ofVertex = function(vertex){
            return api.withHtml(
                vertex.getHtml()
            );
        };
        function Object(html){
            var self = this;
            var otherInstancesKey = "otherInstances";
            this.applyToOtherInstances = function(apply){
                $.each(self.getOtherInstances(), function(){
                    var vertex = this;
                    apply(vertex);
                });
            };
            this.getOtherInstances = function(){
                var vertex = Vertex.withHtml(html);
                if(html.data(otherInstancesKey) === undefined){
                    var verticesWithSameUri = Vertex.withUri(
                        vertex.getUri()
                    );
                    var otherInstances = [];
                    $.each(verticesWithSameUri, function(){
                        var vertexWithSameUri = this;
                        if(vertexWithSameUri.getId() !== vertex.getId()){
                            otherInstances.push(
                                vertexWithSameUri
                            );
                        }
                    });
                    html.data(
                        otherInstancesKey,
                        otherInstances
                    );
                }
                return html.data(otherInstancesKey);
            };
            this.resetOtherInstances = function(){
                html.removeData(otherInstancesKey)
            };
            Vertex.Object.apply(this, [html]);
        }
        Object.prototype = new Vertex.Object();
        EventBus.subscribe(
            '/event/ui/graph/vertex/same_as/added',
            function(event, vertex, sameAs){
                var treeVertex = api.ofVertex(vertex);
                treeVertex.applyToOtherInstances(function(vertex){
                    vertex.addSameAs(sameAs);
                });
            }
        );
        EventBus.subscribe(
            '/event/ui/graph/vertex/generic_identification/added',
            function(event, vertex, genericIdentification){
                var treeVertex = api.ofVertex(vertex);
                treeVertex.applyToOtherInstances(function(vertex){
                    vertex.addGenericIdentification(genericIdentification);
                });
            }
        );
        EventBus.subscribe(
            '/event/ui/graph/vertex/type/added',
            function(event, vertex, type){
                var treeVertex = api.ofVertex(vertex);
                treeVertex.applyToOtherInstances(function(vertex){
                    vertex.addType(type);
                });
            }
        );
        EventBus.subscribe(
            '/event/ui/graph/vertex/type/removed',
            function(event, vertex, typeToRemove){
                var treeVertex = api.ofVertex(vertex);
                treeVertex.applyToOtherInstances(function(vertex){
                    vertex.removeType(typeToRemove);
                });
            }
        );
        EventBus.subscribe(
            '/event/ui/graph/vertex/generic_identification/removed',
            function(event, vertex, genericIdentification){
                var treeVertex = api.ofVertex(vertex);
                treeVertex.applyToOtherInstances(function(vertex){
                    vertex.removeGenericIdentification(genericIdentification);
                });
            }
        );
        EventBus.subscribe(
            '/event/ui/graph/vertex/same_as/removed',
            function(event, vertex, sameAs){
                var treeVertex = api.ofVertex(vertex);
                treeVertex.applyToOtherInstances(function(vertex){
                    vertex.removeSameAs(sameAs);
                });
            }
        );
        return api;
    }
);