import { ITiptapJson } from '@allahbin/tiptap';
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

class TiptapRender {
  /**
   * 渲染器的配置
   */
  config: IRenderConfig;

  /**
   * 渲染的数据json
   */
  json: ITiptapJson;

  isAfterHardBreak = false;

  constructor(json: ITiptapJson, config: IRenderConfig) {
    this.config = config;
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
          title="点击查看"
          data-href={mark.attrs?.href}
          onClick={() => {
            this.config.onLinkClick?.(hrefParams);
          }}
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
  applyMarks(params: { marks: any[]; text: string }) {
    const { marks, text } = params;
    if (!marks || marks.length === 0) return <span>{text}</span>;

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
        return <span key={mark.key}>{this.applyMarks({ marks: remainingMarks, text })}</span>;
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
  renderText(item: any, style: React.CSSProperties) {
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
                <div style={{ whiteSpace: 'inherit' }}>暂不支持</div>
              </code>
            </pre>
          </div>
        </div>
      </div>
    );
  }

  /**
   * 默认的渲染
   */
  renderDefault(item: any) {
    return <p key={item.key}>{this.renderContent(item.content)}</p>;
  }

  renderContent(content: any[]) {
    return content?.map(item => {
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

  renderType(item: any) {
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
    // 判断是不是段落之类的type
    return this.renderDefault(item);
  }

  render() {
    if (!this.json.content) {
      return <></>;
    }

    return (
      <div className="tide-content">
        <div className="tiptap ProseMirror">
          {this.json.content.map(item => this.renderType(item))}
        </div>
      </div>
    );
  }
}

export default TiptapRender;
