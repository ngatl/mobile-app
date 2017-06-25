import { isIOS } from 'tns-core-modules/platform';

export const backIcon = function () {
  return `fa-${isIOS ? 'angle-left' : 'arrow-left'}`;
}

export const moreIcon = function () {
  return `fa-ellipsis-${isIOS ? 'h' : 'v'}`;
}