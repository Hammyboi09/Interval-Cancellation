/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
 var cancellable = function(fn, args, t) {

    const startTime = Date.now();
    const result = [];

    const invokeFn = () => {
        const currentTime = Date.now() - startTime;
        const returnValue = fn(...args);
        result.push({
            time: currentTime,
            returned: returnValue
        });
    }

    invokeFn();
    
    const id = setInterval(invokeFn, t);

    const cancelFn = () => {
        clearInterval(id);
        console.log('Cancelled at', Date.now() - startTime, 'ms');
        console.log(result); // Optional: Log the result array when cancelled
    }

    return cancelFn;
};