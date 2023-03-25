const fs = require('fs');
const path = require(`path`);

const {fileAccessSync} = require("./file");
const {TestReactComponent} = require("./testReactComponent");

const internalTemplatesPath = `${__dirname}/../../src/templates`;
// const importedTemplatesPath = `${__dirname}/../../../front/src/imported`;
const importedTemplatesPath = `${__dirname}/../../src/imported`;

exports.getLinkTemplate = function getLinkTemplate(fullSlug, docId, {slug, template, content}, isError = null) {
  let templateFName;
  let errorTemplate;
  try {
    if (isError) {
        templateFName = path.resolve(`${internalTemplatesPath}/error${isLinkOrSublink(docId) ? 'link': 'sublink'}.js`);
    } else if (template && template.endsWith('.js')) { //isStandardTemplate...
        templateFName = path.resolve(`${internalTemplatesPath}/${template}`);
        errorTemplate = `template not found: ${template}`; //default value in catch{}
        fs.accessSync(templateFName, fs.constants.R_OK);
    } else if (template) {
        const templateFName_excluded = path.resolve(`${importedTemplatesPath}/${docId}.js`);
        const readback = fileAccessSync(templateFName_excluded, fs.constants.R_OK) ? fs.readFileSync(templateFName_excluded).toString(): '';
        if (readback !== template) fs.writeFileSync(templateFName_excluded, template);
        errorTemplate = `template parsing undefined`; //default value in catch{}
        const isOk = TestReactComponent(template);
        if (!isOk) throw new Error('TestReactComponent fail');
        console.log(`..zv: parse ${fullSlug}: ${templateFName_excluded} ok`);
    }
    errorTemplate = undefined; // return no errors
  }
  catch (e) {
    if (!!e) errorTemplate = JSON.stringify(e);
    console.log(`..zv: template error: ${fullSlug}: returns:`, {...e});
    templateFName = path.resolve(`${internalTemplatesPath}/error${isLinkOrSublink(docId) ? 'link': 'sublink'}.js`);
  }
  if (!templateFName) {
    if (slug === 'categories' || slug === 'collections' || slug === 'cart') {
      templateFName = path.resolve(`${internalTemplatesPath}/${slug}.js`);
    }
    else if (slug === '/') {
      templateFName = path.resolve(`${internalTemplatesPath}/home.js`);
    }
    else {
      if (content) {
        templateFName = path.resolve(`${internalTemplatesPath}/mdx.js`);
      }
      else {
        templateFName = path.resolve(`${internalTemplatesPath}/${isLinkOrSublink(docId) ? 'link' : 'sublink'}.js`);
      }
    }
  }
  return {templateFName, errorTemplate};

  function isLinkOrSublink(id) {
    return id.startsWith('0-');
  }

};