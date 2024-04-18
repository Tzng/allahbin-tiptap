import React from 'react';
import './index.css';
import { EditorRender, useEditor } from '@gitee/tide';
import { StarterKit } from '@gitee/tide-starter-kit';

import '@gitee/tide/dist/style.css';
import 'highlight.js/styles/default.css';
import { AHeading } from './component/AHeading';
import { ATiptapTail } from './component/ATiptapTail';
import { ATiptapWenHao } from './component/ATiptapWenHao';


const AEditorRender = () => {

  const editor = useEditor({
    extensions: [StarterKit, AHeading, ATiptapTail, ATiptapWenHao],
    content: '# Hello World!',
    onChange: (doc, editorNow) => {
      console.log('onChange', doc);
      console.log(editorNow.getMarkdown());
    },
    editorProps: {

    },
    parseOptions: {

    }
  });


  return (
    <EditorRender editor={editor} />
  );

}

export default AEditorRender;