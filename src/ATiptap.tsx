import React from 'react';
import ATiptapEdit, { IATiptapProps } from './ATiptapEdit';
import { TideEditor } from './tide';

const ATiptap: React.FC<IATiptapProps> = ({ onChange, ...props }) => {
  const onValueChange = (doc: any, editor: TideEditor) => {
    onChange?.(doc, editor);
  };

  return <ATiptapEdit {...props} onChange={onValueChange} />;
};

export default ATiptap;
