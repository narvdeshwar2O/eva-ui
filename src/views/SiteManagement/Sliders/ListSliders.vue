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
 <span class="text-blue-950 uppercase tracking-tight">Sliders</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Sliders</h2>
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
 <th v-for="head in ['S.N', 'ID', 'Name', 'BG Image', 'Sequence', 'Status', 'Web or App', 'Actions']" :key="head" class="px-6 py-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
 {{ head }}
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100/60">
 <tr v-for="(slider, index) in sliders" :key="slider.id" class="group hover:bg-blue-50/40 transition-all duration-300">
 <td class="px-6 py-3 text-[11px] font-normal text-indigo-400 tabular-nums">{{ index + 1 }}</td>
 <td class="px-6 py-3 text-[11px] font-bold text-indigo-400">{{ slider.id }}</td>
 <td class="px-6 py-3 text-[11px] font-bold text-blue-600">{{ slider.name }}</td>
 <td class="px-6 py-3">
 <div class="w-12 h-8 rounded-lg bg-blue-100 border border-blue-200 overflow-hidden flex items-center justify-center text-indigo-300 relative shadow-inner">
 <img :src="`https://picsum.photos/seed/${slider.id}/120/80`" class="w-full h-full object-cover" :alt="slider.name" onerror="this.style.display='none'" />
 <feather v-if="!slider.image" type="image" size="14" class="absolute"></feather>
 </div>
 </td>
 <td class="px-6 py-3 text-[11px] font-bold text-blue-500 tabular-nums">{{ slider.sequence }}</td>
 <td class="px-6 py-3">
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="slider.status" class="sr-only peer">
 <div class="w-9 h-5 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
 </label>
 </td>
 <td class="px-6 py-3 text-[11px] font-bold text-blue-500 uppercase tracking-widest">{{ slider.webOrApp }}</td>
 <td class="px-6 py-3">
 <div class="flex items-center gap-2">
 <button @click="$emit('edit', slider)" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-sm">
 <feather type="edit-2" size="12"></feather>
 </button>
 <button @click="handleDelete(slider.id)" class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center shadow-sm">
 <feather type="trash-2" size="12"></feather>
 </button>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <div class="flex items-center justify-between pt-4">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Showing 1 to {{ sliders.length }} of {{ sliders.length }} entries</span>
 <div class="flex gap-2">
 <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-200 text-indigo-400 hover:border-blue-600 hover:text-blue-600 transition-all"><feather type="chevron-left" size="12"></feather></button>
 <button v-for="p in 1" :key="p" class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20 text-[10px] font-black">{{ p }}</button>
 <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-200 text-indigo-400 hover:border-blue-600 hover:text-blue-600 transition-all"><feather type="chevron-right" size="12"></feather></button>
 </div>
 </div>
 </div>
 </div>

 <!-- SEQUENCE MANAGEMENT CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 relative z-10 text-left space-y-6">
 <div class="flex items-center gap-3 border-b border-blue-100 pb-4">
 <feather type="move" size="18" class="text-blue-600"></feather>
 <h3 class="text-lg font-black text-blue-950 tracking-tight">Manage Sequence of Slides</h3>
 </div>

 <div class="space-y-3">
 <p class="text-[11px] font-black text-blue-900 uppercase tracking-widest pl-1">Drag and change sequence of a Slide</p>
 <div class="space-y-2">
 <div v-for="slider in sliders" :key="'seq-'+slider.id" class="flex items-center gap-4 p-4 rounded-2xl bg-white border border-blue-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all cursor-move group">
 <feather type="more-vertical" size="14" class="text-indigo-300 group-hover:text-blue-400"></feather>
 <span class="text-xs font-bold text-blue-600">{{ slider.name }}</span>
 </div>
 </div>
 </div>

 <div class="flex items-center gap-4 pt-4 border-t border-blue-50">
 <button class="px-6 py-3.5 rounded-2xl bg-blue-950 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-black transition-all">
 Back to list
 </button>
 <button class="px-6 py-3.5 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
 Save Sequence
 </button>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ListSliders',
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
 sliders: [
 { id: 1, name: 'banner1', sequence: 1, status: true, webOrApp: 'Web' },
 { id: 7, name: 'Banner 2', sequence: 2, status: true, webOrApp: 'Web' },
 { id: 8, name: 'Banner for app', sequence: 3, status: true, webOrApp: 'App' }
 ]
 }
 },
 methods: {
 handleDelete(id) {
 if (confirm('Delete this slider?')) {
 this.sliders = this.sliders.filter(s => s.id !== id);
 }
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
