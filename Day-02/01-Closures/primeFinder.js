
function getPrimeFinder(){
    var cache = {};

    function isPrime(n){
        console.log("processing for ", n);
        if (n <= 3) return true;
        for(var i=2; i<= (n/2); i++)
            if ( n % i === 0) return false;
        return true;
    }

    function checkPrime(n){
        var key = JSON.stringify(arguments);
        if (typeof cache[key] === "undefined")
            cache[key] = isPrime(n);
        return cache[key];
    }
    return checkPrime;
}

function getAdder(){
    var cache = {};

    function add(x,y){
        console.log("processing for ", x, " and ", y);
        return x + y;
    }

    function adder(x,y){
        var key = JSON.stringify(arguments);
        if (typeof cache[key] === "undefined")
            cache[key] = add(x,y)
        return cache[key];
    }
    return adder;
}

function memoize(fn){
    var cache = {};
    return function (){
        var key = JSON.stringify(arguments);
        if (typeof cache[key] === "undefined")
            cache[key] = fn.apply(this,arguments)
        return cache[key];
    }
}

function add(x,y){
   console.log("processing ", x , " and " , y);
   return x + y;
}

var memoizedAdd = memoize(add);

memoizedAdd(10,20);
memoizedAdd(100,200);
memoizedAdd(10,20);
memoizedAdd(100,200);


