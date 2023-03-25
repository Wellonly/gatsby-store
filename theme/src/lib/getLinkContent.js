const fs = require('fs');
const path = require(`path`);

const {fileAccessSync} = require("./file");
const {extendFrontmatter} = require("./markdown");

const importedTemplatesPath = `${__dirname}/../../../front/src/imported`;

exports.getLinkContent = function getLinkContent(fullSlug, docId, link) {
  const {icon, images, content} = link;
  let contentFName = undefined;
  let errorContent = undefined;
  if (content) {
    try {
      const resultContent = extendFrontmatter(content, {id: docId, slug: fullSlug, docimages: images, icon});
      contentFName = path.resolve(`${importedTemplatesPath}/${docId}.mdx`);
      const readback = fileAccessSync(contentFName, fs.constants.R_OK) ? fs.readFileSync(contentFName).toString(): '';
      if (readback !== resultContent) fs.writeFileSync(contentFName, resultContent);
    }
    catch (e) {
      errorContent = e ? e.toString ? e.toString(): JSON.stringify(e): 'content fail';
      console.log(`..zv: mdx error in file: ${docId}; slug: ${fullSlug}; error:`, errorContent, e);
    }
  }
  return {contentFName, errorContent};
};