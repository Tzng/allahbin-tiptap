import { mergeAttributes, Node, textblockTypeInputRule } from '@tiptap/core';

export type Level = 1 | 2 | 3;

export interface HeadingOptions {
  levels: Level[];
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ATitle: {
      /**
       * Set a heading node
       */
      setATitle: (attributes: { level: Level }) => ReturnType;
      /**
       * Toggle a heading node
       */
      toggleATitle: (attributes: { level: Level }) => ReturnType;
    };
  }
}

export const ATitle = Node.create<HeadingOptions>({
  name: 'ATitle',

  addOptions() {
    return {
      levels: [1, 2, 3],
      HTMLAttributes: {}
    };
  },

  content: 'inline*',

  group: 'block',

  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false
      }
    };
  },

  parseHTML() {
    console.log('parseHTML');
    return this.options.levels.map((level: Level) => ({
      tag: `div.a-tiptap-title${level}`,
      attrs: { level, class: `a-tiptap-title${level}` }
    }));
  },

  renderHTML({ node, HTMLAttributes }) {
    console.log('renderHTML');
    // @ts-ignore
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];
    // 根据级别来获取对应的div样式
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `a-tiptap-title${level}`
      }),
      0
    ];
  },

  addCommands() {
    return {
      // 这个命令接受一个 attributes 参数，其包含了标题的级别（比如 h1, h2 等）。
      // 命令首先检查这个级别是否包含在允许的级别列表 this.options.levels 中。
      // 如果不包含，则返回 false 表示操作无效。
      // 如果包含，则使用 commands.setNode 方法将当前节点设置为指定的标题节点。
      setATitle:
        attributes =>
        ({ commands }) => {
          console.log('setHeading');
          // @ts-ignore
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }
          return commands.setNode(this.name, attributes);
        },
      // 这个命令同样接受一个 attributes 参数，并进行类似的级别检查。
      // 如果级别有效，它将使用 commands.toggleNode 方法来切换当前节点。
      // 如果当前节点已经是指定的标题节点，则会切换成一个普通的段落节点（'paragraph'），否则会切换成指定的标题节点。
      toggleATitle:
        attributes =>
        ({ commands }) => {
          // @ts-ignore
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }
          return commands.toggleNode(this.name, 'paragraph', attributes);
        }
    };
  },

  addInputRules() {
    return this.options.levels.map(level => {
      return textblockTypeInputRule({
        find: new RegExp(`^(!{1,${level}})\\s$`),
        type: this.type,
        getAttributes: {
          level,
          class: `a-tiptap-title${level}`
        }
      });
    });
  }
});
