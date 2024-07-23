import { isActive } from '@gitee/tide-common';
import { BoldProps, MenuBarItem, Tooltip, useStatusMap } from '@gitee/tide-extension-menubar';
import React from 'react';
import TextButton from '../extensions/TextButton';

export type EmojiProps = {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
};

export const AWenHaoBar: React.FC<BoldProps> = ({ className, style }) => {
  const { editor, statusMap } = useStatusMap(() => ({
    isActive: () => {
      return isActive(editor.state, 'AWenHao');
    },
    disabled: () => {
      return !editor.state.schema.nodes.AWenHao || !editor.can().toggleWenHao();
    }
  }));

  return (
    <MenuBarItem className={className}>
      <Tooltip text="文号">
        <TextButton
          onClick={() => editor.chain().focus().toggleWenHao().run()}
          isActive={statusMap?.isActive}
          disabled={statusMap?.disabled}
          style={{
            width: 48,
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          文号
        </TextButton>
      </Tooltip>
    </MenuBarItem>
  );
};
