<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('navigate', 'list_notice')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Notice Board</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">{{ isEdit ? 'Edit' : 'Create' }}</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">{{ isEdit ? 'Edit' : 'Add' }} Notice</h2>
 </div>
 </div>
 <button @click="$emit('navigate', 'list_notice')" class="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-950 text-white shadow-xl shadow-blue-950/20 hover:bg-blue-900 transition-all">
 <feather type="list" size="18"></feather>
 <span class="text-[11px] font-black uppercase tracking-[0.1em]">List Notices</span>
 </button>
 </div>

 <!-- CREATE FORM -->
 <div class="glass-card bg-white/80 backdrop-blur-md border border-blue-200/60 p-10">
 <div class="text-left space-y-8">
 
 <!-- Notice Title -->
 <div class="space-y-2">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1">Notice Title <span class="text-rose-500">*</span></label>
 <input type="text" v-model="form.title" placeholder="Enter notice title..." class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all" />
 </div>

 <!-- Notice Message (Wysiwyg Mock) -->
 <div class="space-y-2">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1">Notice Message <span class="text-rose-500">*</span></label>
 <div class="rounded-3xl border border-blue-200 overflow-hidden bg-white">
 <div class="bg-blue-50/50 border-b border-blue-200 px-4 py-2 flex items-center gap-4 text-blue-500">
 <div class="flex items-center gap-4 px-2 border-r border-blue-200">
 <feather type="bold" size="14" class="cursor-pointer hover:text-blue-600"></feather>
 <feather type="" size="14" class="cursor-pointer hover:text-blue-600"></feather>
 <feather type="underline" size="14" class="cursor-pointer hover:text-blue-600"></feather>
 </div>
 <div class="flex items-center gap-4 px-2 border-r border-blue-200">
 <feather type="list" size="14" class="cursor-pointer hover:text-blue-600"></feather>
 <feather type="align-left" size="14" class="cursor-pointer hover:text-blue-600"></feather>
 <feather type="align-center" size="14" class="cursor-pointer hover:text-blue-600"></feather>
 </div>
 <div class="flex items-center gap-4 px-2">
 <feather type="link" size="14" class="cursor-pointer hover:text-blue-600"></feather>
 <feather type="image" size="14" class="cursor-pointer hover:text-blue-600"></feather>
 <feather type="code" size="14" class="cursor-pointer hover:text-blue-600"></feather>
 </div>
 </div>
 <textarea v-model="form.message" class="w-full h-80 p-6 text-sm font-semibold outline-none resize-none placeholder:text-indigo-300" placeholder="Type your detailed notice message here..."></textarea>
 </div>
 </div>

 <!-- Actions -->
 <div class="flex items-center justify-end gap-3 pt-6">
 <button @click="$emit('navigate', 'list_notice')" class="px-6 py-3.5 rounded-2xl bg-blue-100 text-blue-500 text-[11px] font-black uppercase tracking-widest hover:bg-blue-200 transition-all">Discard</button>
 <button @click="handlePublish" class="px-6 py-3.5 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all group">
 <feather type="check-square" size="16" class="inline-block mr-2 group-hover:scale-110 transition-transform"></feather>
 Publish Notice
 </button>
 </div>

 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'CreateNotice',
 props: {
 notice: { type: Object, default: () => null }
 },
 components: {
 feather: {
 props: ['type', 'size'],
 mounted() { feather.replace(); },
 updated() { feather.replace(); },
 render(h) {
 return h('i', {
 attrs: { 'data-feather': this.type, 'width': this.size || 24, 'height': this.size || 24 },
 class: 'inline-block align-middle'
 });
 }
 }
 },
 data() {
 return {
 form: {
 title: this.notice ? this.notice.title : '',
 message: this.notice ? this.notice.message : ''
 }
 }
 },
 computed: {
 isEdit() { return !!this.notice; }
 },
 methods: {
 handlePublish() {
 if (!this.form.title || !this.form.message) {
 alert('Please fill in required fields!');
 return;
 }
 alert(this.isEdit ? 'Notice updated successfully!' : 'Notice published successfully!');
 this.$emit('navigate', 'list_notice');
 }
 }
}
</script>

<style scoped>
.glass-card { border-radius: 2.5rem; }
</style>
