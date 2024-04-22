import AEditorRender, { IATiptapProps } from '@allahbin/tiptap';
import React, { useState } from 'react';

export default () => {
  // 富文本的值
  const [value, setValue] = useState<any>();
  // 富文本的模式
  const [mode, setMode] = useState<IATiptapProps['mode']>('html');
  // md值
  const [mdValue, setMdValue] = useState();
  // json值
  const [jsonValue, setJsonValue] = useState();
  // html值
  const [htmlValue, setHtmlValue] = useState();
  // 是否是只读模式
  const [readOnly, setReadOnly] = useState(false);

  // 值变化
  const onChange = (v: any, editor: any) => {
    console.log('onChange', v, editor);
    setHtmlValue(editor.getHTML());
    setMdValue(editor.getMarkdown());
    setJsonValue(editor.getJSON());
    setValue(v);
  };

  return (
    <>
      <AEditorRender mode={mode} value={value} onChange={onChange} />
      <div
        style={{
          marginTop: 12
        }}
      >
        <button
          onClick={() => {
            setValue('<p>123</p>');
          }}
        >
          只读模式
        </button>
      </div>
      <div
        style={{
          marginTop: 12
        }}
      >
        <button
          onClick={() => {
            setMode('html');
            setValue('<p>123</p>');
          }}
        >
          赋值html
        </button>
        <button
          onClick={() => {
            setMode('md');
            setValue('! 你好');
          }}
        >
          赋值md
        </button>
        <button
          onClick={() => {
            setMode('json');
            setValue({
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  attrs: {
                    textAlign: 'left',
                    indent: 0
                  },
                  content: [
                    {
                      type: 'text',
                      text: '阿萨达阿萨大大咋打打算111'
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            href: '阿萨大大',
                            target: '_blank',
                            'data-id': 123131321
                          }
                        }
                      ],
                      text: '阿萨大大'
                    }
                  ]
                }
              ]
            });
          }}
        >
          赋值json
        </button>
      </div>
      <h3>jsonValue</h3>
      <div
        style={{
          marginTop: 12
        }}
      >
        {JSON.stringify(jsonValue)}
      </div>
      <h3>htmlValue</h3>
      <div
        style={{
          marginTop: 12
        }}
      >
        {htmlValue}
      </div>
      <h3>mdValue</h3>
      <div
        style={{
          marginTop: 12
        }}
      >
        {mdValue}
      </div>
    </>
  );
};
