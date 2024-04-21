// 配置margin
export const marginStyles = `
  margin: 12px 0;
  line-height: 1.2;
`;

export const commonStyles = `
  font-family: 宋体;
  font-size: 12pt;
  margin-top: 2px;
  margin-bottom: 2px;
  text-indent: 2em;
`;

// $$的样式 - 小三加粗居中
export const h3Styles = `
  font-family: 宋体;
  font-size: 16pt;
  font-weight: bold;
  text-align: center;
  text-indent: 0em;
  margin: 0;
`;

// $标题的样式
export const titleStyles = `
  font-family: 宋体;
  font-size: 24pt;
  font-weight: bold;
  text-align: center;
  text-indent: 0em;
  margin: 0;
  justify-content: center;
  align-items: center;
  display: flex;
`;

// 文号的样式 楷体 小四 居中，段前1.5行，段后1.5行，单倍行距1
export const wenHaoStyles = `
  font-family: 楷体;
  font-size: 12pt;
  text-align: center;
  text-indent: 0em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
`;

// 尾部样式 右对齐后方加四个字符，无段前段后，单倍行距1
export const tailStyles = `
  text-align: right;
  margin: 0;
`;

// # 标题的样式
export const title1Styles = `
  font-family: 宋体;
  font-size: 12pt;
  font-weight: bold;
  text-indent: 2em;
  margin-top: 2px;
  margin-bottom: 2px;
`;

// ## 标题的样式
export const title2Styles = `
  font-family: 楷体;
  font-size: 12pt;
  text-indent: 2em;
  margin-top: 2px;
  margin-bottom: 2px;
  line-height: 1.8em;
`;

// ### 标题的样式
export const title3Styles = `
  font-family: 宋体;
  margin-top: 2px;
  margin-bottom: 2px;
  text-align: center;
  text-indent: 0em;
  font-size: 1.125em;
  font-weight: 600;
`;

export function processMarkdownLinks(markdownText: string): string {
  // Regular expression to match link syntax in Markdown
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  // Replace link syntax with HTML anchor tags
  return markdownText.replace(linkRegex, '<a href="$2">$1</a>');
}

export const customMdRenderer = (mdContent: string) => {
  if (!mdContent) {
    return '';
  }
  const lines: string[] = mdContent.split('\n');
  const htmlLines = [];
  for (const line of lines) {
    if (line.trim() === '') {
      // 说明是空换行
      htmlLines.push('<br>');
      continue;
    }
    let htmlLine = '';
    if (line.startsWith('***')) {
      htmlLine = '<hr>';
    } else if (line.includes('***')) {
      htmlLine = line.replace(
        /\*\*\*(.*?)\*\*\*/g,
        '<span style="font-weight: bold; font-style: italic">$1</span>'
      );
    } else if (line.includes('**')) {
      htmlLine = line.replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold">$1</span>');
    } else if (line.startsWith('$$ ')) {
      htmlLine = `<div style="${h3Styles}">${line.substring(3)}</div>`;
    } else if (line.startsWith('$ ')) {
      htmlLine = `<div style="${titleStyles}">${line.substring(2)}</div>`;
    } else if (line.startsWith('!! ')) {
      htmlLine = `<div style="${h3Styles}">${line.substring(3)}</div>`;
    } else if (line.startsWith('! ')) {
      htmlLine = `<div style="${titleStyles}">${line.substring(2)}</div>`;
    } else if (line.startsWith('~~ ')) {
      // 文号处理
      htmlLine = `<div style="${wenHaoStyles}">${line.substring(3)}</div>`;
    } else if (line.startsWith('##### ')) {
      htmlLine = `<h3 style="${title3Styles} font-family: 楷体;">${line.substring(4)}</h3>`;
    } else if (line.startsWith('#### ')) {
      htmlLine = `<h3 style="${title3Styles} font-family: 楷体;">${line.substring(4)}</h3>`;
    } else if (line.startsWith('### ')) {
      htmlLine = `<h3 style="${title3Styles} font-family: 楷体;">${line.substring(4)}</h3>`;
    } else if (line.startsWith('## ')) {
      htmlLine = `<h2 style="${title2Styles} font-family: 楷体;">${line.substring(3)}</h2>`;
    } else if (line.startsWith('# ')) {
      htmlLine = `<h1 style="${title1Styles}">${line.substring(2)}</h1>`;
      // 结尾的处理
    } else if (line.startsWith('---')) {
      htmlLine = `<p style="${tailStyles}">${line.substring(3)}</p>`;
    } else {
      htmlLine = `<p style="${commonStyles}">${line}</p>`;
    }
    htmlLines.push(htmlLine);
  }
  const newMdContent = htmlLines.join('\n');
  return processMarkdownLinks(newMdContent);
};
