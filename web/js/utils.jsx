'use strict';
import React from 'react';
import shallowCopy from 'shallow-copy';
import { Link } from 'react-router';

function _updateIn(obj, ks, func, i) {
    if (i >= ks.length) {
        return func(obj);
    } else {
        const k = ks[i];
        const newObj = obj ? shallowCopy(obj) : {};
        newObj[k] = _updateIn(newObj[k], ks, func, i + 1);
        return newObj;
    }
}

export function updateIn(obj, ks, func) {
    return _updateIn(obj, ks, func, 0);
}

export function setIn(obj, ks, val) {
    return updateIn(obj, ks, (x) => val);
}

export function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export function getHeader(method) {
    return {
        method: method,
        headers: {
            'Accept': 'application/json',
            'X-CSRFToken': readCookie('csrftoken'),
        },
        credentials: 'same-origin',
    };
}

export function objectEquals(x, y) {
    'use strict';

    if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) { return false; }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) { return x === y; }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) { return x === y; }
    if (x === y || x.valueOf() === y.valueOf()) { return true; }
    if (Array.isArray(x) && x.length !== y.length) { return false; }

    // if they are dates, they must had equal valueOf
    if (x instanceof Date) { return false; }

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) { return false; }
    if (!(y instanceof Object)) { return false; }

    // recursive object equality check
    var p = Object.keys(x);
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
        p.every(function (i) { return objectEquals(x[i], y[i]); });
}

export function objectIn(obj, list){
    for (let item of list) {
        if(objectEquals(item, obj)){
            return true;
        }
    }
    return false;
}