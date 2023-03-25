const path = require(`path`);

// Find all of the tags used in posts and create search result pages.
exports.createPostTagFilterPages = async (api, { templates }) => {
  const { actions: { createPage }, graphql, reporter } = api;
  const paginate = templates.posts.filters.tag.pagination.resultsPerPage || 0;

  const pathPrefix = templates.posts.filters.tag.pathPrefix || "";
  const templateFileName = templates.posts.filters.tag.template;

  reporter.info(`zv: createPostTagFilterPages for ${templates.posts.path}`);

  const result = await graphql(`
      {
        allMdx {
          group(field: frontmatter___tags) {
            tag: fieldValue
            totalCount
          }
        }
      }
    `);

  // Report any errors if they occurred.
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create a page for each tag.
  const tags = result.data.allMdx.group;
  const staticTagPages = tags.map(async ({ tag }) => {
    reporter.info(`zv: createPostTagFilterPages for ${templateFileName} with tag: ${tag}`);
    const staticTagPage = createPage({
      path: `${pathPrefix}/${tag}`,
      component: path.resolve(`${__dirname}/../../src/templates/${templateFileName}.js`),
      context: {
        tag,
        postId: tag,
        limit: templates.posts.filters.tag.totalPosts
      }
    });

    if (!paginate) return staticTagPage;

    const postsWithTagResult = await graphql(`{
				allMdx(filter: {
					fileAbsolutePath: {regex: "${templates.posts.path}"},
							frontmatter: {tags: {in: ["${tag}"]}}
				}
				) {
					totalCount
				}
			}`);

    // Report any errors if they occurred.
    if (postsWithTagResult.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }

    const totalPostsWithTag = postsWithTagResult.data.allMdx.totalCount;

    const totalPages = Math.ceil( totalPostsWithTag / paginate );

    const staticTagPagination = Array.from({ length: totalPages }).map((_, i) => {
        return createPage({
            path: `${pathPrefix}/${tag}/page/${i + 1}`,
            component: path.resolve(
              `${__dirname}/../../src/templates/${templates.posts.filters.tag.pagination.template}.js`
            ),
            context: {
              limit: paginate,
              skip: i * paginate,
              totalPages: totalPostsWithTag,
              currentPage: i + 1,
              tag
            }
        });
    });

    return Promise.all([staticTagPage, ...staticTagPagination]);
  });

  return staticTagPages;
};
