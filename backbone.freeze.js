define([
    './backbone.freeze.collection',
    './backbone.freeze.model'
], function (
    FreezeCollection,
    FreezeModel
) {
    "use strict";

    return {
        Collection: FreezeCollection,
        Model: FreezeModel
    };
});
