
/**
 * @desc 去除内容中的所有标签
 * @param {*} html 
 */
const removeTag = (html) => {
    let reg = /<[^>]+>/g;
    return html.replace(reg, '');
}
/**
 * @desc 获取文章摘要，返回前300字
 * @param {*html} html 文章内容html 
 */
const getAbstract = (html) => {
    // console.log('html = ', html);
    let text = removeTag(html);
    // if (text.length <= 300) {
    //     return text;
    // }
    return text.substr(0, 300);
}

export default getAbstract;
