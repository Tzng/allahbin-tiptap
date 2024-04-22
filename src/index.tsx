import React, { useEffect } from 'react';
import './index.css';

import '@gitee/tide/dist/style.css';
import 'highlight.js/styles/default.css';
import { ATail } from './extensions/ATail';
import { ATitle } from './extensions/ATitle';
import { AWenHao } from './extensions/AWenHao';
import { StarterKit, StarterKitOptions } from './starter-kit';

import { UploaderFunc } from '@gitee/tide-extension-uploader';
import { ParseOptions } from '@tiptap/pm/model';
import { EditorProps } from '@tiptap/pm/view';
import { ALink } from './a-link';
import { EditorRender, EditorRenderProps, TideEditor, useEditor } from './tide';

export const mockImgUploader: UploaderFunc = async (file, progressCallBack) => {
  let src = '';
  const reader = new FileReader();
  reader.onload = () => {
    src = reader.result as string;
  };
  reader.readAsDataURL(file);
  console.log('file', file);
  return new Promise(resolve => {
    let mockProgress = 1;
    const t = setInterval(() => {
      mockProgress++;
      progressCallBack(mockProgress * 10);
      if (mockProgress >= 10) {
        clearInterval(t);
        resolve(src);
      }
    }, 300);
  });
};

type IATiptapProps = Omit<EditorRenderProps, 'editor'> & {
  onChange?: (doc: any, editor: TideEditor) => void;
  onReady?: (editor: any) => void;
  editorProps?: EditorProps;
  parseOptions?: ParseOptions;
  editable?: boolean;
  imageUploader?: UploaderFunc;
  starterKitOpt?: StarterKitOptions;
  // 回传模式
  mode?: 'html' | 'md' | 'json';
  // 富文本的值 字符串或者json
  value?: any;
  // 是否是debug模式
  debug?: boolean;
  // 编辑器的高度
  height?: number;
};

const ATiptap: React.FC<IATiptapProps> = ({
  starterKitOpt,
  parseOptions,
  editorProps,
  mode,
  onChange,
  debug,
  height = 500,
  value,
  onReady,
  ...props
}) => {
  // 编辑器是否初始化完成
  const [isReady, setIsReady] = React.useState(false);
  // 当前富文本的值
  const [currentValue, setCurrentValue] = React.useState<any | undefined>();

  const editor = useEditor({
    extensions: [
      ATail,
      AWenHao,
      ATitle,
      ALink,
      StarterKit.configure({
        link: false,
        uploader: {
          image: {
            uploader: mockImgUploader
          }
        },
        ...starterKitOpt
      })
    ],
    onChange: (doc, editorNow) => {
      let strValue: any;
      if (mode === 'json') {
        strValue = doc;
      } else if (mode === 'md') {
        strValue = editorNow.getMarkdown();
      } else {
        strValue = editorNow.getHTML();
      }
      setCurrentValue(strValue);
      onChange?.(strValue, editorNow);
    },
    editorProps: editorProps,
    parseOptions: parseOptions || {},
    onReady: nowEditor => {
      if (debug) {
        console.log('editor onReady', nowEditor);
      }
      onReady?.(nowEditor);
      setIsReady(true);
    }
  });

  useEffect(() => {
    if (isReady && currentValue !== value) {
      if (debug) {
        console.log('editor setContent', value);
        setCurrentValue(value);
      }
      if (mode === 'md' || mode === 'html') {
        editor?.setContent(value || '');
      } else if (mode === 'json') {
        if (typeof value !== 'object') {
          console.error('无效的value');
        }
        editor?.setContent(value || {});
      }
    }
  }, [value, isReady]);

  return (
    <div className="main">
      <EditorRender
        editor={editor}
        style={{
          height: height
        }}
        {...props}
      />
    </div>
  );
};

export default ATiptap;
