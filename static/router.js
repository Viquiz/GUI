"use strict";
var getQuery = function (url) {
    var i = url.indexOf('?');
    url = url.substr(i + 1);
    var queries = url.split('&');
    var query_obj = queries.reduce(function (acc, curr) {
        var i = curr.indexOf('=');
        acc[curr.substring(0, i)] = curr.substr(i + 1);
        return acc;
    }, {});
    return query_obj;
};
