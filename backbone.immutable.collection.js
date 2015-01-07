define([
    'backbone'//,
    // './backbone.immutable.model' TODO
], function (
    Backbone//,
    // ImmutableModel TODO
) {
    "use strict";
    
    var errorMessage = function(action) {
        return 'Attempting to ' + action + '  a collection that is immutable. Please clone this for a mutable version.';
    };

    /** METHODS THAT NEED TO BE INSERTED AFTER CONSTRUCTION */
    
    /**
     * Set throws an error, because you cannot set items on an immutable collection.
     */
    var setFunction = function() {
        throw errorMessage('set elements in');
    };

    /**
     * Add throws an error, because you cannot add to an immutable collection.
     */
    var addFunction = function() {
        throw errorMessage('add items to');
    };

    /**
     * Remove throws an error, because you cannot remove from an immutable collection.
     */
    var removeFunction = function() {
        throw errorMessage('remove items from');
    };

    /**
     * Returns a sorted copy of the collection in mutable form.
     * @param options
     */
    var sortFunction = (options) {
        return this.clone().sort(options);
    };

    /**
     * Trigger throws an error, because you cannot trigger events on to an immutable collection.
     */
    var triggerFunction = function() {
        throw errorMessage('trigger events on');
    };

    /**
     * Reset throws an error, because you cannot reset an immutable collection.
     */
    var resetFunction = function() {
        throw errorMessage('reset');
    };
    
    /**
     * _reset throws an error, because you cannot reset an immutable collection.
     */
    var _resetFunction = function() {
        throw errorMessage('reset');
    };

    /**
     * _prepareModel throws an error, because you cannot prepare the model of an immutable collection.
     */
    var _prepareModelFunction = function() {
        throw errorMessage('prepare the model of');
    };

    /**
     * _addReference throws an error, because you cannot add a reference to an immutable collection.
     */
    var _addReferenceFunction = function() {
        throw errorMessage('add a reference to');
    };

    /**
     * _removeReference throws an error, because you cannot remove a reference to an immutable collection.
     */
    var _removeReferenceFunction = function() {
        throw errorMessage('remove a reference to');
    };

    /**
     * _onModelEvent throws an error, because you immutable models will not fire events.
     */
    var _onModelEventFunction = function() {
        throw errorMessage('listen to a model event');
    };

    /** END METHODS */
    
    return Backbone.Collection.extend({

        /**
         * Use an immutable model, otherwise people can mess with the model itself. 
         */
        // model: ImmutableModel, TODO

        /**
         * Constructor for the immutable collection.
         * 
         * Uses all the default backbone collection constructor mechanisms, and then 
         * replaces all the methods it uses with the immutable versions. 
         * 
         * @param models
         * @param options
         */
        constructor: function (models, options) {
            // Call the normal backbone collection constructor
            Backbone.Collection.prototype.constructor.call(this, models, options);
            
            // Set the functions that the constructor needs to work to no longer work if they would 
            // be modifying the collection, after the constructor is done using it
            this.set = setFunction;
            this.add = addFunction;
            this.remove = removeFunction;
            this.sort = sortFunction;
            this.trigger = triggerFunction;
            this.reset = resetFunction;
            this._reset = _resetFunction;
            this._prepareModel = _prepareModelFunction;
            this._addReference = _addReferenceFunction;
            this._removeReference = _removeReferenceFunction;
            this._onModelEvent = _onModelEventFunction;
        },

        /**
         * Sync throws an error, because there is nothing to update. 
         */
        sync: function() {
            throw errorMessage('call sync on');
        },

        /**
         * Push throws an error, because you cannot push to an immutable collection.
         */
        push: function() {
            throw errorMessage('push items to');
        },

        /**
         * Pop throws an error, because you cannot pop from an immutable collection.
         */
        pop: function() {
            throw errorMessage('pop items from');
        },

        /**
         * Unshift throws an error, because you cannot unshift to an immutable collection.
         */
        unshift: function() {
            throw errorMessage('unshift items to');
        },

        /**
         * Shift throws an error, because you cannot shift from an immutable collection.
         */
        shift: function() {
            throw errorMessage('shift items from');
        },

        /**
         * Fetch throws an error, because you cannot fetch an immutable collection.
         */
        fetch: function() {
            throw errorMessage('fetch')
        },

        /**
         * Create throws an error, because you cannot create a new model in an immutable collection.
         */
        create: function() {
            throw errorMessage('create items in');
        },

        /**
         * Returns a mutable collection that is a copy of this immutable one.
         * 
         * @returns {Backbone.Collection}
         */
        clone: function() {
            return new Backbone.Collection(this.models);
        },

        /**
         * On throws an error, because you cannot listen to to an immutable collection.
         */
        on: function() {
            throw errorMessage('listen to');
        },

        /**
         * Once throws an error, because you cannot listen to to an immutable collection.
         */
        once: function() {
            throw errorMessage('listen to');
        },

        /**
         * Off throws an error, because you cannot listen to to an immutable collection.
         */
        off: function() {
            throw errorMessage('listen to');
        },

        /**
         * StopListening throws an error, because you cannot listen to to an immutable collection.
         */
        stopListening: function() {
            throw errorMessage('listen to');
        }
        
        /* Methods to leave alone, because they don't affect the contents of the collection:
            initialize,
            toJSON,
            slice,
            get,
            at, 
            where,
            findWhere,
            pluck,
            parse
         */
        
    });
});
