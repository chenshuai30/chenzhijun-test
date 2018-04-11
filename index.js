const axios = require('axios');
const util = {};
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
let session = sessionStorage.getItem('token');
if (!session) {
    window.location.href = "#/";
}
axios.interceptors.request.use(function(config) {
    config.headers['Authorization'] = "bearer " + JSON.parse(sessionStorage.getItem("token"));
    return config;
}, function(error) {
    console.log(error);
    return Promise.reject(error);
});

// post 请求
util.$post = (obj) => {
    let data;
    if (obj.data) {
        data = Object.keys(obj.data).map(item => {
            return encodeURIComponent(item) + '=' + encodeURIComponent(obj.data[item]);
        }).join('&');
    }
    axios.post(obj.url, data)
        .then(res => {
            obj.success ? obj.success(res) : null
        })
        .catch(error => {
            window.location.href = "#/";
            obj.error ? obj.error(res) : null
        })
};

util.isChrome = !!window.getComputedStyle;

//  事件监听
util.listen = function(element, event, callback) {
    if (util.isChrome) {
        element.addEventListener(event, callback, false)
    } else {
        element.attachEvent('on' + event, callback);
    }
}


//  移除事件监听
util.removeListener = function(element, event, callback) {
    if (util.isChrome) {
        element.removeEventListener(event, callback, false)
    } else {
        element.detachEvent('on' + event, callback);
    }
}

// session操作
util.session = function() {
    let len = arguments.length;
    if (len === 1) {
        return JSON.parse(sessionStorage.getItem(arguments[0]));
    } else if (len === 2) {
        sessionStorage.setItem(arguments[0], JSON.stringify(arguments[1]));
    }
}

// get请求
util.$get = function(obj) {
    let data;
    if (obj.data) {
        data = Object.keys(obj.data).map(item => {
            return encodeURIComponent(item) + '=' + encodeURIComponent(obj.data[item]);
        }).join('&');
    } else {
        data = "";
    }
    axios.get(obj.url + '?' + data).then(res => {
        obj.success ? obj.success(res) : null
    }).catch(error => {
        // console.log(error);
        window.location.href = "#/";
        // obj.error ? obj.error(error) : null
    })
}

// 对象有选择赋值
util.$copy = function() {
    let len = arguments.length;
    if (!len) {
        return {};
    } else if (len === 1) {
        if (arguments[0] instanceof Object) {
            Object.keys(arguments[0]).map(item => {
                arguments[0][item] = '';
            })
        }
    } else if (len === 2) {
        if (arguments[0] instanceof Object && arguments[1] instanceof Object) {
            Object.keys(arguments[0]).map(item => {
                if (item in arguments[1]) {
                    arguments[0][item] = arguments[1][item];
                } else {
                    arguments[0][item] = '';
                }
            })
        }
    }
}
module.exports = exports = util;