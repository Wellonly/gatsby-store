const fs = require('fs');
const path = require(`path`);

const {fileAccessSync} = require("./file");
const {extendFrontmatter} = require("./markdown");

const importedTemplatesPath = `${__dirname}/../../../front/src/imported`;

exports.getProductArticle = function getProductArticle(docId, prood) {
  const {artimages, article} = prood;
  let contentFName = undefined;
  let errorContent = undefined;
  try {
    let resultContent = extendFrontmatter(article, {id: docId, docimages: artimages});
    if (!article && !!artimages) {
      const defaultContent = artimages.split(',').reduce((acc, value) => {
        if (!value) return acc;
        return acc.concat(`<Image src="${value}"/>\n`);
      }, '');
      resultContent = resultContent.concat(defaultContent);
    }
    contentFName = path.resolve(`${importedTemplatesPath}/${docId}.mdx`);
    const readback = fileAccessSync(contentFName, fs.constants.R_OK) ? fs.readFileSync(contentFName).toString(): '';
    if (readback !== resultContent) fs.writeFileSync(contentFName, resultContent);
    // console.log(`..zv: content for page: ${fullSlug}: ${contentFName} saved ok`);
  }
  catch (e) {
    errorContent = e ? e.toString ? e.toString(): JSON.stringify(e): 'content fail';
    console.log(`..zv: product mdx error in file: ${docId}; error:`, errorContent, e);
  }
  return {contentFName, errorContent};
};