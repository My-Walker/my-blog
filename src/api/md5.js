import crypto from 'crypto';
/**
 * @desc md5加密
 * @param {*String} password 加密前密码 
 */
const md5 = (password) => {
    const hash = crypto.createHash('md5');
    hash.update('username');
    hash.update(password);
    hash.update('remember');
    hash.update('bsbw');
    // encoding格式 hex
    return hash.digest('hex');
}

export default md5;