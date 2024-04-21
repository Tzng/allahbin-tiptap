import { useEditor as useEditorOriginal } from '@gitee/tide-react';

import { TideEditor, TideEditorOptions } from '@gitee/tide';
import type { DependencyList } from 'react';

export const useEditor: (
  options: Partial<TideEditorOptions>,
  deps?: DependencyList
) => TideEditor | null = (options, deps) =>
  // @ts-ignore
  useEditorOriginal<TideEditor, TideEditorOptions>(TideEditor, options, deps);

export * from './EditorRender';
