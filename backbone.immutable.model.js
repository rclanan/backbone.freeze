define([
    'backbone'
], function (
    Backbone
) {
    "use strict";

    var errorMessage = function(action) {
        return 'Attempting to ' + action + '  a model that is immutable. Please clone this for a mutable version.';
    };

    /**
     * Set throws an error, because you cannot set attributes on an immutable model.
     */
    var setFunction = function() {
        throw errorMessage('set attributes on');
    };

    /**
     * _validate throws an error, because you cannot validate an immutable model.
     */
    var _validateFunction =  function() {
        throw errorMessage('validate');
    };

    /**
     * Trigger throws an error, because you cannot trigger events on an immutable model.
     */
    var triggerFunction = function() {
        throw errorMessage('trigger events on');
    };

    return Backbone.Model.extend({

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
            // Call the normal backbone model constructor
            Backbone.Model.prototype.constructor.call(this, attributes, options);

            // Set the functions that the constructor needs to work to no longer work if they would 
            // be modifying the model, after the constructor is done using it
            this.set = setFunction;
            this._validate = _validateFunction;
            this.trigger = triggerFunction;
        },

        /**
         * Sync throws an error, because there is nothing to update.
         */
        sync: function() {
            throw errorMessage('call sync on');
        },

        /**
         * Unset throws an error, because you cannot unset a property on an immutable model.
         */
        unset: function() {
            throw errorMessage('unset properties on');
        },

        /**
         * Clear throws an error, because you cannot clean an immutable model.
         */
        clear: function() {
            throw errorMessage('clear');
        },

        /**
         * HasChanged throws an error, because since the model can't change, it doesn't have change events.
         */
        hasChanged: function() {
            throw errorMessage('view change events on');
        },

        /**
         * ChangedAttributes throws an error,because since the model can't change, it doesn't have change events.
         */
        changedAttributes: function() {
            throw errorMessage('view changed attributes of');
        },

        /**
         * Previous throws an error, because since the model can't change, it doesn't have a previous value.
         */
        previous: function() {
            throw errorMessage('view previous values of');
        },

        /**
         * PreviousAttributes throws an error, because since the model can't change, it doesn't have previous values.
         */
        previousAttributes: function() {
            throw errorMessage('view previous values of');
        },

        /**
         * Fetch throws an error, because you cannot fetch an immutable model.
         */
        fetch: function() {
            throw errorMessage('fetch')
        },

        /**
         * Save throws an error, because you cannot save an immutable model.
         */
        save: function() {
            throw errorMessage('save');
        },

        /**
         * Destroy throws an error, because you cannot destroy an immutable model.
         */
        destroy: function() {
            throw errorMessage('destroy');
        },

        /**
         * Url throws an error, because you cannot get the server url of an immutable model.
         */
        url: function() {
            throw errorMessage('get the server url of');
        },

        /**
         * Returns a mutable model that is a copy of this immutable one.
         *
         * @returns {Backbone.Model}
         */
        clone: function() {
            return new Backbone.Model(this.attributes);
        },

        /**
         * IsNew throws an error, because an immutable model cannot be saved to a server.
         */
        isNew: function() {
            throw errorMessage('isNew');
        },

        /**
         * IsValid throws an error, because an immutable model cannot be saved to a server.
         */
        isValid: function() {
            throw errorMessage('isValid');
        },

        /**
         * On throws an error, because you cannot listen to to an immutable model.
         */
        on: function() {
            throw errorMessage('listen to');
        },

        /**
         * Once throws an error, because you cannot listen to to an immutable model.
         */
        once: function() {
            throw errorMessage('listen to');
        },

        /**
         * Off throws an error, because you cannot listen to to an immutable model.
         */
        off: function() {
            throw errorMessage('listen to');
        },

        /**
         * StopListening throws an error, because you cannot listen to to an immutable model.
         */
        stopListening: function() {
            throw errorMessage('listen to');
        }

        /* Methods to leave alone, because they don't affect the contents of the collection:
         initialize,
         toJSON,
         get,
         escape,
         parse
         */

    });
});
