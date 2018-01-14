/**
 * @desc 设置cookie
 * @param {*String} cname  key
 * @param {*String} cvalue value
 * @param {*Number} exdays 几天
 */
const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/**
 * @desc 清除cookie
 * @param {*String} name key 
 */
const clearCookie = (name) => {  
    setCookie(name, "", -1);  
}

export default {
    clearCookie,
    setCookie
}