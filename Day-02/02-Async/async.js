/* Sync */

function addSync(x,y){
    console.log("[SP] processing the inputs");
    var result = x + y;
    console.log("[SP] returning result");
    return result;
}

function addSyncClient(x,y){
    console.log("[SC] triggering the operation");
    var result = addSync(x,y);
    console.log("[SC] result = ", result);
}

/* Async - Using Callbacks */

function addAsyncUsingCallback(x,y, onResult){
    console.log("[SP] processing the inputs");
    setTimeout(function(){
        var result = x + y;
        console.log("[SP] returning result");
        if (typeof onResult === "function")
            onResult(result);
    },3000);
}

function addAsyncUsingCallbackClient(x,y){
    console.log("[SC] triggering the operation");
    addAsyncUsingCallback(x,y, function(result){
        console.log("[SC] result = ", result);
    });
}

/* Async - Using Events */

function getAdder(){
    var callbacks = [];
    return {
        add : function(x,y){
            console.log("[SP] processing the inputs");
            setTimeout(function(){
                var result = x + y;
                console.log("[SP] returning result");
                callbacks.forEach(function(callback){
                    callback(result);
                })
            },3000);
        },
        subscribe : function(callback){
            callbacks.push(callback);
        }
    }
}

var adder = getAdder();
adder.subscribe(function(result){
    console.log("[SC] result = ", result);
});
adder.add(100,200);

/* Async - Using Promise */


function add(x,y){
   var promise = new Promise(function(resolve, reject){
       console.log("[SP] processing the inputs");
        setTimeout(function(){
            var result = x + y;
            console.log("[SP] returning result");
            resolve(result);
        },3000);
   });
    return promise;
}


//Client
var promise = add(x,y);

setTimeout(function(){
    console.log("subscribing to the result AFTER the add operation is completed");
    promise.then(function(result){
      console.log("[SC] result = ", result);
    });
}, 5000);








