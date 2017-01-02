/**
 * Created by frederickmacgregor on 02/01/2017.
 */
"use strict";

var SAMURAIPRINCIPLE = SAMURAIPRINCIPLE || {};

SAMURAIPRINCIPLE.eventDispatcher = function(baseObj){
    var self = baseObj;
    self.listeners = [];
    baseObj.addEventListener = function(){
        var args = Array.prototype.slice.call(arguments),
            priority = args[2] || 99,
            listener = args[1] || args[0],
            type = args[1] ? args[0] : 'none';

        self.listeners.push({listener : listener, type: type, priority : priority});

    };

    baseObj.listener = function(){
        return self.listeners[0].listener || false;
    };

    baseObj.dispatchEvent = function(){
        var args = Array.prototype.slice.call(arguments),
            argument = args[1] || args[0],
            type = args[1] ? args[0] : 'none';

        self.listeners.filter((listener)=>{
            return listener.type === type;
        }).
            sort((a,b)=>{
            return b.priority - a.priority;
        }).
        some((listener)=>{
            try{
                return listener.listener(argument) === false;
            }catch (e){
                console.log('error calling listener', e);
            }

        });
    };

    baseObj.createObservableProperty = function(prop){
        baseObj[prop] = null;

        baseObj['get' + prop] = function(){
            return baseObj[prop];
        };
        baseObj['on' + prop + 'Changed'] = function(listener){
            baseObj.addEventListener('balance changed', listener);
        };

        baseObj['set' + prop] = function(value){
            baseObj[prop] = value;
            baseObj.dispatchEvent('balance changed', value);
        };
    };
    
    return baseObj;
};
