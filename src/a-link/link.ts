import { isActive } from '@gitee/tide-common';
import { markInputRule } from '@tiptap/core';
import { Link as TLink, LinkOptions as TLinkOptions } from '@tiptap/extension-link';
import { showLinkEditPopup } from './menu/LinkEditPopup';

export const inputRegex = /(?:^|\s)\[(.+?)]\((.+?)\)\s$/;

export type LinkOptions = TLinkOptions;

export const ALink = TLink.extend<LinkOptions>({
  inclusive: false,

  name: 'link',

  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: false,
      linkOnPaste: false,
      autolink: true
    };
  },

  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML: element => `${element.getAttribute('href') ?? ''}`
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      'data-id': {
        default: null,
        parseHTML: element => `${element.getAttribute('data-id') ?? ''}`
      }
    };
  },

  parseHTML() {
    return [{ tag: 'a[href]:not([href *= "javascript:" i]):not([data-type])' }];
  },

  addCommands() {
    return {
      ...this.parent?.(),

      toggleLink:
        attributes =>
        ({ chain, editor }) => {
          if (isActive(editor.state, this.name)) {
            return chain().unsetLink().run();
          }
          showLinkEditPopup(this.editor, {
            defaultHref: attributes.href
          });
          return true;
        }
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-k': () => this.editor.chain().toggleLink({ href: '' }).run()
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: match => {
          const [, , href] = match;
          match.pop();
          return { href };
        }
      })
    ];
  }
});
