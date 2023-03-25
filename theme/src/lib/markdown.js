
function getFrontmatterFromContent(content) {
    if (!content || !content.startsWith('---')) return {};
    const result = {};
    const frontmatterText = content.split('---')[1];
    frontmatterText.split("\n").forEach((line) => {
        if (line) {
            const delimpos = line.indexOf(':');
            if (delimpos) {
                result[line.substring(0,delimpos)] = line.substring(delimpos+1);
            }
        }
    });
    return result;
}

exports.extendFrontmatter = function extendFrontmatter(content, data) {
    content = (typeof content === 'string') ? content.trim(): '';
    const originalFrontmatterObject = getFrontmatterFromContent(content);
    const frontmatterObject = Object.assign({}, originalFrontmatterObject, data);
// console.log("...zv: originalFrontmatterObject:", {...originalFrontmatterObject}, "; frontmatterObject:", {...frontmatterObject});
    let resultContent = Object.keys(frontmatterObject).reduce((value, key) => {
        if (!frontmatterObject[key]) return value;
        return value.concat(key, ': ', frontmatterObject[key], '\n');
    }, '---\n');
    resultContent = resultContent.concat('---\n');
    if (Object.keys(originalFrontmatterObject).length) {
        resultContent = resultContent.concat(content.substring(content.indexOf('---', 3) + 4));
    } else {
        resultContent = resultContent.concat(content);
    }
    return resultContent;
};

exports.getFrontmatterFromContent = getFrontmatterFromContent;