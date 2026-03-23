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
 <span class="text-blue-950 uppercase tracking-tight">Pages Manager</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Pages</h2>
 </div>
 <button 
 @click="$emit('add')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="plus-circle" size="14"></feather>
 ADD
 </button>
 </div>

 <!-- MAIN LIST CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 
 <div class="p-6 relative z-10 text-left space-y-6">
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
 </div>
 </div>
 
 <div class="flex items-center gap-3">
 <div class="relative">
 <input 
 type="text" 
 placeholder="Search pages..." 
 class="w-64 h-10 pl-10 pr-4 rounded-xl bg-white border border-blue-200 text-xs focus:outline-none focus:border-blue-600 transition-all text-blue-950 font-semibold shadow-sm"
 />
 <feather type="search" size="14" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>
 <div class="flex items-center gap-1 border border-blue-100 bg-blue-50/50 p-1 rounded-xl">
 <button title="Copy" class="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-indigo-400 hover:text-blue-600"><feather type="copy" size="12"></feather></button>
 <button title="Excel" class="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-indigo-400 hover:text-emerald-600"><feather type="file" size="12"></feather></button>
 <button title="PDF" class="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-indigo-400 hover:text-rose-600"><feather type="file-text" size="12"></feather></button>
 </div>
 </div>
 </div>

 <div class="overflow-x-auto rounded-2xl border border-blue-100 bg-white/50">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/50 border-b border-blue-100">
 <th class="px-5 py-3 w-10">
 <input type="checkbox" class="rounded border-indigo-300 text-blue-600 focus:ring-blue-500">
 </th>
 <th v-for="head in ['S.N', 'ID', 'Title', 'Status', 'Created', 'Actions']" :key="head" class="px-5 py-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
 {{ head }}
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100/60">
 <tr v-for="(page, index) in pages" :key="page.id" class="group hover:bg-blue-50/40 transition-all duration-300">
 <td class="px-5 py-3"><input type="checkbox" class="rounded border-indigo-300 text-blue-600 focus:ring-blue-500"></td>
 <td class="px-5 py-3 text-[11px] font-normal text-blue-500 tabular-nums">{{ index + 1 }}</td>
 <td class="px-5 py-3 text-[11px] font-bold text-indigo-400">{{ page.id }}</td>
 <td class="px-5 py-3">
 <span class="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer">{{ page.title }}</span>
 </td>
 <td class="px-5 py-3">
 <div class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
 <feather type="check" size="12"></feather>
 </div>
 </td>
 <td class="px-5 py-3 text-[11px] font-medium text-indigo-400">{{ page.created }}</td>
 <td class="px-5 py-3">
 <div class="relative inline-block">
 <button 
 @click.stop="toggleActions(index)"
 class="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-950 hover:text-white transition-all shadow-sm"
 >
 <span class="text-[10px] font-black uppercase tracking-widest ml-1">...</span>
 </button>
 
 <div 
 v-if="activeActionIndex === index" 
 v-click-outside="() => activeActionIndex = null"
 class="absolute right-0 top-full mt-2 w-40 bg-white border border-blue-200 rounded-2xl shadow-2xl z-[60] py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
 >
 <button @click.stop="handleView(page)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2 text-[11px] font-bold text-blue-600 hover:bg-blue-50 hover:text-emerald-600 transition-all flex items-center gap-2">
 <feather type="eye" size="12"></feather> View
 </button>
 <button @click.stop="handleEdit(page)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2 text-[11px] font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2">
 <feather type="edit-2" size="12"></feather> Edit
 </button>
 <div class="h-px bg-blue-100 my-1"></div>
 <button @click.stop="handleDelete(page.id)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2 text-[11px] font-bold text-rose-600 hover:bg-rose-50 transition-all flex items-center gap-2">
 <feather type="trash-2" size="12"></feather> Delete
 </button>
 </div>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <div class="flex items-center justify-between pt-4">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Showing 1 to {{ pages.length }} of {{ pages.length }} entries</span>
 <div class="flex gap-2">
 <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-200 text-indigo-400 hover:border-blue-600 hover:text-blue-600 transition-all"><feather type="chevron-left" size="12"></feather></button>
 <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-500/20 text-[10px] font-black">1</button>
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
 name: 'ListPages',
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
 data() {
 return {
 pages: [
 { id: 2, title: 'About Us', created: '1 year ago' },
 { id: 1, title: 'Privacy Policy', created: '1 year ago' }
 ],
 activeActionIndex: null
 }
 },
 methods: {
 toggleActions(index) {
 this.activeActionIndex = this.activeActionIndex === index ? null : index;
 },
 handleView(page) {
 this.activeActionIndex = null;
 this.$emit('view', page);
 },
 handleEdit(page) {
 this.activeActionIndex = null;
 this.$emit('edit', page);
 },
 handleDelete(id) {
 this.activeActionIndex = null;
 if (confirm('Delete this page?')) {
 this.pages = this.pages.filter(p => p.id !== id);
 }
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 1.5rem; }
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
