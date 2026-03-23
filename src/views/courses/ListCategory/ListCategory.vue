<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('navigate', 'list_course')" class="hover:text-blue-600 cursor-pointer transition-colors">Courses</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950">Categories</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Categories</h2>
 </div>
 <button 
 @click="$emit('add-category')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="plus" size="14"></feather>
 ADD
 </button>
 </div>

 <!-- Filters & Table Card -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 
 <div class="p-6 space-y-6 relative z-10">
 <!-- Top Toolbar -->
 <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
 <div class="flex items-center gap-4">
 <div class="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest p-1 bg-blue-50 rounded-lg border border-blue-100">
 <button class="px-3 py-1 bg-white text-blue-600 rounded-md shadow-sm">All</button>
 <button class="px-3 py-1 text-indigo-400 hover:text-rose-500 transition-colors">Trash</button>
 </div>
 <div class="flex items-center gap-2 bg-blue-50/80 px-3 py-1.5 rounded-xl border border-blue-200/60">
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-tighter">Show</span>
 <select class="bg-transparent text-[10px] font-black text-blue-950 outline-none cursor-pointer">
 <option>10</option>
 <option>25</option>
 <option>50</option>
 </select>
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-tighter">entries</span>
 </div>
 </div>
 
 <div class="flex flex-wrap items-center gap-3">
 <div class="relative min-w-[280px]">
 <input 
 type="text" 
 placeholder="Search..." 
 class="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-blue-200 text-xs focus:outline-none focus:border-blue-600 transition-all text-blue-950 font-semibold shadow-sm placeholder:text-indigo-300"
 />
 <feather type="search" size="14" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>

 <div class="flex items-center gap-2 bg-blue-50/50 p-1.5 rounded-xl border border-blue-100 shadow-sm">
 <button title="Export PDF" class="w-8 h-8 flex items-center justify-center hover:bg-rose-50 rounded-lg transition-all text-indigo-400 hover:text-rose-600 group">
 <feather type="file-text" size="13"></feather>
 </button>
 <button title="Export Excel" class="w-8 h-8 flex items-center justify-center hover:bg-emerald-50 rounded-lg transition-all text-indigo-400 hover:text-emerald-600 group">
 <feather type="file" size="13"></feather>
 </button>
 <button title="Print" class="w-8 h-8 flex items-center justify-center hover:bg-blue-50 rounded-lg transition-all text-indigo-400 hover:text-blue-600 group">
 <feather type="printer" size="13"></feather>
 </button>
 </div>
 </div>
 </div>

 <!-- Table Container -->
 <div class="overflow-x-auto rounded-2xl border border-blue-100 shadow-sm bg-white/50 backdrop-blur-sm">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/50 border-b border-blue-100">
 <th v-for="head in ['S. No.', 'ID', 'Name', 'Slug', 'Courses', 'Blog', 'Action']" :key="head" class="px-5 py-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
 <div class="flex items-center gap-1.5 grayscale opacity-70 hover:opacity-100 transition-all cursor-pointer group">
 {{ head }}
 <feather v-if="head !== 'Action'" type="chevron-down" size="10" class="group-hover:translate-y-0.5 transition-transform"></feather>
 </div>
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100/60">
 <tr v-for="(cat, index) in categories" :key="cat.id" class="group hover:bg-blue-50/40 transition-all duration-300">
 <td class="px-5 py-3 text-[11px] font-normal text-black tabular-nums">{{ index + 1 }}</td>
 <td class="px-5 py-3 text-[11px] font-normal text-black tabular-nums">{{ cat.id }}</td>
 <td class="px-5 py-3 text-[11px] font-bold text-blue-900 uppercase tracking-tight">{{ cat.name }}</td>
 <td class="px-5 py-3 text-[11px] font-normal text-blue-500">{{ cat.slug }}</td>
 <td class="px-5 py-3 text-[11px] font-black text-black tabular-nums">{{ cat.courses }}</td>
 <td class="px-5 py-3 text-[11px] font-black text-black tabular-nums">{{ cat.blog }}</td>
 <td class="px-5 py-3">
 <div class="relative inline-block">
 <button 
 @click.stop="activeActionIndex = activeActionIndex === index ? null : index"
 class="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-950 hover:text-white transition-all shadow-sm group"
 >
 <span class="text-[10px] font-black uppercase tracking-widest ml-1">Action</span>
 <feather type="chevron-down" size="12" :class="['transition-transform duration-300', activeActionIndex === index ? 'rotate-180' : '']"></feather>
 </button>
 
 <!-- Actions Dropdown -->
 <div 
 v-if="activeActionIndex === index" 
 v-click-outside="() => activeActionIndex = null"
 class="absolute right-0 top-full mt-2 w-40 bg-white border border-blue-200 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] z-[60] py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
 >
 <button @click.stop="handleAction('edit', cat)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2 text-[11px] font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2">
 <feather type="edit-2" size="12"></feather> Edit
 </button>
 <div class="h-px bg-blue-100 my-1"></div>
 <button @click.stop="handleAction('delete', cat)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2 text-[11px] font-bold text-rose-600 hover:bg-rose-50 transition-all flex items-center gap-2">
 <feather type="trash-2" size="12"></feather> Delete
 </button>
 </div>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <!-- Pagination -->
 <div class="flex items-center justify-between pt-4 border-t border-blue-50">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Showing {{ categories.length ? '1' : '0' }} to {{ categories.length }} of {{ categories.length }} entries</span>
 <div class="flex gap-2">
 <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-200 text-indigo-400 hover:border-blue-600 hover:text-blue-600 transition-all"><feather type="chevron-left" size="12"></feather></button>
 <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-500/20 text-[10px] font-black transition-all">1</button>
 <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-200 text-indigo-400 hover:border-blue-600 hover:text-blue-600 transition-all"><feather type="chevron-right" size="12"></feather></button>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ListCategory',
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
 activeActionIndex: null,
 categories: [
 { id: 12, name: 'Language', slug: 'language', courses: 2, blog: 0 },
 { id: 11, name: 'Tech e-books (library)', slug: 'tech-e-books-library', courses: 2, blog: 0 }
 ]
 }
 },
 directives: {
 'click-outside': {
 bind(el, binding) {
 el.clickOutsideEvent = function(event) {
 if (!(el === event.target || el.contains(event.target))) {
 binding.value(event);
 }
 };
 document.body.addEventListener('click', el.clickOutsideEvent);
 },
 unbind(el) {
 document.body.removeEventListener('click', el.clickOutsideEvent);
 }
 }
 },
 methods: {
 handleAction(type, cat) {
 this.activeActionIndex = null;
 if (type === 'edit') {
 this.$emit('edit-category', cat);
 }
 console.log(`${type} category:`, cat.id);
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
