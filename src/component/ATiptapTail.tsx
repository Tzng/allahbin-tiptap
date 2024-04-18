import { Node, textblockTypeInputRule } from '@tiptap/core'

export type Level = 1 | 2 | 3

export interface HeadingOptions {
  HTMLAttributes: Record<string, any>,
}

export const ATiptapTail = Node.create<HeadingOptions>({
  name: 'ATiptapTail',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'a-tiptap-tail'
      },
    }
  },

  content: 'inline*',

  group: 'block',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'div.a-tiptap-tail',  // 匹配带有 'tail-styles' 类的 div 元素
        getAttrs: (dom) => ({
          class: 'a-tiptap-tail',  // 将此 div 的解析映射到 'tailStyles' 样式
        }),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    // 合并原有的HTML属性和新的类
    const attrs = {
      ...HTMLAttributes,
      class: 'a-tiptap-tail'
    };
    return ['div', attrs, 0];
  },

  addCommands() {
    return {
      setHeading: attributes => ({ commands }) => {
        return commands.setNode(this.name, attributes)
      },
      toggleHeading: attributes => ({ commands }) => {
        return commands.toggleNode(this.name, 'paragraph', attributes)
      },
    }
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: /^!-\s$/,
        type: this.type,
        getAttributes: () => ({
          class: 'a-tiptap-tail',
        }),
      })
    ];
  },
})
