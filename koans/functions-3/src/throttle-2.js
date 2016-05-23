/**
 * Created by GB115151 on 10/05/2016.
 */
var SAMURAIPRINCIPLE = SAMURAIPRINCIPLE || {};

SAMURAIPRINCIPLE.throttle = function(){
    var args = Array.prototype.slice.call(arguments),
        fn = args[0],
        interval = args[1],
        nextCallTime = 0,
        delay = 0,
        upToDateArg = null,
        timeout;
    return function(){
        var now = new Date().getTime();
        upToDateArg = arguments[0];
        if (nextCallTime < now){
            fn(upToDateArg);
            nextCallTime = now + interval;
        }else{
            delay = nextCallTime - now;
            if(!timeout){
                timeout = setTimeout(function(){
                    timeout = undefined;
                    var now2 = new Date().getTime();
                    nextCallTime = now + interval;
                    fn(upToDateArg);
                }, delay);
            }
        }
    }
};


//SAMURAIPRINCIPLE.throttle = function(){
//    var args = arguments;
//
//    var setUp = function(f, time){
//        var lastShow = 0;
//        return function(price){
//            var now = new Date();
//            var delay = now - lastShow;
//            var offSet = (time-delay);
//            var queuedUpdate = {time: (now+offSet),price:price};
//            if (delay > time){
//                f(price);
//                lastShow = now;
//            }else{
//
//                setTimeout(f(price),offSet)
//            }
//
//        }
//    }
//    return setUp(args[0],args[1]);
//
//}