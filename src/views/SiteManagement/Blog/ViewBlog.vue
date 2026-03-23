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
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Blogs</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">View Blog</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">{{ blog.title }}</h2>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('edit', blog)"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all outline-none"
 >
 <feather type="edit-2" size="14"></feather>
 Edit Blog
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
 <div class="lg:col-span-2 space-y-6 text-left">
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-8 relative z-10 space-y-6">
 <div class="flex items-center justify-between border-b border-blue-100 pb-4">
 <div class="flex items-center gap-4">
 <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100/50">{{ blog.category }}</span>
 <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1">
 <feather type="calendar" size="10"></feather> Published {{ blog.created }}
 </span>
 </div>
 </div>
 
 <div class="prose prose-slate max-w-none">
 <div class="aspect-video w-full rounded-3xl bg-blue-100 flex items-center justify-center text-indigo-300 border-2 border-dashed border-blue-200 mb-6 overflow-hidden relative group cursor-pointer">
 <div class="absolute inset-0 bg-blue-950/5 group-hover:bg-blue-950/10 transition-colors"></div>
 <feather type="image" size="48" class="relative z-10"></feather>
 <div class="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/20 shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
 <p class="text-[10px] font-black text-blue-950 uppercase tracking-widest">Featured Graphic Preview</p>
 </div>
 </div>

 <div class="text-blue-700 leading-relaxed space-y-4 font-medium">
 <p class="text-xl font-black text-blue-950 tracking-tight mb-4">Crafting the Future of Digital Education</p>
 <p>This dummy blog post demonstrates how your content will look once published. The typography is optimized for readability with our premium SaaS design system. Administrators can manage all aspects of this post, from the rich text content to the hidden SEO metadata that drives search engine performance.</p>
 <p>Digital learning is evolving, and our platform is at the forefront of this transformation. By providing clean, accessible, and high-quality content, we ensure that students stay engaged and information remains clear.</p>
 <blockquote class="border-l-4 border-blue-600 pl-6 py-2 text-blue-950 font-bold bg-blue-50/30 rounded-r-2xl">
 "Education is not the learning of facts, but the training of the mind to think. Our platform facilitates this journey every step of the way."
 </blockquote>
 </div>
 </div>

 <!-- Tags Section -->
 <div class="pt-6 border-t border-blue-100 flex flex-wrap gap-2">
 <span v-for="tag in ['Education', 'Tech', 'Innovation', 'Future']" :key="tag" class="px-3 py-1.5 bg-blue-50 text-blue-500 rounded-xl text-[10px] font-bold border border-blue-100 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all cursor-pointer tracking-tight">#{{ tag }}</span>
 </div>
 </div>
 </div>
 </div>

 <!-- Sidebar / SEO Info -->
 <div class="space-y-6 text-left">
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 relative z-10 space-y-6">
 <div class="flex items-center gap-2 border-b border-blue-100 pb-3">
 <feather type="trending-up" size="14" class="text-blue-600"></feather>
 <h3 class="text-[11px] font-black text-blue-950 uppercase tracking-[0.2em]">SEO Performance</h3>
 </div>
 
 <div class="space-y-4">
 <div class="p-4 rounded-2xl bg-blue-50/50 border border-blue-100/30">
 <p class="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Canonical Slug</p>
 <p class="text-xs font-bold text-blue-700 font-mono">/blog/{{ blog.title.toLowerCase().replace(/ /g, '-') }}</p>
 </div>

 <div class="space-y-1 pl-1">
 <p class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Search Title</p>
 <p class="text-xs font-bold text-blue-900 leading-snug">{{ blog.title }} | Official Blog</p>
 </div>

 <div class="h-px bg-blue-100 w-full mx-auto"></div>

 <div class="space-y-2 pl-1">
 <p class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Meta Description</p>
 <p class="text-xs font-medium text-blue-500 leading-relaxed">"Read our latest insights on {{ blog.title }}. We share the best practices and innovation updates for our global community."</p>
 </div>
 </div>
 </div>
 </div>

 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 relative z-10 space-y-4">
 <h3 class="text-[11px] font-black text-blue-950 uppercase tracking-[0.2em] border-b border-blue-100 pb-3">Quick Metrics</h3>
 <div class="grid grid-cols-2 gap-4">
 <div class="p-3 rounded-2xl bg-blue-50 border border-blue-100">
 <p class="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-1">Views</p>
 <p class="text-sm font-black text-blue-950">1,240</p>
 </div>
 <div class="p-3 rounded-2xl bg-blue-50 border border-blue-100">
 <p class="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-1">Time</p>
 <p class="text-sm font-black text-blue-950">4m read</p>
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
 name: 'ViewBlog',
 props: {
 blog: {
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
