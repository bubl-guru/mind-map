/*
 * Copyright Vincent Blouin under the Mozilla Public License 1.1
 */

define([
    "triple_brain.user",
    "triple_brain.mind_map_info",
    "triple_brain.suggestion_service",
    "triple_brain.graph_service",
    "triple_brain.schema_service"
], function (UserService, MindMapInfo, SuggestionService, GraphService, SchemaService) {
    "use strict";
    var api = {};
    api.setCenterVertexUriInUrl = function(centerVertexUri){
        MindMapInfo._getCenterVertexUriInUrl = function(){
            return centerVertexUri;
        }
    };
    api.setGetGraphFromService = function(graph){
        GraphService.getForCentralVertexUri = function(centerVertexUri, callback){
            callback(
                graph
            );
        };
    };
    api.setGetSchemaFromService = function(schema){
        SchemaService.get = function(schemaUri, callback){
            callback(
                schema
            );
        };
    };
    UserService.authenticatedUserInCache = function(){
        return {
            user_name : "foo"
        }
    };
    SuggestionService.accept = function(suggestionUi, callback){
        callback();
    };
    return api;
});