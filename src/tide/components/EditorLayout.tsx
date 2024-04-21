import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import { EditorContextProvider, useEditorContext } from '../context/EditorContext';

import { TideEditor } from '@gitee/tide';

const Layout: React.FC<
  PropsWithChildren<{
    className?: string;
    style?: React.CSSProperties;
  }>
> = ({ style, className, children }) => {
  const { fullscreen } = useEditorContext();
  const cls = classNames('tide-editor', { 'tide-editor--fullscreen': fullscreen }, className);

  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
};

export const EditorLayout: React.FC<
  PropsWithChildren<{
    editor: TideEditor | null;
    className?: string;
    style?: React.CSSProperties;
  }>
> = ({ editor, className, style, children }) => {
  return (
    <EditorContextProvider editor={editor}>
      <Layout style={style} className={className}>
        {children}
      </Layout>
    </EditorContextProvider>
  );
};
