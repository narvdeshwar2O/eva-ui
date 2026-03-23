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
 <span class="text-blue-950 uppercase tracking-tight">Forum Categories</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Forum Subjects</h2>
 </div>
 <button 
 @click="$emit('add')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="plus" size="14"></feather>
 ADD
 </button>
 </div>

 <!-- MAIN LIST CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 relative z-10 text-left space-y-6">
 <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
 <div class="flex items-center gap-4">
 <div class="flex items-center gap-2 bg-blue-50/80 px-3 py-1.5 rounded-xl border border-blue-200/60">
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-tighter">Show</span>
 <select class="bg-transparent text-[10px] font-black text-blue-950 outline-none cursor-pointer">
 <option>10</option>
 <option>25</option>
 <option>50</option>
 </select>
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-tighter ml-1">Entries</span>
 </div>
 </div>
 
 <div class="flex items-center gap-3">
 <div class="relative">
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Search..." 
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

 <div class="overflow-x-auto rounded-3xl border border-blue-100 bg-white/50">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/50 border-b border-blue-100">
 <th v-for="head in ['S.N', 'ID', 'Parent Category', 'Category', 'Order', 'Color', 'Actions']" :key="head" class="px-6 py-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]" :class="{'text-center': head === 'Actions'}">
 {{ head }}
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100/60">
 <tr v-for="(item, index) in filteredCategories" :key="item.id" class="group hover:bg-blue-50/40 transition-all duration-300">
 <td class="px-6 py-3 text-[11px] font-normal text-indigo-400 tabular-nums">{{ index + 1 }}</td>
 <td class="px-6 py-3 text-[11px] font-bold text-indigo-400">{{ item.id }}</td>
 <td class="px-6 py-3 text-[11px] font-bold text-indigo-400 tabular-nums">{{ item.parent || '-' }}</td>
 <td class="px-6 py-3 text-[11px] font-black text-blue-600 uppercase tracking-widest">{{ item.name }}</td>
 <td class="px-6 py-3 text-[11px] font-bold text-blue-500 tabular-nums">{{ item.order }}</td>
 <td class="px-6 py-3">
 <div class="flex items-center gap-2">
 <div class="w-4 h-4 rounded-full border border-blue-200" :style="{ backgroundColor: item.color }"></div>
 <span class="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-tighter">{{ item.color }}</span>
 </div>
 </td>
 <td class="px-6 py-3">
 <div class="relative flex justify-center">
 <button 
 @click.stop="toggleActions(item.id)"
 class="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-950 text-white hover:bg-black transition-all shadow-lg shadow-blue-950/10"
 >
 <feather type="more-horizontal" size="16"></feather>
 </button>
 <!-- Action Dropdown -->
 <div v-if="activeActions === item.id" v-click-outside="() => activeActions = null" class="absolute right-0 top-12 w-40 bg-white rounded-2xl shadow-2xl border border-blue-100 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
 <button @click.stop="handleEdit(item)" class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2.5 text-[11px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-colors">
 <feather type="edit-3" size="14"></feather>
 Edit
 </button>
 <button @click.stop="handleDelete(item.id)" class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2.5 text-[11px] font-black text-rose-600 uppercase tracking-widest hover:bg-rose-50 transition-colors">
 <feather type="trash-2" size="14"></feather>
 Delete
 </button>
 </div>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <div class="flex items-center justify-between pt-4">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Showing 1 to {{ categories.length }} of {{ categories.length }} entries</span>
 <div class="flex gap-2">
 <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-200 text-indigo-400 hover:border-blue-600 hover:text-blue-600 transition-all"><feather type="chevron-left" size="12"></feather></button>
 <button v-for="p in 1" :key="p" class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20 text-[10px] font-black">{{ p }}</button>
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
 name: 'ListForumCategories',
 directives: {
 'click-outside': {
 bind(el, binding, vnode) {
 el.clickOutsideEvent = function(event) {
 if (!(el === event.target || el.contains(event.target))) {
 vnode.context[binding.expression](event);
 }
 };
 document.body.addEventListener('click', el.clickOutsideEvent);
 },
 unbind(el) {
 document.body.removeEventListener('click', el.clickOutsideEvent);
 }
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
 },
 data() {
 return {
 searchQuery: '',
 activeActions: null,
 categories: [
 { id: 3, name: 'MATHS', parent: '', order: 3, color: '#0088cc' },
 { id: 2, name: 'SCIENCE', parent: '', order: 2, color: '#0088cc' },
 { id: 1, name: 'SSC', parent: '', order: 1, color: '#0088cc' }
 ]
 }
 },
 computed: {
 filteredCategories() {
 if (!this.searchQuery) return this.categories;
 const query = this.searchQuery.toLowerCase();
 return this.categories.filter(item => 
 item.name.toLowerCase().includes(query) || 
 (item.parent && item.parent.toLowerCase().includes(query))
 );
 }
 },
 methods: {
 toggleActions(id) {
 this.activeActions = this.activeActions === id ? null : id;
 },
 handleEdit(item) {
 this.activeActions = null;
 this.$emit('edit', item);
 },
 handleDelete(id) {
 this.activeActions = null;
 if (confirm('Are you sure you want to delete this category?')) {
 this.categories = this.categories.filter(item => item.id !== id);
 }
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
