/* eslint-disable import/prefer-default-export */
/**
 * @description Opens a new tab with the URL provided.
 * @author Leo Santos
 * @param {url}  Required
 * @fires window.open(url, '_blank', 'noopener,noreferrer')
 */
export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};
