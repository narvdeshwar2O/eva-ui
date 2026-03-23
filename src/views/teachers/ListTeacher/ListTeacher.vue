<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="hover:text-blue-600 cursor-pointer transition-colors">Teachers</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950">List Teachers</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Teachers</h2>
 </div>
 <button 
 @click="$emit('add-teacher')"
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
 <div class="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest">
 <button class="text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer hover:opacity-80 transition-all font-bold">All</button>
 <span class="text-indigo-300 pb-1 px-1 font-normal">|</span>
 <button class="text-indigo-400 hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1.5 pb-1 font-bold">
 <feather type="trash-2" size="12"></feather>
 Trash
 </button>
 </div>
 </div>
 
 <div class="flex flex-wrap items-center gap-3">
 <div class="flex items-center gap-2 bg-blue-50/80 px-4 py-2 rounded-xl border border-blue-200/60 shadow-inner">
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-tighter">Show</span>
 <select class="bg-transparent text-xs font-black text-blue-950 outline-none cursor-pointer">
 <option>10</option>
 <option>25</option>
 <option>50</option>
 <option>100</option>
 </select>
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-tighter">entries</span>
 </div>
 
 <div class="relative min-w-[280px]">
 <input 
 type="text" 
 placeholder="Search teachers..." 
 class="w-full h-11 pl-11 pr-4 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold shadow-inner placeholder:text-indigo-300"
 />
 <feather type="search" size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>

 <div class="flex items-center gap-1 bg-blue-50/50 p-1.5 rounded-xl border border-blue-100 shadow-sm">
 <button title="Export PDF" class="w-9 h-9 flex items-center justify-center hover:bg-indigo-50 rounded-lg transition-all text-indigo-400 hover:text-indigo-600 group">
 <feather type="file-text" size="14" class="group-hover:scale-110 transition-transform"></feather>
 </button>
 <button title="Export Excel" class="w-9 h-9 flex items-center justify-center hover:bg-emerald-50 rounded-lg transition-all text-indigo-400 hover:text-emerald-600 group">
 <feather type="file" size="14" class="group-hover:scale-110 transition-transform"></feather>
 </button>
 <button title="Print" class="w-9 h-9 flex items-center justify-center hover:bg-blue-50 rounded-lg transition-all text-indigo-400 hover:text-blue-600 group">
 <feather type="printer" size="14" class="group-hover:scale-110 transition-transform"></feather>
 </button>
 </div>
 </div>
 </div>

 <!-- Table Container -->
 <div class="overflow-x-auto rounded-2xl border border-blue-100 shadow-sm bg-white/50 backdrop-blur-sm">
 <table class="w-full text-left border-collapse min-w-[1000px]">
 <thead>
 <tr class="bg-blue-50/50 border-b border-blue-100">
 <th class="px-5 py-3 w-14 text-center">
 <div class="relative w-4 h-4 mx-auto">
 <input type="checkbox" class="peer absolute inset-0 opacity-0 cursor-pointer z-10" />
 <div class="absolute inset-0 bg-white border-2 border-blue-200 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
 <feather type="check" size="10" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-all"></feather>
 </div>
 </th>
 <th v-for="head in ['#', 'ID', 'Teacher Details', 'Status', 'Actions']" :key="head" class="px-5 py-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
 <div class="flex items-center gap-1.5 grayscale opacity-70 hover:opacity-100 transition-all cursor-pointer group">
 {{ head }}
 <feather v-if="head !== 'Actions'" type="chevron-down" size="10" class="group-hover:translate-y-0.5 transition-transform"></feather>
 </div>
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100/60">
 <tr 
 v-for="(teacher, index) in teachers" 
 :key="teacher.id" 
 :class="['group hover:bg-blue-50/40 transition-all duration-300 whitespace-nowrap', activeActionIndex === index ? 'relative z-50' : 'z-0']"
 >
 <td class="px-5 py-3 text-center">
 <div class="relative w-4 h-4 mx-auto">
 <input type="checkbox" class="peer absolute inset-0 opacity-0 cursor-pointer z-10" />
 <div class="absolute inset-0 bg-white border-2 border-blue-200 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all group-hover:border-blue-200"></div>
 <feather type="check" size="10" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-all"></feather>
 </div>
 </td>
 <td class="px-5 py-3 text-[11px] font-normal text-black tabular-nums">{{ index + 1 }}</td>
 <td class="px-5 py-3 text-[11px] font-normal text-black tabular-nums">#{{ teacher.id }}</td>
 <td class="px-5 py-3 whitespace-nowrap">
 <div class="flex items-center gap-3">
 <div class="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-[11px] font-black text-blue-600 uppercase overflow-hidden border border-blue-200 shadow-sm transition-all group-hover:rotate-3">
 <img :src="`https://i.pravatar.cc/150?u=${teacher.id}`" class="w-full h-full object-cover" :alt="teacher.firstName" onerror="this.style.display='none'" />
 <span class="absolute">{{ teacher.firstName.charAt(0) }}{{ teacher.lastName.charAt(0) }}</span>
 </div>
 <div class="flex flex-col">
 <span class="text-[12px] font-bold text-blue-700 tracking-tight">{{ teacher.firstName }} {{ teacher.lastName }}</span>
 <span class="text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">{{ teacher.email }}</span>
 </div>
 </div>
 </td>
 <td class="px-5 py-3">
 <label class="relative inline-flex items-center cursor-pointer group/toggle">
 <input type="checkbox" v-model="teacher.status" class="sr-only peer" />
 <div class="w-11 h-6 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shadow-inner group-hover/toggle:opacity-90"></div>
 </label>
 </td>
 <td class="px-5 py-3 text-right">
 <div class="relative inline-block">
 <button 
 @click.stop="activeActionIndex = activeActionIndex === index ? null : index"
 class="w-8 h-8 rounded-lg bg-blue-950 text-white flex items-center justify-center hover:bg-blue-600 shadow-sm transition-all"
 >
 <feather type="more-horizontal" size="14"></feather>
 </button>
 
 <!-- Actions Dropdown -->
 <div 
 v-if="activeActionIndex === index" 
 v-click-outside="() => activeActionIndex = null"
 class="absolute right-0 top-full mt-2 w-36 bg-white border border-blue-200 rounded-xl shadow-xl z-[60] py-1 overflow-hidden"
 >
 <button @click.stop="handleAction('edit', teacher)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2 text-[11px] font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all border-b border-blue-50 flex items-center gap-2">
 <feather type="edit-2" size="12"></feather> Edit
 </button>
 <button @click.stop="handleAction('delete', teacher)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2 text-[11px] font-bold text-amber-600 hover:bg-amber-50 transition-all border-b border-blue-50 flex items-center gap-2">
 <feather type="trash-2" size="12"></feather> Delete
 </button>
 <button @click.stop="handleAction('courses', teacher)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2 text-[11px] font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2">
 <feather type="book" size="12"></feather> Courses
 </button>
 </div>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <!-- Pagination -->
 <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-blue-100/50">
 <div class="flex items-center gap-2">
 <div class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
 <p class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
 Showing <span class="text-blue-950">1</span> to <span class="text-blue-950">{{ teachers.length }}</span> of <span class="text-blue-950 text-xs">{{ teachers.length }} results</span>
 </p>
 </div>
 
 <div class="flex items-center gap-2.5">
 <button class="w-8 h-8 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-indigo-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm group">
 <feather type="chevron-left" size="14" class="group-hover:-translate-x-0.5 transition-transform"></feather>
 </button>
 <button class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-[11px] font-black shadow-lg shadow-blue-500/20 transition-all outline-none">1</button>
 <button class="w-8 h-8 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-indigo-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm group">
 <feather type="chevron-right" size="14" class="group-hover:translate-x-0.5 transition-transform"></feather>
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ListTeacher',
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
 teachers: [
 { id: 673, firstName: 'Dummy', lastName: 'Teacher', email: 'dummy@teacher.com', status: true }
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
 handleAction(type, teacher) {
 this.activeActionIndex = null;
 if (type === 'edit') {
 this.$emit('edit-teacher', teacher);
 }
 console.log(`${type} teacher:`, teacher.id);
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05); }

/* Custom horizontal scrollbar for the table */
.overflow-x-auto::-webkit-scrollbar { height: 6px; }
.overflow-x-auto::-webkit-scrollbar-track { background: #f0f9ff; border-radius: 10px; }
.overflow-x-auto::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.overflow-x-auto::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

/* Table row fade animation */
tbody tr { animation: fadeIn 0.4s ease-out forwards; opacity: 0; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
</style>
