import { useEditor as useEditorOriginal } from '@gitee/tide-react';
import type { TideEditorOptions } from './TideEditor';
import { TideEditor } from './TideEditor';

import type { DependencyList } from 'react';

export * from './components/EditorContent';
export * from './components/EditorLayout';
export * from './components/EditorMenu';

export * from './context/EditorContext';

export * from './EditorRender';
export * from './TideEditor';

export const useEditor: (
  options: Partial<TideEditorOptions>,
  deps?: DependencyList
) => TideEditor | null = (options, deps) =>
  // @ts-ignore
  useEditorOriginal<TideEditor, TideEditorOptions>(TideEditor, options, deps);

/**
 * 数据格式
 */
export interface ITiptapJson {
  type: string | 'doc';
  content: IContent[];
  key?: string;
}

interface IContent {
  type: string;
  attrs: {
    indent: number;
    textAlign: string;
  };
  key?: string;
  content: IContent2[];
}
export interface IContent2 {
  key?: string;
  type: string;
  text?: string;
  marks?: IMark[];
  data_id?: string;
}

export interface IMark {
  type: string;
  attrs?: {
    href: string;
    target: string;
  };
}
