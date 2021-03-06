/*
 * Copyright Vincent Blouin under the GPL License version 3
 */

module.exports = {
    baseUrl: '/js',
    paths: {
        "locales": '../locales',
        "test": '../../spec',
        "module": '../module',
        "md5": "vendor/md5.min",
        "polyk": "vendor/polyk",
        "diff_match_patch": "vendor/diff_match_patch_uncompressed",
        "clipboard": "vendor/node_modules/clipboard/dist/clipboard",
        "intro": "vendor/node_modules/intro.js/intro",
        "font-picker": "vendor/node_modules/font-picker/lib/font-picker",
        "dompurify": "vendor/node_modules/dompurify/dist/purify",
        "linkifyjs": "vendor/node_modules/linkifyjs/dist/linkify-jquery",
        "linkify": "vendor/node_modules/linkifyjs/dist/linkify",
        // "html2canvas": "vendor/node_modules/html2canvas/dist/html2canvas",
        /*
         Jquery
         */
        "jquery": "vendor/node_modules/jquery/dist/jquery",
        "jquery.performance": "jquery/jquery.performance",
        "jquery.safer-html": "jquery/jquery.safer-html",
        "jquery.lazyload": "jquery/jquery.lazyload",
        "jquery-ui": "jquery/jquery-ui-1.12.1/jquery-ui",
        "jquery.url": "jquery/jquery.url",
        "jquery.nano": "jquery/jquery.nano",
        "jquery.cookie": "jquery/jquery.cookie",
        "jquery.colorbox": "jquery/jquery.colorbox-min",
        "jquery.focus-end": "jquery/jquery.focus-end",
        "jquery.center-on-screen": "jquery/jquery.center-on-screen",
        "jquery.is-fully-on-screen": "jquery/jquery.is-fully-on-screen",
        "jquery.i18next": "vendor/i18next.amd.withJQuery-1.6.3",
        "bootstrap-table": "jquery/bootstrap-table",
        "bootstrap-table-lang": "jquery/bootstrap-table-zh-CN.min",
        "jasmine-jquery": "../../spec/vendor/jasmine-jquery",

        /*
         Bootstrap
         */
        "bootstrap": "vendor/node_modules/bootstrap/dist/js/bootstrap",
        "bootstrap-datepicker": "vendor/bootstrap/bootstrap-datepicker",
        //"bootstrap-modal-carousel" : "vendor/bootstrap/bootstrap-modal-carousel",
        "ekko-lightbox": "vendor/node_modules/ekko-lightbox/dist/ekko-lightbox",
        "jquery.hotkeys": "jquery/jquery.hotkeys",
        "google-code-prettify": "vendor/node_modules/google-code-prettify/bin/prettify.min",
        "bootstrap-wysiwyg": "jquery/bootstrap-wysiwyg.min",
        "dragscroll": "vendor/dragscroll",

        /*
         Flow
         */
        "triple_brain.flow": "triple_brain/flow/triple_brain.flow",
        "triple_brain.mind_map_flow": "triple_brain/flow/triple_brain.mind_map_flow",
        "triple_brain.other_user_flow": "triple_brain/flow/triple_brain.other_user_flow",
        "triple_brain.landing_page_flow": "triple_brain/flow/triple_brain.landing_page_flow",
        "triple_brain.schema_list_flow": "triple_brain/flow/triple_brain.schema_list_flow",
        "mr.connected-home-flow": "triple_brain/flow/mr.connected-home-flow",
        "mr.loading_flow": "triple_brain/flow/mr.loading_flow",
        /*
         Search
         */
        "jquery.triple_brain.search": "triple_brain/search/jquery.triple_brain.search",
        "triple_brain.big_search_box": "triple_brain/search/triple_brain.big_search_box",
        "triple_brain.search_result": "triple_brain/search/triple_brain.search_result",
        "mr.search-service": "triple_brain/search/mr.search-service",
        "triple_brain.ui.search": "triple_brain/search/triple_brain.ui.search",
        "triple_brain.user_map_autocomplete_provider": "triple_brain/search/provider/triple_brain.user_map_autocomplete_provider",
        "triple_brain.wikidata_autocomplete_provider": "triple_brain/search/provider/triple_brain.wikidata_autocomplete_provider",

        /*
         Compare
         */

        "triple_brain.compare_flow": "triple_brain/compare/triple_brain.compare_flow",
        "triple_brain.graph_compare": "triple_brain/compare/triple_brain.graph_compare",
        "triple_brain.fork_service": "triple_brain/compare/triple_brain.fork_service",

        /*
         Meta
         */
        "triple_brain.identification": "triple_brain/identifier/triple_brain.identification",
        "triple_brain.identified_to_service": "triple_brain/identifier/triple_brain.identified_to_service",
        "triple_brain.identification_context": "triple_brain/identifier/triple_brain.identification_context",
        "triple_brain.identification_menu": "triple_brain/identifier/triple_brain.identification_menu",
        "mr.meta_graph": "triple_brain/identifier/mr.meta_graph",
        "mr.meta_graph_ui": "triple_brain/identifier/mr.meta_graph_ui",
        "mr.meta_ui": "triple_brain/identifier/mr.meta_ui",
        "mr.meta_relation_ui": "triple_brain/identifier/mr.meta_relation_ui",
        "mr.meta_relation_controller": "triple_brain/identifier/mr.meta_relation_controller",
        "mr.meta_controller": "triple_brain/identifier/mr.meta_controller",
        "mr.meta_service": "triple_brain/identifier/mr.meta_service",
        "mr.meta_relation_delete_menu": "triple_brain/identifier/mr.meta_relation_delete_menu",

        /*
         Graph Element
         */
        "triple_brain.graph_element": "triple_brain/graph-element/triple_brain.graph_element",
        "triple_brain.graph_element_service": "triple_brain/graph-element/triple_brain.graph_element_service",
        "triple_brain.graph_element_ui": "triple_brain/graph-element/triple_brain.graph_element_ui",
        "triple_brain.graph_element_controller": "triple_brain/graph-element/triple_brain.graph_element_controller",
        "triple_brain.graph_element_button": "triple_brain/graph-element/triple_brain.graph_element_button",
        "triple_brain.graph_element_main_menu": "triple_brain/graph-element/triple_brain.graph_element_main_menu",
        "triple_brain.graph_element_menu": "triple_brain/graph-element/triple_brain.graph_element_menu",
        "mr.graph-element-ui-builder": "triple_brain/graph-element/mr.graph-element-ui-builder",
        "triple_brain.graph_element_type": "triple_brain/graph-element/triple_brain.graph_element_type",

        /*
         Vertex
         */
        "triple_brain.vertex": "triple_brain/vertex/triple_brain.vertex",
        "triple_brain.vertex_server_format_builder": "triple_brain/vertex/triple_brain.vertex_server_format_builder",
        "triple_brain.vertex_ui": "triple_brain/vertex/triple_brain.vertex_ui",
        "triple_brain.ui.vertex_segments": "triple_brain/vertex/triple_brain.ui.vertex_segments",
        "triple_brain.vertex_service": "triple_brain/vertex/triple_brain.vertex_service",
        "triple_brain.ui.vertex_hidden_neighbor_properties_indicator": "triple_brain/vertex/triple_brain.ui.vertex_hidden_neighbor_properties_indicator",
        "triple_brain.included_graph_elements_menu": "triple_brain/vertex/triple_brain.included_graph_elements_menu",
        "triple_brain.vertex_controller": "triple_brain/vertex/triple_brain.vertex_controller",
        "mr.vertex-ui-builder": "triple_brain/vertex/mr.vertex-ui-builder",
        "mr.vertex-ui-builder-common": "triple_brain/vertex/mr.vertex-ui-builder-common",
        "mr.vertex-ui-builder-view-only": "triple_brain/vertex/mr.vertex-ui-builder-view-only",
        "triple_brain.relative_tree_vertex": "triple_brain/vertex/triple_brain.relative_tree_vertex",
        "mr.group-vertex-under-meta-ui": "triple_brain/vertex/mr.group-vertex-under-meta-ui",
        "mr.group-vertex-under-meta_controller": "triple_brain/vertex/mr.group-vertex-under-meta_controller",
        "mr.share-level": "triple_brain/vertex/mr.share-level",

        /*
         Suggestion
         */

        "triple_brain.suggestion": "triple_brain/suggestion/triple_brain.suggestion",
        "triple_brain.suggestion_origin": "triple_brain/suggestion/triple_brain.suggestion_origin",
        "triple_brain.suggestion_service": "triple_brain/suggestion/triple_brain.suggestion_service",
        "mr.suggestion-ui-builder": "triple_brain/suggestion/mr.suggestion-ui-builder",
        "triple_brain.suggestion_bubble_ui": "triple_brain/suggestion/triple_brain.suggestion_bubble_ui",
        "triple_brain.suggestion_vertex_controller": "triple_brain/suggestion/triple_brain.suggestion_vertex_controller",
        "mr.suggestion-relation-ui-builder": "triple_brain/suggestion/mr.suggestion-relation-ui-builder",
        "triple_brain.suggestion_relation_ui": "triple_brain/suggestion/triple_brain.suggestion_relation_ui",
        "triple_brain.suggestion_relation_controller": "triple_brain/suggestion/triple_brain.suggestion_relation_controller",

        /*
         Image
         */
        "triple_brain.image_displayer": "triple_brain/image/triple_brain.image_displayer",
        "triple_brain.image_menu": "triple_brain/image/triple_brain.image_menu",
        "triple_brain.image": "triple_brain/image/triple_brain.image",

        /*
         Triple
         */

        "triple_brain.triple": "triple_brain/triple/triple_brain.triple",
        "triple_brain.triple_ui": "triple_brain/triple/triple_brain.triple_ui",
        "triple_brain.triple_ui_builder": "triple_brain/triple/triple_brain.triple_ui_builder",

        /*
         Group Relation
         */

        "triple_brain.group_relation_controller": "triple_brain/group-relation/triple_brain.group_relation_controller",
        "triple_brain.group_relation": "triple_brain/group-relation/triple_brain.group_relation",
        "triple_brain.group_relation_ui": "triple_brain/group-relation/triple_brain.group_relation_ui",
        "mr.group-relation-ui-builder": "triple_brain/group-relation/mr.group-relation-ui-builder",


        /*
         Schema
         */

        "triple_brain.schema_controller": "triple_brain/schema/triple_brain.schema_controller",
        "triple_brain.schema_service": "triple_brain/schema/triple_brain.schema_service",
        "triple_brain.schema": "triple_brain/schema/triple_brain.schema",
        "mr.schema-ui-builder": "triple_brain/schema/mr.schema-ui-builder",
        "triple_brain.schema_ui": "triple_brain/schema/triple_brain.schema_ui",
        "triple_brain.schema_suggestion": "triple_brain/schema/triple_brain.schema_suggestion",

        /*
         Property
         */

        "triple_brain.property": "triple_brain/property/triple_brain.property",
        "triple_brain.property_ui": "triple_brain/property/triple_brain.property_ui",
        "mr.property-ui-builder": "triple_brain/property/mr.property-ui-builder",
        "triple_brain.property_controller": "triple_brain/property/triple_brain.property_controller",

        /*
         Edge
         */

        "triple_brain.edge": "triple_brain/edge/triple_brain.edge",
        "triple_brain.edge_ui": "triple_brain/edge/triple_brain.edge_ui",
        "triple_brain.edge_service": "triple_brain/edge/triple_brain.edge_service",
        "mr.edge-ui-builder-view-only": "triple_brain/edge/mr.edge-ui-builder-view-only",
        "mr.edge-ui-builder": "triple_brain/edge/mr.edge-ui-builder",
        "mr.edge-ui-builder-common": "triple_brain/edge/mr.edge-ui-builder-common",
        "triple_brain.tree_edge": "triple_brain/edge/triple_brain.tree_edge",
        "triple_brain.edge_controller": "triple_brain/edge/triple_brain.edge_controller",

        /*
         Bubble
         */

        "triple_brain.bubble": "triple_brain/bubble/triple_brain.bubble",
        "triple_brain.bubble_factory": "triple_brain/bubble/triple_brain.bubble_factory",
        "triple_brain.center_bubble": "triple_brain/bubble/triple_brain.center_bubble",
        "mr.bubble_delete_menu": "triple_brain/bubble/mr.bubble_delete_menu",

        /*
         Graph
         */
        "triple_brain.graph_modal_menu": "triple_brain/graph/triple_brain.graph_modal_menu",
        "triple_brain.graph_displayer_as_relative_tree": "triple_brain/graph/triple_brain.graph_displayer_as_relative_tree",
        "triple_brain.graph_displayer_as_tree_common": "triple_brain/graph/triple_brain.graph_displayer_as_tree_common",
        "triple_brain.graph_ui": "triple_brain/graph/triple_brain.graph_ui",
        "triple_brain.graph_controller": "triple_brain/graph/triple_brain.graph_controller",
        "triple_brain.relative_tree_displayer_templates": "triple_brain/graph/triple_brain.relative_tree_displayer_templates",
        "triple_brain.graph_service": "triple_brain/graph/triple_brain.graph_service",
        "triple_brain.sub_graph": "triple_brain/graph/triple_brain.sub_graph",
        "triple_brain.graph_displayer": "triple_brain/graph/triple_brain.graph_displayer",
        "triple_brain.graph_displayer_factory": "triple_brain/graph/triple_brain.graph_displayer_factory",
        "mr.graph-ui-builder": "triple_brain/graph/mr.graph-ui-builder",

        /*
         Friendly Resource
         */
        "triple_brain.friendly_resource_service": "triple_brain/friendly-resource/triple_brain.friendly_resource_service",
        "triple_brain.friendly_resource": "triple_brain/friendly-resource/triple_brain.friendly_resource",

        /*
        Central bubbles
         */
        "mr.centers-flow": "triple_brain/center/mr.centers-flow",
        "mr.center-graph-element": "triple_brain/center/mr.center-graph-element",
        "mr.center-graph-element-service": "triple_brain/center/mr.center-graph-element-service",

        /*
        Friend
         */
        "mr.friends-flow": "triple_brain/friend/mr.friends-flow",
        "mr.friend-service": "triple_brain/friend/mr.friend-service",

        /*
         Misc
         */
        "mr.to-list": "triple_brain/mr.to-list",
        "triple_brain.mind_map_info": "triple_brain/triple_brain.mind_map_info",
        "triple_brain.modules": "triple_brain/triple_brain.modules",
        "triple_brain.module.date_picker": "module/date_picker/triple_brain.module.date_picker",
        "mr.command": "triple_brain/mr.command",
        "mr.app_controller": "triple_brain/mr.app_controller",
        "triple_brain.template": "triple_brain/triple_brain.template",
        "triple_brain.keyboard_actions_handler": "triple_brain/triple_brain.keyboard_actions_handler",
        "triple_brain.ui.all": "triple_brain/triple_brain.ui.all",
        "triple_brain.point": "triple_brain/triple_brain.point",
        "triple_brain.segment": "triple_brain/triple_brain.segment",
        "mr.wikidata": "triple_brain/mr.wikidata",
        "mr.wikidata_uri": "triple_brain/mr.wikidata_uri",
        "triple_brain.transform_matrix_2d": "triple_brain/triple_brain.transform_matrix_2d",
        "triple_brain.error": "triple_brain/triple_brain.error",
        "mr.ask_modal": "triple_brain/mr.ask_modal",
        "mr.color": "triple_brain/mr.color",

        "triple_brain.object_utils": "triple_brain/triple_brain.object_utils",
        "triple_brain.selection_handler": "triple_brain/triple_brain.selection_handler",
        "triple_brain.scroll_on_mouse_frontier": "triple_brain/triple_brain.scroll_on_mouse_frontier",
        "triple_brain.header": "triple_brain/triple_brain.header",
        "triple_brain.language_manager": "triple_brain/triple_brain.language_manager",
        "triple_brain.mind-map_template": "triple_brain/triple_brain.mind-map_template",
        "triple_brain.id_uri": "triple_brain/triple_brain.id_uri",

        "triple_brain.ui_utils": "triple_brain/triple_brain.ui_utils",
        "triple_brain.user_service": "triple_brain/triple_brain.user_service",
        "triple_brain.login_handler": "triple_brain/triple_brain.login_handler",
        "triple_brain.register_handler": "triple_brain/triple_brain.register_handler",
        "mr.forgot-password-flow": "triple_brain/mr.forgot-password-flow",
        "triple_brain.change_password": "triple_brain/triple_brain.change_password",
        "triple_brain.event_bus": "triple_brain/triple_brain.event_bus"
    },
    packages: [{
        name: 'moment',
        location: 'vendor/node_modules/moment',
        main: 'moment'
    }],
    shim: {
        "polyk": [],
        "diff_match_patch": [],
        "jquery.lazyload": ["jquery"],
        "jquery-ui": ["jquery"],
        "jquery.url": ["jquery"],
        "jquery.nano": ["jquery"],
        "jquery.cookie": ["jquery"],
        "jquery.cometd": ["jquery"],
        "jquery.cometd-ack": ["jquery"],
        "jquery.cometd-reload": ["jquery"],
        "jquery.cometd-timestamp": ["jquery"],
        "jquery.cometd-timesync": ["jquery"],
        "jquery.colorbox": ["jquery"],
        "jquery.hotkeys": ["jquery"],
        "bootstrap": ["jquery"],
        "bootstrap-datepicker": ["bootstrap"],
        "bootstrap-wysiwyg": ["jquery", "bootstrap", "jquery.hotkeys", "google-code-prettify"],
        "bootstrap-table": ["jquery", "bootstrap"],
        "jasmine-jquery": ["jquery"],
        "ekko-lightbox": ["jquery"],
        "linkifyjs": ["linkify", "jquery"]
    }
};
