/*
 * Copyright Mozilla Public License 1.1
 */
define([
    "jquery",
    "triple_brain.ui.vertex",
    "triple_brain.event_bus"
],
    function($, Vertex, EventBus){
        var api = {};
        api.withHtml = function(html){
            return new Object(
                $(html)
            );
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