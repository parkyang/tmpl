var tmpl = function(str, data) {
    var source = str
        .replace(/"/g, '\\$&')
        .replace(/[\r\n]/g, '')
        .replace(/<%([^\w\s\}\)]*)\s*(.*?)\s*%>/g, function(match, mark, code) {
            if (mark === '=') {return '"+(' + code + ')+"';}
            if (mark === '') {return '";\n' + code + '\n_p+="';}
        });
    source = 'var _p="";\nwith(data||{}){\n_p+="' + source + '";\n}\nreturn _p;';
    var render = new Function('data', source);
    return data ? render(data) : render;
};
