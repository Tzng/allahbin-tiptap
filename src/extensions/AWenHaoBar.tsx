import { IconBoldBold } from '@gitee/icons-react';
import { isActive } from '@gitee/tide-common';
import { Button, MenuBarItem, Tooltip, useStatusMap } from '@gitee/tide-extension-menubar';
import React from 'react';
import { BoldProps } from '../menubar';

export type EmojiProps = {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
};

export const AWenHaoBar: React.FC<BoldProps> = ({ className, style, title }) => {
  const { editor, statusMap } = useStatusMap(() => ({
    isActive: () => {
      return isActive(editor.state, 'AWenHao');
    },
    disabled: () => {
      return !editor.state.schema.nodes.AWenHao || !editor.can().toggleWenHao();
    }
  }));

  return (
    <MenuBarItem className={className} style={style}>
      <Tooltip text="文号">
        <Button
          onClick={() => editor.chain().focus().toggleWenHao().run()}
          isActive={statusMap?.isActive}
          disabled={statusMap?.disabled}
        >
          <IconBoldBold />
        </Button>
      </Tooltip>
    </MenuBarItem>
  );
};
