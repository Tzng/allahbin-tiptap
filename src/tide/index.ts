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
