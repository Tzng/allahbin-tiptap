---
title: 高级用法
---

# 自定义渲染

在开发时候，我们可能需要自定义渲染，比如对于a标签，我们可能要添加一些点击事件，这个时候我们可以继承渲染类，然后实现一个新的渲染方法

```typescript jsx

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
```

然后我们在需要使用的时候，使用自定义的渲染类

```typescript
myEditorRender.render(jsonValue)
```

可以看下面的示例，就是把a标签渲染成h1标签，点击按钮就可以看到效果

当然也可以自定义其他的渲染函数：

```typescript
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
```

文本标注的渲染函数有：

```typescript jsx
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
```

# 示例

<code src="../example/plus.tsx"></code>
