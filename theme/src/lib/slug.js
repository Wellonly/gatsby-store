
exports.makeCollectionSlug = ({ slug, priority }) => {
  return `/collections/${slug || `collection-${priority}`}`;
};

exports.makeCategorySlug = ({ slug, id }) => {
  return `/categories/${slug || `category-${id}`}`;
};

exports.makeProductSlug = ({ slug, id }) => {
  return slug ? (slug.startsWith('/') ? slug: `/products/${slug}`): `/products/product-${id}`;
};

exports.makeLinkSlug = (slug, parentSlug) => {
  return !slug ? undefined:
    (slug.startsWith('/') || slug.startsWith('http')) ? slug:
      parentSlug ? `/${parentSlug}/${slug}`: `/${slug}`;
};

exports.makeOpenStreetSlug = ( latitude, longitude, latitude_box = 0.014, longitude_box = 0.004) => {
  if (!Number.isFinite(latitude) || Number.isNaN(Number.parseFloat(latitude))) return null;
  if (!Number.isFinite(longitude) || Number.isNaN(Number.parseFloat(longitude))) return null;
  const prefix='https://www.openstreetmap.org/export/embed.html?bbox=';
  const markerPrefix='&amp;layer=mapnik&amp;marker=';
  const marker = array2string2join([latitude, longitude],'%2C');
  const box = array2string2join([longitude-longitude_box, latitude-latitude_box, longitude+longitude_box, latitude+latitude_box],'%2C');
  return prefix.concat(box, markerPrefix, marker);
};

function array2string2join(arr, join) {
  return arr.map(num => Number.parseFloat(num).toString()).join(join);
}