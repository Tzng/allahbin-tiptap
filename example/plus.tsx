import AEditorRender, { jsonToDom } from '@allahbin/tiptap';
import TiptapRender from '@allahbin/tiptap/utils/TiptapRender';
import React, { useState } from 'react';

const buttonStyle = {
  marginTop: '10px',
  padding: '5px 10px',
  border: '1px solid #ccc',
  borderRadius: '5px'
};

// 自定义渲染类
class MyEditorRender extends TiptapRender {
  // 自定义按钮
  renderLink(mark: any, marks: any[], text: string) {
    return (
      <h1 rel="noopener noreferrer nofollow" style={{ color: '#000' }}>
        {text}
      </h1>
    );
  }
}

const myEditorRender = new MyEditorRender();

const defValue =
  '<table style="width: 529px"><colgroup><col style="100px"><col style="429px"></colgroup><tbody><tr><td colspan="2" rowspan="1" colwidth="100,429"><p>11</p></td></tr><tr><td colspan="1" rowspan="1" colwidth="100"><p style="text-align: center">2</p></td><td colspan="1" rowspan="1" colwidth="429"><p>3</p></td></tr></tbody></table><table style="width: 200px"><colgroup><col style="100px"><col style="100px"></colgroup><tbody><tr><td colspan="2" rowspan="1" colwidth="100,100"><p>11</p></td></tr><tr><td colspan="1" rowspan="1" colwidth="100"><p>1</p></td><td colspan="1" rowspan="1" colwidth="100"><p>1</p></td></tr></tbody></table><table style="width: 432px"><colgroup><col style="178px"><col style="254px"></colgroup><tbody><tr><td colspan="1" rowspan="1" colwidth="178"><p>啊</p></td><td colspan="1" rowspan="1" colwidth="254"><p>11</p></td></tr><tr><td colspan="1" rowspan="1" colwidth="178"><p>212312</p></td><td colspan="1" rowspan="1" colwidth="254"><p>试试</p></td></tr></tbody></table><p>第五十条 <a target="_blank" rel="noopener noreferrer nofollow" href="%EF%BC%82%2Fsearch?channelid=3&amp;searchword=bbrq=%281998%2E09%2E01%20to%202009%2E05%2E01%29%20and%20%E6%AD%A3%E6%96%87=%28%27%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E6%B6%88%E9%98%B2%E6%B3%95%27%20pre%2F16%20%E7%AC%AC%E4%BA%94%E5%8D%81%E6%9D%A1%2B%27%E6%B6%88%E9%98%B2%E6%B3%95%27%20pre%2F16%20%E7%AC%AC%E4%BA%94%E5%8D%81%E6%9D%A1%2B%27%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E6%B6%88%E9%98%B2%E6%B3%95%EF%BC%88%EF%BC%92%EF%BC%90%EF%BC%90%EF%BC%98%E5%B9%B4%EF%BC%89%27%20pre%2F16%20%E7%AC%AC%E4%BA%94%E5%8D%81%E6%9D%A1%2B%27%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E6%B6%88%E9%98%B2%E6%B3%95%EF%BC%88%EF%BC%92%EF%BC%90%EF%BC%91%EF%BC%99%E5%B9%B4%EF%BC%89%27%20pre%2F16%20%E7%AC%AC%E4%BA%94%E5%8D%81%E6%9D%A1%2B%27%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E6%B6%88%E9%98%B2%E6%B3%95%EF%BC%88%EF%BC%92%EF%BC%90%EF%BC%92%EF%BC%91%E5%B9%B4%EF%BC%89%27%20pre%2F16%20%E7%AC%AC%E4%BA%94%E5%8D%81%E6%9D%A1%29%20not%20%E6%B3%95%E8%A7%84%E5%88%86%E7%B1%BB%E5%8F%B7=111601199801%EF%BC%82" data-id="">(8) </a>火灾扑灭后，为隐瞒、掩饰起火原因、推卸责任，故意破坏现场或者伪造现场，尚不构成犯罪的，处警告、罚款或者十五日以下拘留。<br>单位有前款行为的，处警告或者罚款，并对其直接负责的主管人员和其他直接责任人员依照前款的规定处罚。</p><p>第五十一条 <a target="_blank" rel="noopener noreferrer nofollow" href="%EF%BC%82%2Fdetail?record=1&amp;channelid=3&amp;presearchword=bbrq=%281998%2E09%2E01%20to%202009%2E05%2E01%29%20and%20%E6%AD%A3%E6%96%87=%28%27%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E6%B6%88%E9%98%B2%E6%B3%95%27%20pre%2F16%20%E7%AC%AC%E4%BA%94%E5%8D%81%E4%B8%80%E6%9D%A1%2B%27%E6%B6%88%E9%98%B2%E6%B3%95%27%20pre%2F16%20%E7%AC%AC%E4%BA%94%E5%8D%81%E4%B8%80%E6%9D%A1%2B%27%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E6%B6%88%E9%98%B2%E6%B3%95%EF%BC%88%EF%BC%92%EF%BC%90%EF%BC%90%EF%BC%98%E5%B9%B4%EF%BC%89%27%20pre%2F16%20%E7%AC%AC%E4%BA%94%E5%8D%81%E4%B8%80%E6%9D%A1%2B%27%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E6%B6%88%E9%98%B2%E6%B3%95%EF%BC%88%EF%BC%92%EF%BC%90%EF%BC%91%EF%BC%99%E5%B9%B4%EF%BC%89%27%20pre%2F16%20%E7%AC%AC%E4%BA%94%E5%8D%81%E4%B8%80%E6%9D%A1%2B%27%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E6%B6%88%E9%98%B2%E6%B3%95%EF%BC%88%EF%BC%92%EF%BC%90%EF%BC%92%EF%BC%91%E5%B9%B4%EF%BC%89%27%20pre%2F16%20%E7%AC%AC%E4%BA%94%E5%8D%81%E4%B8%80%E6%9D%A1%29%20not%20%E6%B3%95%E8%A7%84%E5%88%86%E7%B1%BB%E5%8F%B7=111601199801#law_firsthit%EF%BC%82" data-id="">(1) </a>对违反本法规定行为的处罚，由公安消防机构裁决。对给予拘留的处罚，由公安机关依照 <a target="_blank" rel="noopener noreferrer nofollow" href="%EF%BC%82%2Fgolaw?dbnm=gjfg&amp;flid=111605199401%EF%BC%82" data-id="">治安管理处罚条例 </a>的规定裁决。<br>责令停产停业，对经济和社会生活影响较大的，由公安消防机构报请当地人民政府依法决定，由公安消防机构执行。</p>';

export default () => {
  // 富文本的值
  const [value, setValue] = useState<any>('');
  // json值
  const [jsonValue, setJsonValue] = useState<any>();
  // 编辑器的ref
  const editor = React.useRef<any>();

  // 值变化
  const onChange = (v: any, editor: any) => {
    console.log('onChange', v, editor);
    setValue(v);
    parseContentToInputBox();
  };

  const parseContentToInputBox = () => {
    setTimeout(() => {
      setJsonValue(editor.current.getJSON());
    }, 200);
  };

  console.log('jsonValue', jsonValue);

  return (
    <>
      <AEditorRender
        onReady={e => {
          // @ts-ignore
          window.editor = e;
          editor.current = e;
        }}
        mode="json"
        value={value}
        onChange={onChange}
      />
      <button
        style={{
          marginTop: 10
        }}
        onClick={() => onChange(defValue, editor)}
      >
        渲染到div中
      </button>
      <div style={buttonStyle}>{jsonToDom(jsonValue)}</div>
      <h4>自定义渲染函数</h4>
      <div style={buttonStyle}>{myEditorRender.render(jsonValue)}</div>
    </>
  );
};
