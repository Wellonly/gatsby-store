const path = require(`path`);

/* Find all of the markdown files, sorted descending by filename.
 * Newest-to-oldest with YYYY-MM-DD date file prefix.
 */

exports.createMdxPages = async (api, { regex, template, pathPrefix = "", paginate = 0 }, templates) => {
  const { actions: { createPage }, graphql, reporter } = api;

  reporter.info(`zv: createMdxPages for: ${regex}; template: ${template}`);
  const result = await graphql(`
			{
				allMdx(
					filter: { fileAbsolutePath: { regex: "${regex}" } }
					sort: { order: DESC, fields: [fileAbsolutePath] }
				) {
					edges {
						node {
							body
							fileAbsolutePath
							frontmatter {
								id
							}
						}
					}
				}
			}
		`);

  // Report any errors if they occurred.
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Iterate through the query results to create individual pages.
  const pages = result.data.allMdx.edges;

  // Calculate the number of paginated results pages.
  const totalPages = Math.ceil( pages.length / Math.max(paginate, 1) );

  const staticPages = pages.map(({ node }, index) => {
    // Use a permalink based on the frontmatter id in each markdown file header.
    const postId = node.frontmatter.id;

    // Define the date based on the filename.
    const postDate = path.basename(node.fileAbsolutePath).split("-").splice(0, 3).join("-");

    // The path to the previous page.
    const previousPath = (index === pages.length - 1) ? null : `/${pathPrefix}/${pages[index + 1].node.frontmatter.id}`;

    // The path to the next page.
    const nextPath = index === 0 ? null : `/${pathPrefix}/${pages[index - 1].node.frontmatter.id}`;

    reporter.info(`zv: createMdxPages for ${template} with postId: ${postId}`);

    return createPage({
      path: `${pathPrefix}/${postId}`,
      component: path.resolve(`${__dirname}/../../src/templates/${template}.js`),
      context: {
        postId,
        postDate,
        previousPath,
        nextPath
      }
    });
  });

  return !paginate
    ? staticPages
    : Promise.all([
      ...staticPages,
      Array.from({ length: totalPages }).map((_, i) =>
        createPage({
          path: `${pathPrefix}/page/${i + 1}`,
          component: path.resolve(`${__dirname}/../../src/templates/${templates.posts.pagination.template}.js`),
          context: {
            limit: paginate,
            skip: i * paginate,
            totalPages,
            currentPage: i + 1
          }
        })
      )
    ]);
};
