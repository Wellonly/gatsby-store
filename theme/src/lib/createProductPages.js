const path = require(`path`);

const {getProductArticle} = require("./getProductArticle");
const { makeProductSlug } = require('./slug');

const internalTemplatesPath = `${__dirname}/../../src/templates`;

function productArticleId(id) {
  return `art-${id}`;
}
exports.productArticleId = productArticleId;
exports.createProductPages = function createProductPages(api, allSlugs, products) {
  const {actions: {createPage}/*, reporter, graphql*/} = api;
  products.forEach(prod => {
    const fullSlug = makeProductSlug(prod);
    const articleId = productArticleId(prod.id);
    const { contentFName, errorContent } = getProductArticle(articleId, prod);
    const isSlugExist = !!allSlugs.find(slug => slug === fullSlug);
    if (!isSlugExist) { //create 1 page per slug; but article must be per product!!!
      allSlugs.push(fullSlug);
      createPage({
        path: fullSlug,
        component: path.resolve(`${internalTemplatesPath}/product.js`),
        context: {
          productId: prod.id,
          slug: prod.slug,
        },
      });
    }
    console.log('...zv: productIterator:', `slug: ${fullSlug}; ${contentFName}; ${errorContent ? errorContent: ''} ${isSlugExist ? 'page NOT created, reason: exist':''}`);
  });
};

