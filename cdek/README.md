# zv: gatsby-source-api-cdek; original: gatsby-source-apiserver adapted for cdek

A gatsby source plugin for pulling in third party api data.

## Features

- Pulls data from configured api url
- Uses custom name to allow for multiple instances of plugin
- Option to download the json data to a configurable path
- Option to only download the json data, and skip inserting it into GraphQL
- Supports simple authentication through axios

## Install

```
npm install --save gatsby-source-api-cdek
```

## Change logs

- `2.1.7`: start from

## How to use

```javascript
// Place configuration options in your gatsby-config.js

plugins: [
      {
        resolve: `gatsby-source-api-cdek`,
        options: {
          //zv: first global options, then for each entity...
          // The baseUrl (domain/version)
          baseUrl: cfg.CDEK_API,
    
          // enable disk caching, if > 0
          // then the cache will be purged after the specified amount of time
          cacheLifetimeSeconds: 60 * 60 * 24, /** 1 day */

          // enable pagination if pageSize > 0
          pageSize: 1000,
    
          // Advanced authentication for Auth0
          auth0Config: {
            method: "post",
            url: "/oauth/token",
            params: {
              grant_type: "client_credentials",
              client_id: cfg.CDEK_ACCOUNT,
              client_secret: cfg.CDEK_PS
            },
            json: true
          },
    
          // Folder path where the data should be saved; This folder must already exist
          localSavePath: `${__dirname}/../tmp`,
          
          verbose: true,

          // Pass an array containing any number of the entity configuration properties (except auth0Config),
          // any not specified are defaulted to the general properties that are specified
          entitiesArray: [
            // {
            //   url: `/deliverypoints`,
            //   name: `pvz`, /* requered */
            //   data: {country_codes: cfg.countryCode},
            // },
            {
              url: `/location/cities`, /* requered */
              name: `cities`, /* requered */
              limit: 10, /* for test only */
              params: {
                country_codes: [cfg.countryCode],
              },
            },
            {
              url: `/location/regions`, /* requered */
              name: `regions`, /* requered */
              limit: 100, /* for test only */
              params: {
                country_codes: [cfg.countryCode],
              },
            },
          ]
        }
      }, /* ..end gatsby-source-api-cdek */
];
```

## How to query

Data will be available at the following points in GraphQL.

`all<TypePrefix><Name>` or `<TypePrefix><Name>` where `TypePrefix` and `Name` is replaced by the name entered in the
configuration options.

### Conflicting keys

Some of the returned keys may be transformed if they conflict with restricted keys used for
GraphQL such as the following `['id', 'children', 'parent', 'fields', 'internal']`

These conflicting keys will now show up as `alternative_id`
