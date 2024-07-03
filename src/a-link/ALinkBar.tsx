import { IconChainBold } from '@gitee/icons-react';
import { isActive } from '@gitee/tide-common';
import { Button, command, MenuBarItem, Tooltip, useStatusMap } from '@gitee/tide-extension-menubar';
import React from 'react';

export type LinkProps = {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
};

export const ALinkBar: React.FC<LinkProps> = ({ className, style, title }) => {
  const { editor, statusMap } = useStatusMap(() => ({
    isActive: () => isActive(editor.state, 'link'),
    disabled: () =>
      !editor.state.schema.marks.link || !editor.can().chain().focus().toggleMark('link').run()
  }));
  return (
    <MenuBarItem className={className} style={style}>
      <Tooltip text={title || `链接 (${command} + K)`}>
        <Button
          onClick={() => editor?.chain().focus().toggleLink?.({ href: '' }).run()}
          isActive={statusMap?.isActive}
          disabled={statusMap?.disabled}
        >
          <IconChainBold />
        </Button>
      </Tooltip>
    </MenuBarItem>
  );
};
