const { getLinkTemplate } = require("./getLinkTemplate");
const { getLinkContent } = require("./getLinkContent");
const { makeLinkSlug } = require('./slug');

/*async */function linkIterator(api, allSlugs, links, parentLink) {
  const {actions: {createPage}/*, reporter, graphql*/} = api;
  links.forEach(link => {
    const fullSlug = makeLinkSlug(link.slug, parentLink && parentLink.slug);
    const isLocalSlug = !!fullSlug && !fullSlug.startsWith('http');
    const isExist = isLocalSlug && !!allSlugs.find(slug => slug === fullSlug);
    if (isLocalSlug && !isExist) {
      allSlugs.push(fullSlug);
      const docId = `${parentLink ? parentLink.id: 0}-${link.id}`; //WARNING: parser use this format(see:getLinkTemplate())
      const { contentFName, errorContent } = getLinkContent(fullSlug, docId, link);
      const { templateFName, errorTemplate} = getLinkTemplate(fullSlug, docId, link, !!errorContent);
      createPage({
        path: fullSlug,
        component: templateFName,
        context: {
          id: docId,
          slug: fullSlug,
          linkId: link.id,
          parentId: parentLink && parentLink.id,
          error: errorContent || errorTemplate,
        },
      });
      console.log('...zv: linkIterator:', `${parentLink ? `${parentLink.label} / `: ''}${link.label}; slug: ${fullSlug}; ${templateFName} ${contentFName ? contentFName: ''}`);
    }
    else {
      if (!isExist) console.log('...zv: linkIterator: page not created:', `${parentLink ? `${parentLink.label} / `: ''}${link.label}; slug: ${fullSlug}`);
    }
    if (Array.isArray(link.sublinks) && link.sublinks.length) { //go recursive...
      /*await*/ linkIterator(api, allSlugs, link.sublinks, link);
    }
  });
}

exports.createLinkPages = linkIterator;