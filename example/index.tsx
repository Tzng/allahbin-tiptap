import AEditorRender, { IATiptapProps } from '@allahbin/tiptap';
import React, { useState } from 'react';

const buttonStyle = {
  margin: '0 10px',
  padding: '5px 10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default () => {
  // 富文本的值
  const [value, setValue] = useState<any>();
  // 富文本的模式
  const [mode, setMode] = useState<IATiptapProps['mode']>('html');
  // md值
  const [mdValue, setMdValue] = useState<string>();
  // json值
  const [jsonValue, setJsonValue] = useState<any>();
  // html值
  const [htmlValue, setHtmlValue] = useState<string>();
  // 编辑器的ref
  const editor = React.useRef<any>();

  // 值变化
  const onChange = (v: any, editor: any) => {
    console.log('onChange', v, editor);
    setValue(v);
    parseContentToInputBox();
  };

  // html的值变化
  const onHtmlChange = (v: string) => {
    setHtmlValue(v);
    setValue(v);
  };

  // md的值变化
  const onMdChange = (v: string) => {
    setMdValue(v);
    setValue(v);
  };

  // json的值变化
  const onJsonChange = (v: string) => {
    // 判断是否是json字符串
    if (!v.includes('{')) {
      setJsonValue('');
      return;
    }
    try {
      setJsonValue(v);
      const json = JSON.parse(v);
      setValue(json);
    } catch (e) {
      console.log('无效json');
    }
  };

  const parseContentToInputBox = () => {
    setHtmlValue(editor.current.getHTML());
    setMdValue(editor.current.getMarkdown());
    setJsonValue(JSON.stringify(editor.current.getJSON()));
  };

  return (
    <>
      <h2>运行的模式：{mode}</h2>
      <AEditorRender
        onReady={e => {
          // @ts-ignore
          window.editor = e;
          editor.current = e;
        }}
        mode={mode}
        value={value}
        onChange={onChange}
      />
      <div
        style={{
          marginTop: 12
        }}
      >
        <button
          style={buttonStyle}
          onClick={() => {
            setValue('<p>123</p>');
          }}
        >
          只读模式
        </button>
        <button
          style={buttonStyle}
          onClick={() => {
            setMode('html');
            onHtmlChange('<p>123</p>');
          }}
        >
          赋值html
        </button>
        <button
          style={buttonStyle}
          onClick={() => {
            setMode('md');
            onMdChange('! 你好');
          }}
        >
          赋值md
        </button>
        <button
          style={buttonStyle}
          onClick={() => {
            setMode('json');
            onJsonChange(
              '{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":"left","indent":0},"content":[{"type":"text","text":"阿萨达阿萨大大咋打打算111"},{"type":"text","marks":[{"type":"link","attrs":{"href":"阿萨大大","target":"_blank","data-id":123131321}}],"text":"阿萨大大"}]}]}'
            );
          }}
        >
          赋值json
        </button>
        <button style={buttonStyle} id="parseContentToInputBox" onClick={parseContentToInputBox}>
          解析数据到输入框
        </button>
      </div>
      <h3>jsonValue</h3>
      <textarea
        id="jsonValue"
        value={jsonValue}
        onChange={e => onJsonChange(e.target.value)}
        style={{
          width: '100%'
        }}
        rows={4}
      />
      <h3>htmlValue</h3>
      <textarea
        id="htmlValue"
        value={htmlValue}
        onChange={e => onHtmlChange(e.target.value)}
        style={{
          width: '100%'
        }}
        rows={4}
      />
      <h3>mdValue</h3>
      <textarea
        id="mdValue"
        value={mdValue}
        onChange={e => onMdChange(e.target.value)}
        style={{
          width: '100%'
        }}
        rows={4}
      />
    </>
  );
};
