export { mockImgUploader } from './ATiptapEdit';
export type { IATiptapProps } from './ATiptapEdit';

export type { IContent2, IMark, ITiptapJson } from './tide';

export {
  generateDirectoryTree,
  jsonToDom,
  paragraphTypes,
} from './utils/TiptapUtils';

export {
  default as TiptapRender,
  getUrlParams,
  type IRenderConfig,
} from './utils/TiptapRender';
export { default as TiptapRenderFactory } from './utils/TiptapRenderFactory';

import ATiptap from './ATiptap';

export default ATiptap;
