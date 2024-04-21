import { Node, textblockTypeInputRule } from '@tiptap/core';

export type Level = 1 | 2 | 3;

export interface HeadingOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    AWenHao: {
      /**
       * Set a heading node
       */
      setWenHao: () => ReturnType;
      /**
       * Toggle a heading node
       */
      toggleWenHao: () => ReturnType;
    };
  }
}

export const AWenHao = Node.create<HeadingOptions>({
  name: 'AWenHao',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'a-tiptap-wenhao'
      }
    };
  },

  content: 'inline*',

  group: 'block',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'div.a-tiptap-wenhao', // 匹配带有 'tail-styles' 类的 div 元素
        getAttrs: dom => ({
          class: 'a-tiptap-wenhao' // 将此 div 的解析映射到 'tailStyles' 样式
        })
      }
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    console.log('renderHTML');
    // 合并原有的HTML属性和新的类
    const attrs = {
      ...HTMLAttributes,
      class: 'a-tiptap-wenhao'
    };
    return ['div', attrs, 0];
  },

  addCommands() {
    return {
      setWenHao:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name, {});
        },
      toggleWenHao:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', {});
        }
    };
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: /^!~\s$/,
        type: this.type,
        getAttributes: () => ({
          class: 'a-tiptap-wenhao'
        })
      })
    ];
  }
});
