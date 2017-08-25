/*
 * Copyright Vincent Blouin under the GPL License version 3
 * forked from https://github.com/sebhildebrandt/reveal.js-tagcloud-plugin
 */

define([
    "jquery",
    "triple_brain.id_uri",
    "mr.ask_modal",
    "triple_brain.center_graph_element_service",
    "triple_brain.event_bus",
    "bootstrap-table",
    "jquery.i18next"
], function ($, IdUri, AskModal, CenterGraphElementService, EventBus) {
    "use strict";
    var NUMBER_OF_VISIT_RANKS = 3,
        _elements,
        _container,
        tableData = [],
        checkedCenters = [],
        table = $('#word-cloud-table');
    return {
        buildFromElementsInContainer: function (elements, container) {
            _elements = elements;
            defineNumberVisitsRank();
            _container = container;
            buildHtml();
            setTitle();
            handleRemoveCenterBtnClick();
            EventBus.subscribe("localized-text-loaded", function(){
                $(".fixed-table-toolbar .search input").attr(
                    "data-i18n",
                    "[placeholder]centralBubbles.filter"
                );
                _container.find("th.bubble-label .th-inner").attr(
                    "data-i18n",
                    "centralBubbles.center"
                );
                _container.find("th.context .th-inner").attr(
                    "data-i18n",
                    "centralBubbles.context"
                );
                _container.find("th.last-visit .th-inner").attr(
                    "data-i18n",
                    "centralBubbles.lastVisit"
                );
                _container.find("th.number-visits .th-inner").attr(
                    "data-i18n",
                    "centralBubbles.nbVisits"
                );
                _container.i18n();
            });
        }
    };

    function buildHtml() {
        _elements.forEach(function (element) {
            tableData.push({
                uri: element.getUri(),
                centerElement: element,
                bubbleLabel: getLabelCellContentForElement(element),
                bubbleLabelValue: element.getLabel(),
                context: getContextCellContentForElement(element),
                lastVisit: getLastVisitCellContentForElement(element),
                lastVisitValue: element.getLastCenterDate().getTime(),
                numberVisits: getNumberVisitsCellContentForElement(element),
                numberVisitsValue: element.getNumberOfVisits()
            });
        });
        table.bootstrapTable({
            search: true,
            header: "#word-cloud-header",
            sortName: "lastVisit",
            sortOrder: "desc",
            searchAlign: 'left',
            onPostHeader: function () {
                $(".fixed-table-toolbar .search input").attr(
                    "placeholder",
                    $.t("centralBubbles.filter")
                );
                _container.find("input[type=checkbox]").addClass("form-control");
            },
            onCheckAll: function (rows) {
                checkedCenters = [];
                rows.forEach(function (row) {
                    checkedCenters.push(
                        row.centerElement
                    );
                });
            },
            onUncheckAll: function () {
                checkedCenters = [];
            },
            onCheck: function (row) {
                checkedCenters.push(
                    row.centerElement
                );
            },
            onUncheck: function (row) {
                var index = 0;
                checkedCenters.forEach(function (centerElement) {
                    if (centerElement.getUri() === row.centerElement.getUri()) {
                        checkedCenters.splice(index, 1);
                    }
                    index++;
                });
            },
            columns: [{
                field: "bubbleLabelValue",
                searchable: true
            }, {
                field: 'bubbleLabel',
                title: $.t("centralBubbles.center"),
                'class': 'bubble-label',
                searchable: false
            }, {
                field: 'context',
                title: $.t("centralBubbles.context"),
                'class': 'context',
                searchable: false
            }, {
                field: 'lastVisit',
                title: $.t("centralBubbles.lastVisit"),
                sortable: true,
                'class': 'last-visit',
                sortName: "lastVisitValue",
                searchable: false
            }, {
                field: 'numberVisits',
                title: $.t("centralBubbles.nbVisits"),
                sortable: true,
                'class': 'number-visits',
                sortName: "numberVisitsValue",
                searchable: false
            }, {
                field: "select",
                checkbox: true,
                "class": "form-group",
                searchable: false
            }],
            data: tableData
        });
    }

    function getLabelCellContentForElement(element) {
        var label = element.getLabel().trim();
        var anchor = buildAnchorForElement(element);
        if (!label) {
            anchor.addClass("empty");
            label = "empty label";
        }
        anchor.text(
            label
        );
        if (IdUri.isMetaUri(element.getUri())) {
            anchor.append(
                " ",
                $("<i class='fa fa-tag' data-i18n='[title]centralBubbles.reference'>")
            );
        }
        return anchor.prop('outerHTML');
    }

    function getContextCellContentForElement(element) {
        var anchor = buildAnchorForElement(element);
        var container = $("<div class='grid'>").appendTo(
            anchor
        );
        var contextUris = Object.keys(element.getContext());
        if (contextUris.length < 1) {
            anchor.addClass("empty").text(
                "empty label"
            );
        }
        for (var i = 0; i < contextUris.length; i++) {
            var text = element.getContext()[contextUris[i]];
            container.append(
                $("<div class='grid-item'>").text(
                    text
                )
            );
        }
        return anchor.prop('outerHTML');
    }

    function getLastVisitCellContentForElement(element) {
        return buildAnchorForElement(element).addClass(
            "text-right"
        ).text(
            element.getLastCenterDate().toLocaleDateString()
        ).prop('outerHTML');
    }

    function getNumberVisitsCellContentForElement(element) {
        var label = $('<span class="label">').addClass(
            getNumberOfVisitsLabelClassFromRank(
                element.getNumberOfVisitsRank()
            )
        ).text(element.getNumberOfVisits());
        return buildAnchorForElement(element).addClass(
            "text-right"
        ).append(
            label
        ).prop('outerHTML');
    }

    function getNumberOfVisitsLabelClassFromRank(rank) {
        switch (rank) {
            case 1:
                return "label-danger";
            case 2 :
                return "label-warning";
            default :
                return "label-info";
        }
    }

    function buildAnchorForElement(element) {
        return $("<a target='_blank'>").prop(
            "href",
            IdUri.htmlUrlForBubbleUri(
                element.getUri()
            )
        ).attr(
            "title",
            element.getLabel()
        );
    }

    function setTitle() {
        _container.siblings("h2").text(
            IdUri.currentUsernameInUrl()
        );
    }

    function defineNumberVisitsRank() {
        _elements.sort(function (a, b) {
            return a.getNumberOfVisits() > b.getNumberOfVisits() ?
                -1 : 1;
        });

        var amountPerRank = Math.ceil(_elements.length / NUMBER_OF_VISIT_RANKS);
        var currentRankLimit = amountPerRank;
        var currentRank = 1;
        var index = 1;
        _elements.forEach(function (element) {
            if (index <= currentRankLimit) {
                element.setVisitRank(currentRank);
            }
            if (index === currentRankLimit) {
                currentRankLimit += amountPerRank;
                currentRank++;
            }
            index++;
        });
    }

    function handleRemoveCenterBtnClick() {
        $("#remove-center-btn").off(
            "click",
            removeCenterBtnClick
        ).on(
            "click",
            removeCenterBtnClick
        );
    }

    function removeCenterBtnClick() {
        if (!checkedCenters.length) {
            return;
        }
        var centersUri = checkedCenters.map(function (center) {
            return center.getUri();
        });
        askToRemoveCenters().then(function () {
            table.bootstrapTable('remove', {field: 'uri', values: centersUri});
            checkedCenters = [];
            return CenterGraphElementService.removeCentersWithUri(
                centersUri
            );
        });
    }

    function askToRemoveCenters() {
        displayCentersLabelToRemove();
        var modal = $("#remove-centers-confirm-menu").modal();
        var hasMultipleCheckedElements = checkedCenters.length > 1;
        var askModal = AskModal.usingModalHtml(modal, hasMultipleCheckedElements);
        return askModal.ask();
    }

    function displayCentersLabelToRemove() {
        var ul = $("#remove-centers-list").empty();
        checkedCenters.forEach(function (centerElement) {
            ul.append(
                $("<li>").text(
                    centerElement.getLabel()
                )
            );
        }.bind(this));
    }
});