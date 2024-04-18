import { mergeAttributes, Node, textblockTypeInputRule } from '@tiptap/core'

export type Level = 1 | 2 | 3

export interface HeadingOptions {
  levels: Level[],
  HTMLAttributes: Record<string, any>,
}

export const AHeading = Node.create<HeadingOptions>({
  name: 'AHeading',

  addOptions() {
    return {
      levels: [1, 2, 3],
      HTMLAttributes: {},
    }
  },

  content: 'inline*',

  group: 'block',

  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false,
      },
    }
  },

  parseHTML() {
    return this.options.levels
      .map((level: Level) => ({
        tag: 'div',
        attrs: { level, class: 'a-tiptap-h' + level },
      }))
  },

  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level)
    const level = hasLevel
      ? node.attrs.level
      : this.options.levels[0]
    // 根据级别来获取对应的div样式
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
      class: 'a-tiptap-h' + level
    }), 0]
  },

  addCommands() {
    return {
      // 这个命令接受一个 attributes 参数，其包含了标题的级别（比如 h1, h2 等）。
      // 命令首先检查这个级别是否包含在允许的级别列表 this.options.levels 中。
      // 如果不包含，则返回 false 表示操作无效。
      // 如果包含，则使用 commands.setNode 方法将当前节点设置为指定的标题节点。
      setHeading: attributes => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false
        }
        return commands.setNode(this.name, attributes)
      },
      // 这个命令同样接受一个 attributes 参数，并进行类似的级别检查。
      // 如果级别有效，它将使用 commands.toggleNode 方法来切换当前节点。
      // 如果当前节点已经是指定的标题节点，则会切换成一个普通的段落节点（'paragraph'），否则会切换成指定的标题节点。
      toggleHeading: attributes => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false
        }
        return commands.toggleNode(this.name, 'paragraph', attributes)
      },
    }
  },

  addInputRules() {
    return this.options.levels.map(level => {
      return textblockTypeInputRule({
        find: new RegExp(`^(!{1,${level}})\\s$`),
        type: this.type,
        getAttributes: {
          level,
          class: 'a-tiptap-h' + level
        },
      })
    })
  },
})
