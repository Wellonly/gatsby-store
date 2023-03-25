
exports.mediaPath = ( path ) => {
  if (typeof path !== 'string') return '';
  if (path.startsWith('http')) return path;
  return "".concat(process.cfg.MEDIA_HOST_URL, path.split(',')[0]);
};
