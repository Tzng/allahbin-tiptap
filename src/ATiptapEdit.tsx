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

export type IATiptapProps = Omit<EditorRenderProps, 'editor'> & {
  onChange?: (doc: any, editor: TideEditor) => void;
  onReady?: (editor: any) => void;
  editorProps?: EditorProps;
  parseOptions?: ParseOptions;
  editable?: boolean;
  imageUploader?: UploaderFunc;
  starterKitOpt?: StarterKitOptions;
  /**
   * @description 回传模式
   * @default "json"
   */
  mode?: 'html' | 'md' | 'json';
  /**
   * 渲染的模式 - 普通 还是 公文 - 默认是gov
   */
  renderMode?: 'normal' | 'gov';
  /**
   * @description 富文本的值 字符串或者json
   */
  value?: any;
  /**
   * @description 是否是debug模式 debug会打印一些额外的日志
   */
  debug?: boolean;
  /**
   * @description 编辑器的高度
   */
  height?: number | string;
  /**
   * 编辑器样式
   */
  style?: React.CSSProperties;
};

const ATiptapEdit: React.FC<IATiptapProps> = ({
  starterKitOpt,
  parseOptions,
  editorProps,
  mode = 'json',
  onChange,
  debug,
  height = 500,
  value,
  style,
  onReady,
  renderMode = 'gov',
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
            uploader: props.imageUploader || mockImgUploader
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
      }
      setCurrentValue(value);
      editor?.setContent(value || '');
    }
  }, [value, isReady]);

  return (
    <div className={`main_${renderMode}`}>
      <EditorRender
        editor={editor}
        style={{
          height: height,
          ...style
        }}
        {...props}
      />
    </div>
  );
};

export default ATiptapEdit;
