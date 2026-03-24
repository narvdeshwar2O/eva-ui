<template>
  <div class="rich-editor-wrap border border-[#EDF2F7] rounded-xl overflow-hidden transition-all"
       :class="focused ? 'border-[#0891B2] ring-4 ring-[#0891B2]/10' : ''">
    <!-- Toolbar -->
    <div class="flex items-center gap-0.5 px-3 py-2 bg-[#F8FAFC] border-b border-[#EDF2F7] flex-wrap">
      <template v-for="tool in tools">
        <div v-if="tool.type === 'divider'" :key="tool.id" class="w-px h-5 bg-slate-200 mx-1"></div>
        <button
          v-else
          :key="tool.cmd"
          @mousedown.prevent="execFormat(tool.cmd, tool.value)"
          :title="tool.title"
          :class="[
            'w-7 h-7 flex items-center justify-center rounded-lg transition-colors',
            activeFormats[tool.cmd]
              ? 'bg-[#0891B2] text-white'
              : 'text-slate-500 hover:bg-[#0891B2]/10 hover:text-[#0891B2]'
          ]"
        >
          <i v-if="tool.icon" :data-feather="tool.icon" class="w-3.5 h-3.5"></i>
          <span v-else class="text-xs font-black leading-none select-none" v-html="tool.label"></span>
        </button>
      </template>
    </div>
    <!-- Editable area -->
    <div
      ref="editor"
      contenteditable="true"
      class="rich-editor-content bg-white px-4 py-3 text-sm text-slate-800 outline-none"
      :style="{ minHeight: minHeight + 'px' }"
      :data-placeholder="placeholder"
      @focus="focused = true"
      @blur="focused = false"
      @input="onInput"
    ></div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'RichEditor',
  props: {
    value:       { type: String, default: '' },
    placeholder: { type: String, default: 'Enter text...' },
    minHeight:   { type: Number, default: 100 }
  },
  data() {
    return {
      focused: false,
      activeFormats: {},
      tools: [
        { cmd: 'bold',                label: '<b>B</b>',  title: 'Bold' },
        { cmd: 'italic',              label: '<i>I</i>',  title: 'Italic' },
        { cmd: 'underline',           label: '<u>U</u>',  title: 'Underline' },
        { cmd: 'strikeThrough',       label: '<s>S</s>',  title: 'Strikethrough' },
        { type: 'divider', id: 'd1' },
        { cmd: 'subscript',           label: 'X₂',        title: 'Subscript' },
        { cmd: 'superscript',         label: 'X²',        title: 'Superscript' },
        { type: 'divider', id: 'd2' },
        { cmd: 'insertOrderedList',   icon: 'list',       title: 'Ordered list' },
        { cmd: 'insertUnorderedList', icon: 'align-justify', title: 'Unordered list' },
        { type: 'divider', id: 'd3' },
        { cmd: 'justifyLeft',         icon: 'align-left',   title: 'Align left' },
        { cmd: 'justifyCenter',       icon: 'align-center', title: 'Align center' },
        { cmd: 'justifyRight',        icon: 'align-right',  title: 'Align right' },
        { type: 'divider', id: 'd4' },
        { cmd: 'removeFormat',        icon: 'x',            title: 'Clear formatting' },
      ]
    };
  },
  watch: {
    value(newVal) {
      if (this.$refs.editor && this.$refs.editor.innerHTML !== newVal) {
        this.$refs.editor.innerHTML = newVal || '';
      }
    }
  },
  methods: {
    execFormat(cmd, value) {
      const editor = this.$refs.editor;
      if (!editor) return;
      editor.focus();
      const sel = window.getSelection();
      if (!sel.rangeCount || !editor.contains(sel.anchorNode)) {
        const range = document.createRange();
        range.selectNodeContents(editor);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      document.execCommand(cmd, false, value || null);
      this.$emit('input', editor.innerHTML);
      this.updateActiveFormats();
    },
    onInput() {
      this.$emit('input', this.$refs.editor ? this.$refs.editor.innerHTML : '');
      this.updateActiveFormats();
    },
    updateActiveFormats() {
      const cmds = ['bold','italic','underline','strikeThrough','subscript','superscript',
                    'insertOrderedList','insertUnorderedList','justifyLeft','justifyCenter','justifyRight'];
      const next = {};
      cmds.forEach(c => { next[c] = document.queryCommandState(c); });
      this.activeFormats = next;
    },
    onSelectionChange() {
      if (this.$refs.editor) {
        const sel = window.getSelection();
        if (sel.rangeCount && this.$refs.editor.contains(sel.anchorNode)) {
          this.updateActiveFormats();
        }
      }
    }
  },
  mounted() {
    if (this.$refs.editor) {
      this.$refs.editor.innerHTML = this.value || '';
    }
    document.addEventListener('selectionchange', this.onSelectionChange);
    this.$nextTick(() => feather.replace());
  },
  updated() {
    feather.replace();
  },
  beforeDestroy() {
    document.removeEventListener('selectionchange', this.onSelectionChange);
  }
};
</script>

<style scoped>
[contenteditable][data-placeholder]:empty::before {
  content: attr(data-placeholder);
  color: #94a3b8;
  pointer-events: none;
}
</style>

<style>
.rich-editor-content ul { list-style: disc;     padding-left: 1.5rem; margin: 0.25rem 0; }
.rich-editor-content ol { list-style: decimal;  padding-left: 1.5rem; margin: 0.25rem 0; }
.rich-editor-content li { margin: 0.1rem 0; }
.rich-editor-content b, .rich-editor-content strong { font-weight: 700; }
.rich-editor-content i, .rich-editor-content em     { font-style: italic; }
.rich-editor-content u  { text-decoration: underline; }
.rich-editor-content s  { text-decoration: line-through; }
</style>
