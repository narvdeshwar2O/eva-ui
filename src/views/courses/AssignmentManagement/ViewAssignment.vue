<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors">Assignments</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950">Assignment Details</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Assignments</h2>
 </div>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="arrow-left" size="14"></feather>
 Back to List
 </button>
 </div>

 <!-- Details Card -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 
 <div class="p-8 relative z-10">
 <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div class="space-y-6">
 <div class="p-6 rounded-2xl bg-blue-50/50 border border-blue-100">
 <p class="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Core Assignment Info</p>
 <div class="space-y-4">
 <div class="flex justify-between items-center border-b border-blue-100 pb-2">
 <span class="text-[11px] font-bold text-blue-500 uppercase">Title</span>
 <span class="text-sm font-black text-blue-950">{{ assignment.title }}</span>
 </div>
 <div class="flex justify-between items-center border-b border-blue-100 pb-2">
 <span class="text-[11px] font-bold text-blue-500 uppercase">File Type</span>
 <div class="flex items-center gap-2 p-1 bg-white border border-blue-100 rounded-lg">
 <feather type="file" size="12" class="text-blue-600"></feather>
 <span class="text-[9px] font-black text-blue-900 uppercase tracking-tighter">{{ assignment.file_type || 'PDF' }}</span>
 </div>
 </div>
 <div class="flex justify-between items-center">
 <span class="text-[11px] font-bold text-blue-500 uppercase">Created At</span>
 <span class="text-[11px] font-bold text-blue-600">{{ assignment.created_at }}</span>
 </div>
 </div>
 </div>
 </div>

 <div class="space-y-6">
 <div class="p-6 rounded-2xl bg-blue-50/50 border border-blue-100">
 <p class="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Management Actions</p>
 <div class="space-y-4">
 <button 
 @click="$emit('edit', assignment)"
 class="w-fit mx-auto sm:mx-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-950 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-lg"
 >
 <feather type="edit-2" size="14"></feather>
 Edit Assignment
 </button>
 <div class="h-px bg-blue-100 my-2"></div>
 <div class="flex items-center justify-between">
 <span class="text-[11px] font-bold text-blue-500 uppercase tracking-widest">Internal ID</span>
 <span class="text-xs font-mono text-indigo-400">#ASN-{{ assignment.id }}</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ViewAssignment',
 props: {
 assignment: {
 type: Object,
 required: true
 }
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
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); }
.glass-glow {
 position: absolute;
 top: -50%;
 left: -50%;
 width: 200%;
 height: 200%;
 background: radial-gradient(circle at 10% 10%, rgba(30, 64, 175, 0.03) 0%, transparent 50%);
 pointer-events: none;
}
</style>
