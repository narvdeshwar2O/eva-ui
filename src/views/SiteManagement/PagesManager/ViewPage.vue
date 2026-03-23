<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Site Management</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Pages Manager</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">View Page</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">{{ page.title }}</h2>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('edit', page)"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all outline-none"
 >
 <feather type="edit-2" size="14"></feather>
 Edit Page
 </button>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-100 text-blue-600 text-[11px] font-black uppercase tracking-widest hover:bg-blue-200 transition-all outline-none"
 >
 <feather type="arrow-left" size="14"></feather>
 Back
 </button>
 </div>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <!-- Main Content Area -->
 <div class="lg:col-span-2 space-y-6">
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-8 relative z-10 text-left space-y-6">
 <div class="flex items-center justify-between border-b border-blue-100 pb-4">
 <h3 class="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em]">Page Content</h3>
 <span class="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100/50">Published</span>
 </div>
 
 <div class="prose prose-slate max-w-none">
 <div class="text-blue-700 leading-relaxed space-y-4">
 <p class="font-bold text-lg text-blue-950">About Our Platform</p>
 <p>Welcome to our educational ecosystem where innovation meets learning. This page serves as a fundamental pillar of our site structure, providing essential information to our users, students, and stakeholders.</p>
 <p>The content managed here is dynamically rendered across the frontend application, ensuring that your message remains consistent and up-to-date. With our advanced Pages Manager, you have full control over the narrative of your platform.</p>
 <div class="aspect-video w-full rounded-2xl bg-blue-100 flex items-center justify-center text-indigo-300 border-2 border-dashed border-blue-200">
 <feather type="image" size="48"></feather>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Sidebar / Meta Info -->
 <div class="space-y-6">
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 relative z-10 text-left space-y-6">
 <h3 class="text-[11px] font-black text-blue-950 uppercase tracking-[0.2em] border-b border-blue-100 pb-3">SEO Details</h3>
 
 <div class="space-y-4">
 <div class="space-y-1">
 <p class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Slug</p>
 <p class="text-xs font-bold text-blue-600 bg-blue-50/50 px-2 py-1 rounded-md w-fit">/{{ page.title.toLowerCase().replace(/ /g, '-') }}</p>
 </div>

 <div class="space-y-1">
 <p class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Meta Title</p>
 <p class="text-xs font-bold text-blue-700">{{ page.title }} | EvoClasses</p>
 </div>

 <div class="space-y-1">
 <p class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Meta Description</p>
 <p class="text-xs font-medium text-blue-500 leading-relaxed">"{{ page.title }} page providing detailed information about our platform services and mission goals."</p>
 </div>

 <div class="space-y-1">
 <p class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Keywords</p>
 <div class="flex flex-wrap gap-2 pt-1">
 <span v-for="tag in [page.title, 'education', 'learning', 'portal']" :key="tag" class="px-2 py-0.5 bg-blue-100 text-blue-500 rounded text-[10px] font-bold tracking-tight">#{{ tag.toLowerCase() }}</span>
 </div>
 </div>
 </div>
 </div>
 </div>

 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 relative z-10 text-left space-y-4">
 <h3 class="text-[11px] font-black text-blue-950 uppercase tracking-[0.2em] border-b border-blue-100 pb-3">Sidebar Status</h3>
 <div class="flex items-center gap-3">
 <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-indigo-300">
 <feather type="sidebar" size="18"></feather>
 </div>
 <div>
 <p class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Sidebar Hidden</p>
 <p class="text-[9px] font-bold text-indigo-400 tracking-tight">This page uses a full-width layout</p>
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
 name: 'ViewPage',
 props: {
 page: {
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
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 1.5rem; }
</style>
