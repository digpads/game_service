
/**
 * Created by shiba on 2018/03/21.
 * Updated by shiba on 2018/03/21.
 */

module.exports.param = function(url){
    var match,
    pl = /\+/g,
    search = /([^&=]+)=?([^&]*)/g,
    decode = function(s) {
    return decodeURIComponent(s.replace(pl, " "));
    },
    query = url.split("?")[1];
    urlParams = {};
    while (match = search.exec(query))
    urlParams[decode(match[1])] = decode(match[2]);
    return urlParams;
};


