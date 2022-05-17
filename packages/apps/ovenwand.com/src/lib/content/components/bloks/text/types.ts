export type NodeType = 'doc' | 'heading' | 'paragraph' | 'code_block' | 'text';
export type ParentNode = { content: RichTextNode[] };
export type DocNode = { type: 'doc' } & ParentNode;
export type HeadingNode = { type: 'heading'; attrs: { level: number } } & ParentNode;
export type ParagraphNode = { type: 'paragraph' } & ParentNode;
export type CodeBlockNode = { type: 'code_block'; attrs: { class: string } } & ParentNode;
export type TextNode = { type: 'text'; text: string; marks?: { type: string }[] };
export type RichTextNode = DocNode | HeadingNode | ParagraphNode | CodeBlockNode | TextNode;
