const fs = require('fs');

const i18n = {};
i18n.en = require("./src/i18n/en");
i18n.ru = require("./src/i18n/ru");

console.log(`...zv: app runs in ${process.env.NODE_ENV} mode`/* , process.env */);

fs.mkdir('src/imported', { recursive: true }, (err) => {
  if (err) console.log('... src/imported not creatable', err);
});

module.exports = cfg => {
  process.cfg = cfg;
  //ok console.log("zv: from front to theme options:", cfg);
  const lang_country = cfg.locale.split('-');
  cfg.language = lang_country[0];
  if (lang_country.length !==2 || !i18n.hasOwnProperty(cfg.language)) {
    return console.error('...zv: define supported locale in config.js; now defined:', cfg.locale);
  }
  cfg.countryCode = lang_country[1];
  return {
    siteMetadata: {
      ...cfg,
      i18n: i18n[cfg.language],
    },
    plugins: [
      `gatsby-plugin-material-ui`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-source-graphql`,
        options: {
          url: cfg.DATA_HOST_URL,
          fieldName: `cms`,
          typeName: `CMS`,
          refetchInterval: cfg.graphqlRefetchInterval_s || 0, //0: no refetch
        },
      },
      // {
      //   resolve: `gatsby-source-filesystem`,
      //   options: {
      //     name: `markdown-pages`,
      //     path: `src/content/pages`
      //   }
      // },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `mdx-pages`,
          path: `src/imported`
        }
      },
      // {
      //   resolve: `gatsby-source-filesystem`,
      //   options: {
      //     name: `markdown-posts`,
      //     path: `src/content/posts`
      //   }
      // },
      {
        resolve: "gatsby-plugin-prefetch-google-fonts",
        options: {
          fonts: [
            {
              family: "Roboto"
            },
            {
              family: "Work Sans",
              variants: ["800"]
            }
          ]
        }
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            // {
            //   resolve: `gatsby-remark-images`,
            //   options: {
            //     maxWidth: 590,
            //   },
            // },
            // {
            //   resolve: `gatsby-remark-emojis`,
            //   options: {
            //     maxWidth: 590,
            //     size   : 64,
            //     // Add custom styles
            //     styles : {
            //       display      : 'inline',
            //       margin       : '0',
            //       'margin-top' : '1px',
            //       position     : 'relative',
            //       top          : '5px',
            //       width        : '25px'
            //     },
            //   },
            // },
          ],
        }
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: cfg.manifestName || 'manifestName',
          short_name: cfg.manifestShortName || 'manifestShortName',
          start_url: cfg.pathPrefix || `/`,
          background_color: cfg.manifestBackgroundColor || `rebeccapurple`,
          theme_color: cfg.manifestThemeColor || `rebeccapurple`,
          display: `standalone`,
          icon: cfg.favicon || `static/favicon.png`
        }
      },
      // { // gatsby-plugin-offline must go last
      //   resolve: `gatsby-plugin-offline`,
      //   options: {
      //     precachePages: [`/about-us/`, `/projects/*`],
      //   },
      // },
    ]
  };
};
