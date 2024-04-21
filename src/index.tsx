import React from 'react';
import './index.css';

import '@gitee/tide/dist/style.css';
import 'highlight.js/styles/default.css';
import { ATail } from './extensions/ATail';
import { ATitle } from './extensions/ATitle';
import { AWenHao } from './extensions/AWenHao';
import { StarterKit } from './starter-kit';

import { EditorRender, useEditor } from './tide';

export default function HomePage() {
  const editor = useEditor({
    extensions: [ATail, AWenHao, ATitle, StarterKit],
    onChange: (doc, editorNow) => {
      console.log('editor', editorNow.getMarkdown());
    },
    editorProps: {},
    parseOptions: {},
    onReady: editorNow => {
      console.log('editor', editorNow);
      editorNow?.setContent('!! 你好 world !!');
    }
  });

  return (
    <div className="main">
      <EditorRender editor={editor} />
    </div>
  );
}
