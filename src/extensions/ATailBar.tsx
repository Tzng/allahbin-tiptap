import { isActive } from '@gitee/tide-common';
import { BoldProps, MenuBarItem, Tooltip, useStatusMap } from '@gitee/tide-extension-menubar';
import React from 'react';
import TextButton from './TextButton';

export type EmojiProps = {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
};

export const ATailBar: React.FC<BoldProps> = ({ className, style, title }) => {
  const { editor, statusMap } = useStatusMap(() => ({
    isActive: () => {
      return isActive(editor.state, 'ATail');
    },
    disabled: () => {
      return !editor.state.schema.nodes.ATail || !editor.can().toggleATail();
    }
  }));

  return (
    <MenuBarItem className={className} style={style}>
      <Tooltip text="落款">
        <TextButton
          onClick={() => editor.chain().focus().toggleATail().run()}
          isActive={statusMap?.isActive}
          disabled={statusMap?.disabled}
          style={{
            width: 48,
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          落款
        </TextButton>
      </Tooltip>
    </MenuBarItem>
  );
};
