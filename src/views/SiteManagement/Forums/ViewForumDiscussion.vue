<template>
 <div class="space-y-6 pb-20">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Site Management</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Forum Discussion</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">View Discussion</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Discussion Details</h2>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest border border-blue-100/50 hover:bg-blue-100 transition-all outline-none"
 >
 <feather type="chevron-left" size="14"></feather>
 Back to List
 </button>
 </div>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
 <!-- Main Content Card -->
 <div class="lg:col-span-2 space-y-8">
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md p-8">
 <div class="flex items-center justify-between mb-8">
 <div class="flex items-center gap-6">
 <div class="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
 <feather type="user" size="32"></feather>
 </div>
 <div class="space-y-1">
 <h1 class="text-xl font-black text-blue-950 tracking-tight uppercase">{{ discussion.userName }}</h1>
 <div class="flex items-center gap-2">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">User ID: #{{ discussion.id + 1000 }}</span>
 <span class="w-1 h-1 rounded-full bg-indigo-300"></span>
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest tracking-tighter">Oct 12, 2023, 10:30 AM</span>
 </div>
 </div>
 </div>
 <div class="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/50 text-blue-600 text-[9px] font-black uppercase tracking-widest">
 Subject: {{ discussion.subject }}
 </div>
 </div>
 
 <div class="space-y-6 pt-8 border-t border-blue-100">
 <div class="space-y-3">
 <h4 class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">User Query</h4>
 <div class="p-8 rounded-3xl bg-blue-50/50 border border-blue-100 relative">
 <feather type="message-square" size="40" class="absolute -top-4 -right-2 text-blue-100/60 z-0"></feather>
 <p class="text-lg text-blue-700 font-medium leading-relaxed relative z-10">
 "{{ discussion.query }}"
 </p>
 </div>
 </div>

 <!-- Reply Section (Mock) -->
 <div class="space-y-4 pt-8">
 <h4 class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Post a Reply</h4>
 <textarea 
 placeholder="Type your response here..." 
 class="w-full h-32 p-5 rounded-2xl bg-white border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm resize-none"
 ></textarea>
 <div class="flex justify-end">
 <button class="px-6 py-3 rounded-xl bg-blue-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg">
 Send Reply
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Stats Sidebar -->
 <div class="space-y-6">
 <!-- Status Card -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md p-6">
 <h3 class="text-[11px] font-black text-blue-900 uppercase tracking-widest mb-4">Query Status</h3>
 <div class="flex items-center justify-between p-4 rounded-2xl border border-blue-100" :class="discussion.status ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' : 'bg-rose-50 text-rose-600 border-rose-100/50'">
 <span class="text-[11px] font-black uppercase tracking-widest">{{ discussion.status ? 'Visible' : 'Hidden' }}</span>
 <div class="w-2.5 h-2.5 rounded-full" :class="discussion.status ? 'bg-emerald-600' : 'bg-rose-600'"></div>
 </div>
 </div>

 <!-- Metadata -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md p-6">
 <h3 class="text-[11px] font-black text-blue-900 uppercase tracking-widest mb-4">Metadata</h3>
 <div class="space-y-4">
 <div class="flex items-center justify-between text-[11px]">
 <span class="font-bold text-indigo-400 uppercase tracking-tighter">Discussion ID:</span>
 <span class="font-black text-blue-950">#{{ discussion.id }}</span>
 </div>
 <div class="flex items-center justify-between text-[11px]">
 <span class="font-bold text-indigo-400 uppercase tracking-tighter">Views:</span>
 <span class="font-black text-blue-950 tabular-nums">124</span>
 </div>
 <div class="flex items-center justify-between text-[11px]">
 <span class="font-bold text-indigo-400 uppercase tracking-tighter">Replies:</span>
 <span class="font-black text-blue-600 tabular-nums">0</span>
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
 name: 'ViewForumDiscussion',
 props: {
 discussion: {
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
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
