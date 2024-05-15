import { ITiptapJson } from '@allahbin/tiptap';
import '@gitee/tide/dist/style.css';
import 'highlight.js/styles/default.css';
import React from 'react';
import './index.css';

/**
 * 获取url的参数
 */
export function getUrlParams<T = any>(url = window.location.href): T {
  const theRequest: any = {};
  if (url.indexOf('?') !== -1) {
    const str = url.split('?')[1];
    const strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
    }
  }
  return theRequest;
}

/**
 * 处理文本标记
 */
function applyMarks(params: {
  marks: any[];
  text: string;
  onLinkClick?: (p: any) => void;
  /**
   * 自定义link的渲染
   */
  linkRender?: (node: React.ReactNode) => React.ReactNode;
}): React.ReactNode {
  const { marks, text, onLinkClick, linkRender } = params;
  if (!marks || marks.length === 0) return <span>{text}</span>;

  // 递归处理，将文本包裹在最后一个标记的标签中，并对剩余的标记递归调用
  const mark = marks[0];
  const remainingMarks = marks.slice(1);
  const dom = (
    <a
      key={mark.key}
      title="查看引用"
      data-href={mark.attrs.href}
      onClick={() => {
        const params = getUrlParams(mark.attrs.href);
        onLinkClick?.(params);
      }}
      target={mark.attrs.target}
    >
      {applyMarks({ marks: remainingMarks, text, onLinkClick })}
    </a>
  );

  switch (mark.type) {
    case 'link':
      if (linkRender) {
        return linkRender(dom);
      }
      return dom;
    case 'bold':
      return (
        <strong key={mark.key}>{applyMarks({ marks: remainingMarks, text, onLinkClick })}</strong>
      );
    case 'italic':
      return <em key={mark.key}>{applyMarks({ marks: remainingMarks, text, onLinkClick })}</em>;
    default:
      return <span key={mark.key}>{applyMarks({ marks: remainingMarks, text, onLinkClick })}</span>;
  }
}

function renderText(
  item: any,
  style: any,
  config: {
    onLinkClick?: (p: any) => void;
    /**
     * 自定义link的渲染
     */
    linkRender?: (node: React.ReactNode) => React.ReactNode;
  }
) {
  return (
    <span key={item.key} style={style}>
      {applyMarks({ marks: item.marks, text: item.text, onLinkClick: config.onLinkClick })}
    </span>
  );
}

// 定义段落的数组，也就是占一行的类型有哪些
export const paragraphTypes = [
  'paragraph',
  'ATitle',
  'ATail',
  'AWenHao',
  'heading',
  'codeBlock',
  'horizontalRule',
  'hardBreak'
];

let isAfterHardBreak = false;

// 将json数据转成dom
export const jsonToDom = (
  json: ITiptapJson,
  config: {
    onLinkClick?: (p: any) => void;
    /**
     * 自定义link的渲染
     */
    linkRender?: (node: React.ReactNode) => React.ReactNode;
  }
) => {
  if (!json.content) {
    return <></>;
  }

  // 先将数据都补充下id
  const renderContent = (content: any[]) => {
    return content?.map(item => {
      if (item.type === 'text') {
        const style = isAfterHardBreak ? { paddingLeft: '2em' } : {};
        isAfterHardBreak = false;
        if (item.marks) {
          return renderText(item, style, config);
        }
        return (
          <span key={item.key} style={style}>
            {item.text}
          </span>
        );
      }
      if (item.type === 'hardBreak') {
        isAfterHardBreak = true;
        return <br key={item.key} />;
      }
      return <span key={item.key}>{item.text}</span>;
    });
  };

  return (
    <div className="tide-content">
      <div className="tiptap ProseMirror">
        {json.content.map(item => {
          if (item.type === 'hardBreak') {
            isAfterHardBreak = true;
            return <br key={item.key} />;
          }
          if (item.type === 'ATitle') {
            return (
              <div id={item.key} key={item.key} className={`a-tiptap-title${item.attrs.level}`}>
                {renderContent(item.content)}
              </div>
            );
          }
          if (item.type === 'ATail') {
            return (
              <div key={item.key} className="a-tiptap-tail">
                {renderContent(item.content)}
              </div>
            );
          }
          if (item.type === 'AWenHao') {
            return (
              <div key={item.key} className="a-tiptap-wenhao">
                {renderContent(item.content)}
              </div>
            );
          }
          if (item.type === 'paragraph' && !item.content) {
            // 空行回车
            return (
              <p key={item.key}>
                <br className="ProseMirror-trailingBreak" />
              </p>
            );
          }
          if (item.type === 'horizontalRule') {
            // 分隔线
            return <hr key={item.key} contentEditable="false" />;
          }
          if (item.type === 'codeBlock') {
            // 代码块
            return (
              <div key={item.key} className="react-renderer node-codeBlock">
                <div
                  className="tide-code-block"
                  style={{
                    whiteSpace: 'normal'
                  }}
                >
                  <div className="tide-code-block__content">
                    <pre className="hljs">
                      <code
                        style={{
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        <div
                          style={{
                            whiteSpace: 'inherit'
                          }}
                        >
                          暂不支持
                        </div>
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            );
          }
          if (item.type === 'heading') {
            switch (item.attrs.level) {
              case 1:
                return (
                  <h1 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
                    {renderContent(item.content)}
                  </h1>
                );
              case 2:
                return (
                  <h2 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
                    {renderContent(item.content)}
                  </h2>
                );
              case 3:
                return (
                  <h3 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
                    {renderContent(item.content)}
                  </h3>
                );
              case 4:
                return (
                  <h4 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
                    {renderContent(item.content)}
                  </h4>
                );
              case 5:
                return (
                  <h5 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
                    {renderContent(item.content)}
                  </h5>
                );
              case 6:
                return (
                  <h6 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
                    {renderContent(item.content)}
                  </h6>
                );
              default:
                return (
                  <h1 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
                    {renderContent(item.content)}
                  </h1>
                );
            }
          }
          // 判断是不是段落之类的type
          return <p key={item.key}>{renderContent(item.content)}</p>;
        })}
      </div>
    </div>
  );
};
