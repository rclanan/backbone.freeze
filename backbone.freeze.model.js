define([
    'backbone',
    'underscore'
], function (
    Backbone,
    _
) {
    "use strict";

    var errorFunction = function(action) {
        throw new Error('Attempting to ' + action + '  a model that is immutable. ' +
                        'Please clone this for a mutable version.');
    };

    /** METHODS THAT NEED TO BE INSERTED AFTER CONSTRUCTION */

    /**
     * Methods that just throw an error. They all throw an error because the action is not
     * allowed on an immutable model. These methods are inserted after construction because
     * they're used during the construction of the model.
     */
    var postConstructErroringMethods = {
        set:        'set attributes on',
        _validate:  'validate',
        trigger:    'trigger events on'
    };

    /** END POST CONSTRUCT METHODS */

    /** METHODS THAT JUST THROW AN ERROR */

    /**
     * Methods that just throw an error. There all throw an error because the action is not
     * allowed on an immutable model.
     */
    var erroringMethods = {
        sync:               'call sync on',
        unset:              'unset properties on',
        clear:              'clear',
        hasChanged:         'view change events on',
        changedAttributes:  'view changed attributes of',
        previous:           'view previous values of',
        previousAttributes: 'view previous values of',
        fetch:              'fetc',
        save:               'save',
        destroy:            'destroy',
        url:                'get the server url of',
        isNew:              'isNew',
        isValid:            'isValid',
        on:                 'listen to',
        once:               'listen to',
        off:                'listen to',
        stopListening:      'listen to'
    };

    var FreezeModel = Backbone.Model.extend({

        /**
         * Constructor for the immutable model.
         *
         * Uses all the default backbone model constructor mechanisms, and then
         * replaces all the methods it uses with the immutable versions.
         *
         * @param attributes
         * @param options
         */
        constructor: function (attributes, options) {
            // Call the normal backbone collection constructor
            Backbone.Model.prototype.constructor.call(this, attributes, options);

            // Set the functions that the constructor needs to work to no longer work if they would 
            // be modifying the model, after the constructor is done using it
            _.each(postConstructErroringMethods, function(message, methodName) {
                this[methodName] = function() {
                    errorFunction(message);
                }
            });
        },

        /**
         * Returns a mutable model that is a copy of this immutable one.
         *
         * @returns {Backbone.Model}
         */
        clone: function() {
            return new Backbone.Model(this.attributes);
        }

        /* Methods to leave alone, because they don't affect the contents of the model:
         initialize,
         toJSON,
         get,
         escape,
         parse
         */

    });

    _.each(erroringMethods, function(message, methodName) {
        FreezeModel.prototype[methodName] = function() {
            errorFunction(message);
        }
    });
    
    return FreezeModel;
});
