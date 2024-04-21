import { TideEditor } from '@gitee/tide';
import { ImageBubbleMenu } from '@gitee/tide-extension-image';
import { LinkBubbleMenu } from '@gitee/tide-extension-link';
import { MenuBarContextProvider, TextBubbleMenu } from '@gitee/tide-extension-menubar';
import { TableCellBubbleMenu } from '@gitee/tide-extension-table';
import React from 'react';
import { EditorLayout, EditorMenu } from './components';
import { EditorContent } from './components/EditorContent';

export type EditorRenderProps = {
  editor: TideEditor | null;
  className?: string;
  style?: React.CSSProperties;
  menuClassName?: string;
  menuStyle?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
};

export const EditorRender: React.FC<EditorRenderProps> = ({
  editor,
  className,
  style,
  menuClassName,
  menuStyle,
  contentClassName,
  contentStyle
}) => {
  if (!editor) {
    return null;
  }

  return (
    <EditorLayout editor={editor} style={style} className={className}>
      <MenuBarContextProvider editor={editor}>
        <EditorMenu editor={editor} menuStyle={menuStyle} menuClassName={menuClassName} />
        <EditorContent
          editor={editor}
          contentStyle={contentStyle}
          contentClassName={contentClassName}
        >
          <LinkBubbleMenu editor={editor} />
          <TableCellBubbleMenu editor={editor} />
          <ImageBubbleMenu editor={editor} />
          <TextBubbleMenu editor={editor} />
        </EditorContent>
      </MenuBarContextProvider>
    </EditorLayout>
  );
};

EditorRender.displayName = 'EditorRender';
