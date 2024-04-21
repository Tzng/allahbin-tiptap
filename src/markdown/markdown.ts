import { Node } from '@tiptap/pm/model';
import { Markdown as TiptapMarkdown } from 'tiptap-markdown';
import { MarkdownClipboardCopy } from './clipboardCopy';
import { MarkdownClipboardPaste } from './clipboardPaste';
import { aHeadingHtmlToMd, aTailHtmlToMd, aWenHaoHtmlToMd } from './utils';

export type MarkdownOptions = {
  html?: boolean;
  tightLists?: boolean;
  tightListClass?: string;
  bulletListMarker?: string;
  linkify?: boolean;
  breaks?: boolean;
  paste?: boolean;
  copy?: boolean;
  initialContent?: any;
};

export const Markdown = TiptapMarkdown.extend<MarkdownOptions>({
  name: 'markdown',

  priority: 50,

  addOptions() {
    return {
      ...this.parent?.(),
      paste: true,
      copy: true
    };
  },

  onBeforeCreate() {
    this.parent?.();

    this.editor.storage.markdown.getMarkdown = (content?: Node) => {
      let mdStr = this.editor.storage.markdown.serializer.serialize(
        content ?? this.editor.state.doc
      );
      mdStr = aHeadingHtmlToMd(mdStr);
      mdStr = aWenHaoHtmlToMd(mdStr);
      mdStr = aTailHtmlToMd(mdStr);
      return mdStr;
    };
  },

  addExtensions() {
    return [
      ...(this.options.copy ? [MarkdownClipboardCopy] : []),
      ...(this.options.paste ? [MarkdownClipboardPaste] : [])
    ];
  },
  onCreate() {
    // @ts-ignore
    this.editor.options.content = this.editor.options.initialContent;
    // @ts-ignore
    delete this.editor.options.initialContent;
  }
});
