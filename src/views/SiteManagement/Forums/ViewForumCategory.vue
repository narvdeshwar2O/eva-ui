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
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Forum Categories</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">View Forum Subject</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Category Details</h2>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('edit', category)"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="edit-3" size="14"></feather>
 Edit Subject
 </button>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest border border-blue-100/50 hover:bg-blue-100 transition-all outline-none"
 >
 <feather type="chevron-left" size="14"></feather>
 Back
 </button>
 </div>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
 <!-- Main Content Card -->
 <div class="lg:col-span-2 space-y-8">
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md p-8">
 <div class="flex items-center gap-6">
 <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-xl" :style="{ backgroundColor: category.color }">
 <span class="text-2xl font-black tabular-nums">{{ category.name.charAt(0) }}</span>
 </div>
 <div class="space-y-1">
 <h1 class="text-3xl font-black text-blue-950 tracking-tight uppercase">{{ category.name }}</h1>
 <div class="flex items-center gap-3">
 <div class="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-500 text-[9px] font-black uppercase tracking-widest border border-blue-200/50">
 ID: #{{ category.id }}
 </div>
 <div class="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest border border-blue-100/50">
 Order: {{ category.order }}
 </div>
 </div>
 </div>
 </div>
 
 <div class="mt-8 pt-8 border-t border-blue-100 grid grid-cols-1 md:grid-cols-2 gap-8">
 <div class="space-y-4">
 <h4 class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Parent Classification</h4>
 <div class="p-5 rounded-2xl bg-blue-50 border border-blue-100">
 <p class="text-xs font-bold text-blue-700">{{ category.parent || 'No Parent Category Assigned' }}</p>
 </div>
 </div>
 <div class="space-y-4">
 <h4 class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Theme Color</h4>
 <div class="p-5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between">
 <p class="text-xs font-mono font-bold text-blue-700 uppercase">{{ category.color }}</p>
 <div class="w-6 h-6 rounded-lg shadow-inner" :style="{ backgroundColor: category.color }"></div>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Stats Sidebar -->
 <div class="space-y-6">
 <!-- Activity Card Mock -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md p-6">
 <h3 class="text-[11px] font-black text-blue-900 uppercase tracking-widest mb-4">Forum Activity</h3>
 <div class="space-y-4">
 <div class="flex items-center justify-between p-4 rounded-2xl bg-blue-50/50 border border-blue-100/30">
 <div class="flex items-center gap-3">
 <feather type="message-square" size="14" class="text-blue-600"></feather>
 <span class="text-[11px] font-bold text-blue-700 uppercase tracking-tighter">Total Posts</span>
 </div>
 <span class="text-sm font-black text-blue-700 tabular-nums">0</span>
 </div>
 <div class="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/30">
 <div class="flex items-center gap-3">
 <feather type="users" size="14" class="text-emerald-600"></feather>
 <span class="text-[11px] font-bold text-blue-700 uppercase tracking-tighter">Active Users</span>
 </div>
 <span class="text-sm font-black text-emerald-700 tabular-nums">0</span>
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
 name: 'ViewForumCategory',
 props: {
 category: {
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
