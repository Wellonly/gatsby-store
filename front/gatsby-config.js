const config = require("./config");

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-third`,
      options: {...config}
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Sky Lite`,
    //     short_name: `SkyLite`,
    //     start_url: `/`,
    //     background_color: `rebeccapurple`,
    //     theme_color: `rebeccapurple`,
    //     display: `standalone`,
    //     icon: `src/images/favicon.png`
    //   }
    // }
  ]
};
