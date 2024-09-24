import { IATiptapProps, IContent2, ITiptapJson } from '@allahbin/tiptap';
import { IContent } from '@allahbin/tiptap/tide';
import hljs from 'highlight.js';
import React from 'react';

export type ILinkRender<T = any> = (node: React.ReactNode, mark: any, params: T) => React.ReactNode;

export type IRenderConfig = {
  onLinkClick?: (p: any) => void;
  /**
   * 自定义link的渲染
   */
  linkRender?: ILinkRender;
  /**
   * 自定义高亮的渲染
   */
  textRender?: (text: string) => React.ReactNode;
  /**
   * 渲染的模式 - 普通 还是 公文 自定义 - 默认是gov
   */
  renderMode?: IATiptapProps['renderMode'];
};

/**
 * 获取url的参数
 */
export function getUrlParams<T = any>(url: string): T {
  if (!url) {
    return {} as T;
  }
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

// 数组求和，接收一个数组，返回数组的和
export function sum(arr: number[]) {
  return arr.reduce((pre, cur) => pre + cur, 0);
}

class TiptapRender {
  /**
   * 渲染器的配置
   */
  config: IRenderConfig;

  /**
   * 渲染的数据json
   */
  json: ITiptapJson | undefined;

  isAfterHardBreak = false;

  constructor(json?: ITiptapJson, config?: IRenderConfig) {
    this.config =
      config ||
      ({
        renderMode: 'custom'
      } as IRenderConfig);
    this.json = json;
  }

  /**
   * link的渲染
   */
  renderLink(mark: any, marks: any[], text: string) {
    let hrefParams: any = {};
    if (mark.type === 'link') {
      hrefParams = getUrlParams(mark.attrs?.href);
    }
    const dom =
      mark.type === 'link' ? (
        <a
          key={mark.key}
          title="链接"
          href={mark.attrs?.href}
          onClick={() => {
            this.config!.onLinkClick?.(hrefParams);
          }}
          className=""
          target={mark.attrs.target}
        >
          {this.applyMarks({ marks, text })}
        </a>
      ) : null;
    if (this.config.linkRender) {
      return this.config.linkRender(dom, mark, hrefParams);
    }
    return dom;
  }

  /**
   * 自定义标记的渲染
   * @param params
   */
  applyMarks(params: { marks: any[]; text: string }): any {
    const { marks, text } = params;
    if (!marks || marks.length === 0) return this.config.textRender?.(text) || text;

    // 递归处理，将文本包裹在最后一个标记的标签中，并对剩余的标记递归调用
    const mark = marks[0];
    const remainingMarks = marks.slice(1);
    switch (mark.type) {
      case 'link':
        return this.renderLink(mark, remainingMarks, text);
      case 'bold':
        return this.renderBold(mark.key, remainingMarks, text);
      case 'italic':
        return this.renderItalic(mark.key, remainingMarks, text);
      default:
        return this.applyMarks({ marks: remainingMarks, text });
    }
  }

  renderBold(key: string, marks: any[], text: string) {
    return <strong key={key}>{this.applyMarks({ marks, text })}</strong>;
  }

  renderItalic(key: string, marks: any[], text: string) {
    return <em key={key}>{this.applyMarks({ marks, text })}</em>;
  }

  /**
   * 渲染文本
   * @param item 数据
   * @param style 样式
   */
  renderText(item: any, style?: React.CSSProperties) {
    return (
      <span key={item.key} style={style}>
        {this.applyMarks({
          marks: item.marks,
          text: item.text
        })}
      </span>
    );
  }

  /**
   * 渲染标题
   * @param item
   */
  renderHeading(item: any) {
    switch (item.attrs.level) {
      case 1:
        return (
          <h1 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
            {this.renderContent(item.content)}
          </h1>
        );
      case 2:
        return (
          <h2 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
            {this.renderContent(item.content)}
          </h2>
        );
      case 3:
        return (
          <h3 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
            {this.renderContent(item.content)}
          </h3>
        );
      case 4:
        return (
          <h4 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
            {this.renderContent(item.content)}
          </h4>
        );
      case 5:
        return (
          <h5 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
            {this.renderContent(item.content)}
          </h5>
        );
      case 6:
        return (
          <h6 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
            {this.renderContent(item.content)}
          </h6>
        );
      default:
        return (
          <h1 key={item.key} id={item.key} style={{ textAlign: item.attrs.textAlign }}>
            {this.renderContent(item.content)}
          </h1>
        );
    }
  }

  renderHardBreak(item: any) {
    this.isAfterHardBreak = true;
    return <br key={item.key} />;
  }

  /**
   * 渲染ATitle
   */
  renderATitle(item: any) {
    return (
      <div id={item.key} key={item.key} className={`a-tiptap-title${item.attrs.level}`}>
        {this.renderContent(item.content)}
      </div>
    );
  }

  /**
   * 渲染ATail
   */
  renderATail(item: any) {
    return (
      <div key={item.key} className="a-tiptap-tail">
        {this.renderContent(item.content)}
      </div>
    );
  }

  /**
   * 渲染AWenHao
   */
  renderAWenHao(item: any) {
    return (
      <div key={item.key} className="a-tiptap-wenhao">
        {this.renderContent(item.content)}
      </div>
    );
  }

  /**
   * 渲染paragraph
   */
  renderParagraph(item: any) {
    return (
      <p key={item.key}>
        <br className="ProseMirror-trailingBreak" />
      </p>
    );
  }

  /**
   * 渲染horizontalRule
   */
  renderHorizontalRule(item: any) {
    return <hr key={item.key} contentEditable="false" />;
  }

  /**
   * 渲染codeBlock
   */
  renderCodeBlock(item: any) {
    console.log('item', item);
    const language = item?.attrs?.language;
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
              <code style={{ whiteSpace: 'pre-wrap' }}>
                <div style={{ whiteSpace: 'initial', textIndent: 0, fontSize: 14 }}>
                  {item.content?.map((item: any) => {
                    let highlightedCode = item.text;
                    if (language) {
                      highlightedCode = hljs.highlight(item.text, {
                        language
                      }).value;
                    }
                    return (
                      <span
                        style={{ whiteSpace: 'pre-wrap' }}
                        key={item.key}
                        dangerouslySetInnerHTML={{
                          __html: highlightedCode
                        }}
                      />
                    );
                  })}
                </div>
              </code>
            </pre>
          </div>
        </div>
      </div>
    );
  }

  renderRow(row: IContent2, index: number) {
    return (
      <tr key={row.key || index}>
        {row.content.map((cell, index) => {
          const totalColSpanWidth = sum(cell.attrs!.colwidth);
          const config: any = {
            width: `${totalColSpanWidth}px`
          };
          if (cell.attrs!.colspan > 1) {
            config.colSpan = cell.attrs!.colspan;
          }
          if (cell.attrs!.rowspan > 1) {
            config.rowSpan = cell.attrs!.rowspan;
          }
          const pattrs: any = cell.content[0].attrs;
          delete pattrs.indent;
          console.log('pattrs', pattrs);
          return (
            // eslint-disable-next-line react/no-array-index-key
            <td key={index} {...config} style={{ width: config.width }}>
              <p style={{ ...pattrs }}>{cell.content?.[0]?.content?.[0]?.text}</p>
            </td>
          );
        })}
      </tr>
    );
  }

  /**
   * 渲染表格
   */
  renderTable(item: IContent) {
    const allWidth: number[] = [];
    item.content[0].content.forEach(cell => {
      allWidth.push(...cell.attrs!.colwidth);
    });
    const totalColSpanWidth = sum(allWidth);
    return (
      <div className="tableWrapper" key={item.key}>
        <div className="scrollWrapper">
          <table style={{ width: `${totalColSpanWidth}px`, tableLayout: 'auto' }}>
            <tbody>{item.content.map((row, index) => this.renderRow(row, index))}</tbody>
          </table>
        </div>
      </div>
    );
  }

  /**
   * 渲染图片
   */
  renderImage(item: IContent) {
    const imgClass = `tide-image tide-image__align-${item.attrs.align}`;
    return (
      <div className="react-renderer node-image" contentEditable={false} key={item.key}>
        <div
          data-drag-handle="true"
          className={imgClass}
          style={{
            whiteSpace: 'normal'
          }}
        >
          <div className="tide-image__view">
            <img
              src={item.attrs.src}
              alt=""
              style={{ width: item.attrs.width, height: item.attrs.height }}
            />
          </div>
        </div>
      </div>
    );
  }

  /**
   * 默认的渲染
   */
  renderDefault(item: any, key: number) {
    return <p key={item.key || item.type + key}>{this.renderContent(item.content)}</p>;
  }

  renderContent(content: any[]) {
    return content?.map((item, index) => {
      if (!item.key) {
        item.key = item.type + index;
      }
      if (item.type === 'text') {
        const style = this.isAfterHardBreak ? { paddingLeft: '2em' } : {};
        this.isAfterHardBreak = false;
        if (item.marks) {
          return this.renderText(item, style);
        }
        return (
          <span key={item.key} style={style}>
            {item.text}
          </span>
        );
      }
      if (item.type === 'hardBreak') {
        this.isAfterHardBreak = true;
        return <br key={item.key} />;
      }
      return <span key={item.key}>{item.text}</span>;
    });
  }

  renderType(item: IContent, index: number) {
    if (item.type === 'hardBreak') {
      return this.renderHardBreak(item);
    }
    if (item.type === 'ATitle') {
      return this.renderATitle(item);
    }
    if (item.type === 'ATail') {
      return this.renderATail(item);
    }
    if (item.type === 'AWenHao') {
      return this.renderAWenHao(item);
    }
    if (item.type === 'paragraph' && !item.content) {
      return this.renderParagraph(item);
    }
    if (item.type === 'horizontalRule') {
      return this.renderHorizontalRule(item);
    }
    if (item.type === 'codeBlock') {
      return this.renderCodeBlock(item);
    }
    if (item.type === 'heading') {
      return this.renderHeading(item);
    }
    if (item.type === 'table') {
      return this.renderTable(item);
    }
    // 如果是图片
    if (item.type === 'image') {
      return this.renderImage(item);
    }
    // 判断是不是段落之类的type
    return this.renderDefault(item, index);
  }

  render(json?: ITiptapJson, config?: IRenderConfig) {
    if (json) {
      this.json = json;
    }
    if (config) {
      this.config = config;
    }
    if (!this.json) {
      return <></>;
    }
    if (!this.json.content) {
      return <></>;
    }

    // 循环补充下key
    this.json.content.forEach((item, index) => {
      if (!item.key) {
        item.key = item.type + index;
      }
    });

    return (
      <div className={`atiptap_main_${this.config.renderMode}`}>
        <div className="tide-content">
          <div className="tiptap ProseMirror">
            {this.json.content.map((item, index) => this.renderType(item, index))}
          </div>
        </div>
      </div>
    );
  }

  // 设置config
  setConfig(config?: IRenderConfig) {
    if (config) {
      this.config = config;
    }
  }

  // 设置json
  setJson(json: ITiptapJson) {
    this.json = json;
  }
}

export default TiptapRender;
