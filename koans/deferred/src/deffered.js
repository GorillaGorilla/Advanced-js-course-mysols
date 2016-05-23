/**
 * Created by GB115151 on 11/05/2016.
 */
var SAMURAIPRINCIPLE = SAMURAIPRINCIPLE || {};

SAMURAIPRINCIPLE.Deferred = function() {
    var self = this;
    var callback = [];
    var failedCallbacks = [];
    var fArgs = null;
    self.state = "none";
    var deffereds = [];
    self.cbArgs = null;
    var allResolved = function(){
        var outcome = true;
        outcome = !deffereds.some(function(fn){
            console.log("state: " + fn.state);
            return fn.state !== "resolved"
        });
        return outcome;
    };
    var anyRejected = function() {
        return deffereds.some(function(fn){
            return fn.state === "rejected";
        });
    };
    self.done = function(fn){
        callback.push(fn);
        if (self.cbArgs){
            fn.apply(null, self.cbArgs);
        }
        return self;
        };

    self.resolve = function(){
        self.cbArgs = Array.prototype.slice.call(arguments);
        self.state = "resolved";
        callback.some(function(element){
            var result = element.apply(null,self.cbArgs);
            return (result === false);
        });
        return self;
    };

    self.failed = function() {
        failedCallbacks.push(arguments[0]);
        if (fArgs){
            failedCallbacks.forEach(function (f){
                f.apply(null, fArgs);
            })
        }
        return self;
    };

    self.reject = function(){
        fArgs = Array.prototype.slice.call(arguments);
        self.state = "rejected";
        failedCallbacks.forEach(function (f){
            f.apply(null, fArgs);
        })
        return self
    };

    self.then = function(fn1, fn2) {
        self.done(fn1);
        self.failed(fn2);
        return self;
    };

    self.when = function() {
        var args = Array.prototype.slice.call(arguments);
        args.forEach(function(fn){
            deffereds.push(fn);
        });
        if (allResolved()){
            self.resolve();
        }
        if (anyRejected()){
            self.reject();
        }
        return self;
    };
    return self;
};