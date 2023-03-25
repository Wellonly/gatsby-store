const path = require(`path`);
const {createProductPages, productArticleId} = require("./src/lib/createProductPages");
const {createLinkPages} = require("./src/lib/createLinkPages");
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const { makeCollectionSlug, makeCategorySlug } = require(`./src/lib/slug`);
const { mediaPath } = require(`./src/lib/media`);

exports.createPages = async (api) => {
  const { actions, graphql, reporter } = api;
  // const { createPage } = actions;
  // const allProductSlugs = new Map();
  const allLinkSlugs = [];

  const graph = await graphql(`
    {
      cms {
        allProducts(filter: { priority_gt: 0 }) {
          id
          slug
          artimages
          article
        }
        allCollections(filter: { priority_gt: 0 }) {
          id
          name
          slug
          priority
        }
        allCategories(filter: { priority_gt: 0 }) {
          id
          name
          slug
        }
        allLinks(filter: { priority_gt: 0}) {
          id
          label
          slug
          icon
          images
          content
          template
          sublinks: Sublinks(filter: { priority_gt: 0}) {
            id
            label
            slug
            icon
            images
            content
            template
          }
        }
      }
    }
  `);

  if (graph.errors) {
    reporter.panicOnBuild(`...Error while running main GraphQL query.`, graph.errors);
    return;
  }

  const {
    data: {
      cms: { allProducts, allCollections, allCategories, allLinks}
    }
  } = graph;

  return await Promise.all([
    createProductPages(api, allLinkSlugs, allProducts),
    createLinkPages(api, allLinkSlugs, allLinks),
  ]).then(ret => {
    const collectionsCount = allCollections ? allCollections.length: 0;
    console.log(`...zv collections included: ${collectionsCount}`);
    if (collectionsCount) {
      ret.push([
        allCollections.forEach(coll => {
          actions.createPage({
            path: makeCollectionSlug(coll),
            component: path.resolve(`${__dirname}/src/templates/collection.js`),
            context: {
              collId: coll.id,
            },
          });
        }),
      ]);
    }
    const categoriesCount = allCategories ? allCategories.length: 0;
    console.log(`...zv categories included: ${categoriesCount}`);
    if (categoriesCount) {
      ret.push([
        allCategories.forEach(category => {
          actions.createPage({
            path: makeCategorySlug(category),
            component: path.resolve(`${__dirname}/src/templates/category.js`),
            context: {
              categoryId: category.id,
            },
          });
        }),
      ]);
    }
    return ret;
  }).catch(err => {
    console.log("...zv createPages error:", {...err});
  });
};

// exports.onCreateNode = (props) => {
//   const { node } = props;
//   console.log("...zv: onCreateNode:", node.internal.type, {...node});
// };

exports.createResolvers = ({
                             actions,
                             cache,
                             createNodeId,
                             createResolvers,
                             store,
                             reporter,
                           }) => {
  const { createNode } = actions;
  //ok console.log("...zv: createResolvers process.cfg:", process.cfg);
  createResolvers({
    // GraphCMS_BlogPost: {
    //   createdAt: {
    //     type: `String`,
    //     resolve(source, args, context, info) {
    //       return dateformat(source.date, `fullDate`)
    //     },
    //   },
    //   post: {
    //     resolve(source, args, context, info) {
    //       return remark()
    //         .use(html)
    //         .processSync(source.post).contents
    //     },
    //   },
    // },
    CMS_Product: {
      imageFile: {
        type: `File`,
        // projection: { url: true },
        resolve(source, args, context, info) {
          reporter.info(`zv createResolvers for imageFile for:${source.images}`);
          return createRemoteFileNode({
            url: mediaPath(source.images),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
      mdx: {
        type: `Mdx`,
        resolve(source, args, context, info) {
          const articleId = productArticleId(source.id);
          return context.nodeModel.getAllNodes({ type: "Mdx" }).find(mdx => mdx.frontmatter.id === articleId);
        },
      },
    },
    MdxFrontmatter: {
      imageFile: {
        type: `File`,
        // projection: { url: true },
        resolve(source, args, context, info) {
          if (!source.docimages) return null;
          reporter.info(`zv createResolvers for MdxFrontmatter.imageFile:${source.docimages}; args:${args}; context:${context}`);
          return createRemoteFileNode({
            url: mediaPath(source.docimages),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
        },
      },
    },
  });
};
