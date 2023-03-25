require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

// this constants exported in process.cfg for node
// ... and in siteMetadata for browser, then may be exported to window.cfg through template graphql(see ex.:cart.js)
module.exports = /*siteMetadata*/{
  locale: 'ru-RU', /* 'en-US', 'en-GB' */
  pathPrefix: "/",
  title: `siteTitle`,
  titleAlt: `siteTitleAlt`,
  logo: "/img/twitterImg.jpg",
  home: "http://localhost",
  homeShort: "example.com",
  description: "siteDescription",
  keyWords: "siteKeyWords",
  favicon: "static/favicon.png",
  manifestName: 'manifestName',
  manifestShortName: 'manifestShortName',
  manifestBackgroundColor: 'red',
  manifestThemeColor: 'red',
  graphqlRefetchInterval_s: 0,
  DATA_HOST_URL: 'http://localhost:8002/graphql',
  MEDIA_HOST_URL: 'http://localhost:8002/',
  CDEK_API: process.env.CDEK_API, /* test format: https://api.edu.cdek.ru/v2/oauth/token?parameters */
  CDEK_ACCOUNT: process.env.CDEK_ACCOUNT, /* test: EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI*/
  CDEK_PS: process.env.CDEK_PS, /* test: PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG*/
  PORT: 8002,
  themeColor: "#22666e",
  backgroundColor: "#ffffff",
  githubAuthor: "well",
  userEmail: `example@example.com`,
  userName: `userName`,
  avatar: `/img/avatar-me.jpg`,
  googleAnalyticsID: "",
  twitterID: "@twitterID",
  twitterSiteImg: "/img/twitterImg.jpg",
};
