
export function mediaPathBrowser ( path ) {
  if (!path || path.startsWith('http')) return path;
  return `${window?.cfg?.MEDIA_HOST_URL || ''}/${path}`;
}
