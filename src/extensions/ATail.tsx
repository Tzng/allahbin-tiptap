import { Node, textblockTypeInputRule } from '@tiptap/core';

export type Level = 1 | 2 | 3;

export interface ATailOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ATail: {
      /**
       * Set a heading node
       */
      setATail: () => ReturnType;
      /**
       * Toggle a heading node
       */
      toggleATail: () => ReturnType;
    };
  }
}

// 落款
export const ATail = Node.create<ATailOptions>({
  name: 'ATail',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'a-tiptap-tail'
      }
    };
  },

  content: 'inline*',

  group: 'block',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'div.a-tiptap-tail', // 匹配带有 'tail-styles' 类的 div 元素
        getAttrs: dom => ({
          class: 'a-tiptap-tail' // 将此 div 的解析映射到 'tailStyles' 样式
        })
      }
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
      setATail:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name, {});
        },
      toggleATail:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', {});
        }
    };
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: /^!-\s$/,
        type: this.type,
        getAttributes: () => ({
          class: 'a-tiptap-tail'
        })
      })
    ];
  }
});
