export function Timer(callback, delay) {
    let args = arguments,
        self = this,
        timer;

    this.clear = function () {
        clearTimeout(timer);
    };

    this.pause = function () {
        this.clear();
    };

    this.resume = function () {
        timer = setTimeout(function () {
            callback.apply(self, Array.prototype.slice.call(args, 2, args.length));
        }, delay);
    };

    this.resume();
}

export function isEmpty(value) {
    if (typeof (value) === undefined || value === null || value === undefined) {
        return true;
    }
    if (Array.isArray(value) && value.length <= 0) {
        return true;
    }
    if (typeof (value) === 'object') {
        return Object.values(value).filter(item => item).length <= 0;
    }
    if (typeof (value) === 'string') {
        return value.length <= 0;
    }
    if (typeof (value) === 'number') {
        return value <= 0;
    }
    return !Boolean(value);
}
export function capitalise(text) {
    if (isEmpty(text)) return "";
    return text.charAt(0).toUpperCase() + text.slice(1)
};
