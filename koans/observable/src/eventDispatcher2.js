var SAMURAIPRINCIPLE = SAMURAIPRINCIPLE || {};

SAMURAIPRINCIPLE.eventDispatcher = function(base){
    var registeredListener = [];

    base.createObservableProperty = function(property){
        var value;
        base['get' + property] = function () {
            return value;
        };
        base['set' + property]= function (v) {
            value = v;
            base.dispatchEvent(property + 'changed', v);
        }
        base['on' + property + 'Changed'] = function(f){
            base.addEventListener(property + 'changed', f);
        }
    };

    base.addEventListener = function(){
        var args = Array.prototype.slice.call(arguments);
        console.log("addEventListenerArgs: " + args);
        if (arguments[1] && (arguments[2] === undefined)){
            registeredListener.push({type: arguments[0], listener: arguments[1], importance: 0});
        }else if (args.length>2){
            registeredListener.push({type: arguments[0], listener: arguments[1],importance: arguments[2]});
        }else if (arguments[1] === undefined){
            registeredListener.push({type: 'none', listener: arguments[0],importance: 0});
        }
        registeredListener.sort(function(a,b){
            return  b.importance - a.importance;
        })

    };
    base.listener = function(){
        return registeredListener[0].listener;
    };
    base.dispatchEvent = function(){
        var args = Array.prototype.slice.call(arguments);
        if (args.length>1){
            var type = args.shift();
            registeredListener.some(function(listenerObj){
                if (listenerObj.type === type){
                    try{
                        outcome = listenerObj.listener.apply(listenerObj.listener,args);
                        if (outcome === false){
                            return true;
                        }
                    }catch(e){
                        console.log(e);
                    }
                }
            });
        }else{
            registeredListener.some(function(listenerObj){
                try{
                    var status = listenerObj.listener.apply(listenerObj,args);
                    if (status ===false){
                        return;
                    }
                }catch(e){
                    console.log(e)
                }
            });
        }
    };

    return base;
}

