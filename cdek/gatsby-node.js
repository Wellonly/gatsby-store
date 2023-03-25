require('babel-polyfill')

const axios = require('axios')
const fetch = require(`./src/fetch`)
const normalize = require(`./src/normalize`)
// const objectRef = require(`./src/helpers`).objectRef
const forEachAsync = require('./src/helpers').forEachAsync

exports.sourceNodes = async ({
  actions,
  createNodeId,
  reporter,
  getCache
}, { /** globals, then entitiesArray */
  typePrefix = 'CDEK_', /** Global type prefix of entities from server */
  baseUrl, /*** global baseUrl (domain/version) */
  method = 'get',  /**default method */
  headers = {"Content-Type": "application/json"}, /**default headers */
  skipCreateNode = false, /** if only local save to file needed */
  localSavePath, /* if specified then JSON data will be saved to local file with the entity name; This folder must already exist */
  auth0Config = false,
  // schemaType,
  verbose = false,
  cacheLifetimeSeconds = 0, /** enable disk caching, if > 0 */
  pageSize = 0, /**enable pagination if pageSize > 0 */
  entitiesArray = [{}]
}) => {
  //store the attributes in an object to avoid naming conflicts
  const attributes = {typePrefix, baseUrl, method, headers, skipCreateNode, localSavePath, pageSize/*, schemaType*/};
  const { createNode } = actions;

  if (verbose) console.log(`...zv: sourceNodes.options for cdek:`, attributes, auth0Config);

  let authorization;
  if(auth0Config) {
    console.time('\nAuthenticate user');
    try {
      if (auth0Config.params.client_id.length < 10) throw new Error('..zv: seems a problem with env config');
      const url = auth0Config.url.startsWith('/') ? baseUrl + auth0Config.url: auth0Config.url;
      const loginResponse = await axios({...auth0Config, url});
      // console.log('...zv: loginResponse:', loginResponse);
      if (loginResponse.hasOwnProperty('data')) {
        authorization = 'Bearer ' + loginResponse.data.access_token;
      }
      else {
        console.error('...zv: auth has no field: data');
      }
    } catch (error) {
      console.error('\nEncountered authentication error: ' + error);
    }
    console.timeEnd('\nAuthenticate user');
  }
  if (!authorization) return console.error('...zv: api-cdek authorization error'); //may be from cache...? no

  const cache = getCache('gatsby-source-api-cdek');

  let useCache = !!cacheLifetimeSeconds;
  if (useCache) {
    const cacheTimestamp = await cache.get('cacheTimestamp');
    if (cacheTimestamp) {
      const cacheDate = new Date(cacheTimestamp);
      const cacheMillis = cacheDate.getTime();
      const ageInMillis = Date.now() - cacheMillis;
      useCache = ageInMillis < (cacheLifetimeSeconds * 1000);
      if (!useCache) {
        reporter.info(`not using cache as its too old ${ageInMillis / 1000}s`);
      }
    }
  }

  await forEachAsync(entitiesArray, async (entity) => {
    // mix entity and general properties...
    if (verbose) console.log(`...zv: fetch entity:`, entity);
    const typePrefix = entity.typePrefix ? entity.typePrefix : attributes.typePrefix;
    const url = entity.url ? entity.url.startsWith('/') ? attributes.baseUrl + entity.url : entity.url : attributes.baseUrl;
    const method = entity.method ? entity.method : attributes.method;
    const headers = entity.headers ? entity.headers : attributes.headers;
    const skipCreateNode = entity.skipCreateNode ? entity.skipCreateNode : attributes.skipCreateNode;
    const localSavePath = entity.localSavePath ? entity.localSavePath : attributes.localSavePath;
    const pageSize = typeof entity.pageSize === 'number' ? entity.pageSize : attributes.pageSize;
    // const schemaType = entity.schemaType ? entity.schemaType : attributes.schemaType;
    const params = typeof entity.params === 'object' ? entity.params: {};
    const name = entity.name;
    const data = entity.data;
    const limit = typeof entity.limit === 'number' ? entity.limit: 0;

    if (authorization) headers.Authorization = authorization;
    // Create an entity type from prefix and name supplied by user
    let entityType = `${typePrefix}${name}`;
    // console.log(`entityType: ${entityType}`);

    // Fetch the data entities[]
    const entities = await fetch({url, method, headers, data, name, localSavePath, params, verbose, reporter, cache, useCache, shouldCache: !!cacheLifetimeSeconds, pageSize, limit});

    // If entities is a single object, add to array to prevent issues with creating nodes
    if(entities && !Array.isArray(entities)) {
      entities = [entities];
    }

    // Skip node creation if the goal is to only download the data to json files
    if(skipCreateNode) {
      return;
    }

    // Generate the nodes
    normalize.createNodesFromEntities({
        entities,
        entityType,
        // schemaType,
        createNode,
        createNodeId,
        reporter
    });
  });

  // We're done, return.
  return;
};
