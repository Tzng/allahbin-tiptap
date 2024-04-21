import type { EditorEvents, TideEditor } from '@gitee/tide';
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

export type EditorContextType = {
  editor: TideEditor | null;
  fullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
};

// @ts-ignore
export const EditorContext = createContext<EditorContextType>(null);

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (context === null) {
    throw new Error('useEditorContext must be used within a EditorContextProvider');
  }
  return context;
};

export const EditorContextProvider: React.FC<PropsWithChildren<{ editor: TideEditor | null }>> = ({
  editor,
  children
}) => {
  const [editable, setEditable] = useState(!!editor?.isEditable);
  const [fullscreen, setFullscreen] = useState(!!editor?.fullscreen);

  const value = React.useMemo(() => {
    return { editable, fullscreen, setEditable, setFullscreen, editor };
  }, [editable, fullscreen, editor]);

  useEffect(() => {
    if (!editor) return;

    setEditable(!!editor?.isEditable);
    setFullscreen(!!editor?.fullscreen);

    const updateHandle = (props: EditorEvents['update']) => {
      setEditable(props.editor.isEditable);
      setFullscreen(props.editor.fullscreen);
    };
    editor?.on('update', updateHandle);
    return () => {
      editor?.off('update', updateHandle);
    };
  }, [editor]);

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};
