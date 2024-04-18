import { Node, textblockTypeInputRule } from '@tiptap/core'

export interface HeadingOptions {
  HTMLAttributes: Record<string, any>,
}

export const ATiptapWenHao = Node.create<HeadingOptions>({
  name: 'ATiptapWenHao',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'a-tiptap-wenhao'
      },
    }
  },

  content: 'inline*',

  group: 'block',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'div.a-tiptap-wenhao',  // 匹配带有 'tail-styles' 类的 div 元素
        getAttrs: (dom) => ({
          class: 'a-tiptap-wenhao',  // 将此 div 的解析映射到 'tailStyles' 样式
        }),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    // 合并原有的HTML属性和新的类
    const attrs = {
      ...HTMLAttributes,
      class: 'a-tiptap-wenhao'
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
        find: /^!~\s$/,
        type: this.type,
        getAttributes: () => ({
          class: 'a-tiptap-wenhao',
        }),
      })
    ];
  },
})
