<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950">List Course</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Courses</h2>
 </div>
 <button 
 @click="$emit('add-course')"
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
 <button class="text-indigo-400 hover:text-rose-500 transition-colors cursor-pointer flex items-center gap-1.5 pb-1 font-bold">
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
 placeholder="Search resources..." 
 class="w-full h-11 pl-11 pr-4 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold shadow-inner placeholder:text-indigo-300"
 />
 <feather type="search" size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>

 <div class="flex items-center gap-1 bg-blue-50/50 p-1.5 rounded-xl border border-blue-100 shadow-sm">
 <button title="Export PDF" class="w-9 h-9 flex items-center justify-center hover:bg-rose-50 rounded-lg transition-all text-indigo-400 hover:text-rose-600 group">
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
 <th v-for="head in ['S.N', 'ID', 'Teachers', 'Title', 'Sequence', 'Category', 'Publish', 'Action']" :key="head" class="px-5 py-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
 <div class="flex items-center gap-1.5 grayscale opacity-70 hover:opacity-100 transition-all cursor-pointer group">
 {{ head }}
 <feather v-if="head !== 'Actions' && head !== 'Lessons'" type="chevron-down" size="10" class="group-hover:translate-y-0.5 transition-transform"></feather>
 </div>
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100/60">
 <tr 
 v-for="(course, index) in courses" 
 :key="course.id" 
 :class="['group hover:bg-blue-50/40 transition-all duration-300', activeActionIndex === index ? 'relative z-50' : 'z-0']"
 >
 <td class="px-5 py-3 text-center">
 <div class="relative w-4 h-4 mx-auto">
 <input type="checkbox" class="peer absolute inset-0 opacity-0 cursor-pointer z-10" />
 <div class="absolute inset-0 bg-white border-2 border-blue-200 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all group-hover:border-blue-200"></div>
 <feather type="check" size="10" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-all"></feather>
 </div>
 </td>
 <td class="px-5 py-3 text-[11px] font-normal text-black tabular-nums">{{ index + 1 }}</td>
 <td class="px-5 py-3 text-[11px] font-normal text-black tabular-nums">#{{ course.id }}</td>
 <td class="px-5 py-3 whitespace-nowrap">
 <div class="flex items-center gap-3">
 <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 border border-blue-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500">
 <feather type="user" size="12"></feather>
 </div>
 <span class="text-[12px] font-normal text-black">{{ course.teacher }}</span>
 </div>
 </td>
 <td class="px-5 py-3 whitespace-nowrap">
 <span class="text-xs font-normal text-black hover:text-blue-600 cursor-pointer transition-all border-b border-transparent hover:border-blue-600">{{ course.title }}</span>
 </td>
 <td class="px-5 py-3 whitespace-nowrap text-[11px] font-normal text-black tabular-nums">{{ course.sequence }}</td>
 <td class="px-5 py-3 whitespace-nowrap">
 <span class="px-2.5 py-1 rounded-lg bg-blue-50/50 text-[9px] font-normal text-black border border-blue-100/50 uppercase tracking-widest whitespace-nowrap">
 {{ course.category }}
 </span>
 </td>
 <td class="px-5 py-3">
 <button :class="['w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-sm group/publish', course.published ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-500 hover:text-white' : 'bg-blue-50 text-indigo-400 border-blue-100 hover:bg-blue-200']">
 <feather type="check-circle" size="14" class="group-hover/publish:scale-110 transition-transform"></feather>
 </button>
 </td>
 <td class="px-5 py-3">
 <div class="relative inline-block">
 <button 
 @click.stop="toggleActions(index)"
 class="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-950 hover:text-white transition-all shadow-sm group"
 >
 <span class="text-[10px] font-black uppercase tracking-widest ml-1">Action</span>
 <feather type="chevron-down" size="12" :class="['transition-transform duration-300', activeActionIndex === index ? 'rotate-180' : '']"></feather>
 </button>
 
 <!-- Actions Dropdown -->
 <div 
 v-if="activeActionIndex === index" 
 v-click-outside="() => activeActionIndex = null"
 class="absolute right-0 top-full mt-2 w-48 bg-white border border-blue-200 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] z-[60] py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
 >
 <button @click.stop="handleAction('view', course)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2.5 text-[11px] font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all border-b border-blue-50 flex items-center gap-2">
 <feather type="eye" size="12"></feather> View
 </button>
 <button @click.stop="handleAction('edit', course)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2.5 text-[11px] font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all border-b border-blue-50 flex items-center gap-2">
 <feather type="edit-2" size="12"></feather> Edit
 </button>
 <button @click.stop="handleAction('copy', course)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2.5 text-[11px] font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all border-b border-blue-50 flex items-center gap-2">
 <feather type="copy" size="12"></feather> Copy
 </button>
 <button @click.stop="handleAction('delete', course)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2.5 text-[11px] font-bold text-rose-600 hover:bg-rose-50 transition-all border-b border-blue-50 flex items-center gap-2">
 <feather type="trash-2" size="12"></feather> Delete
 </button>
 <button @click.stop="handleAction('analytics', course)" class="w-fit px-8 mx-auto sm:mx-0 text-left py-2.5 text-[11px] font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all border-b border-blue-50 flex items-center gap-2">
 <feather type="bar-chart-2" size="12"></feather> Analytics
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
 Showing <span class="text-blue-950">1</span> to <span class="text-blue-950">4</span> of <span class="text-blue-950 text-xs">4 results</span>
 </p>
 </div>
 
 <div class="flex items-center gap-2.5">
 <button class="w-10 h-10 rounded-2xl bg-white border border-blue-200 flex items-center justify-center text-indigo-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm hover:shadow-md group">
 <feather type="chevron-left" size="16" class="group-hover:-translate-x-0.5 transition-transform"></feather>
 </button>
 <button class="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-[13px] font-black shadow-xl shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none border-2 border-blue-400/20">1</button>
 <button class="w-10 h-10 rounded-2xl bg-white border border-blue-200 flex items-center justify-center text-indigo-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm hover:shadow-md group">
 <feather type="chevron-right" size="16" class="group-hover:translate-x-0.5 transition-transform"></feather>
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
 name: 'ListCourse',
 components: {
 feather: {
 props: ['type', 'size'],
 mounted() {
 feather.replace();
 },
 updated() {
 feather.replace();
 },
 render(h) {
 return h('i', {
 attrs: {
 'data-feather': this.type,
 'width': this.size || 24,
 'height': this.size || 24,
 },
 class: 'inline-block align-middle'
 });
 }
 }
 },
 data() {
 return {
 courses: [
 { id: 4, teacher: 'Dummy Teacher', title: 'Python Learning', sequence: 1, category: 'Tech e-books (library)', published: true, createdAtDate: '29-05-25', createdAtTime: '05:31 AM' },
 { id: 3, teacher: 'Dummy Teacher', title: 'Java learning', sequence: 1, category: 'Tech e-books (library)', published: true, createdAtDate: '29-05-25', createdAtTime: '05:30 AM' },
 { id: 2, teacher: 'Dummy Teacher', title: 'Japanese Language', sequence: 1, category: 'Language', published: true, createdAtDate: '29-05-25', createdAtTime: '05:29 AM' },
 { id: 1, teacher: 'Dummy Teacher', title: 'English Language', sequence: 1, category: 'Language', published: true, createdAtDate: '29-05-25', createdAtTime: '05:28 AM' },
 ],
 activeActionIndex: null
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
 toggleActions(index) {
 this.activeActionIndex = this.activeActionIndex === index ? null : index;
 },
 handleAction(type, course) {
 this.activeActionIndex = null;
 if (type === 'edit') {
 this.$emit('edit-course', course);
 } else if (type === 'view') {
 this.$emit('view-course', course);
 } else if (type === 'analytics') {
 this.$emit('analytics', course);
 } else {
 console.log(`${type} course:`, course.id);
 }
 }
 }
}
</script>

<style scoped>
/* Glassmorphism effects */
.glass-card {
 box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
}

/* Custom horizontal scrollbar for the table */
.overflow-x-auto::-webkit-scrollbar {
 height: 6px;
}
.overflow-x-auto::-webkit-scrollbar-track {
 background: #f0f9ff;
 border-radius: 10px;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
 background: #cbd5e1;
 border-radius: 10px;
}
.overflow-x-auto::-webkit-scrollbar-thumb:hover {
 background: #94a3b8;
}

/* Checkbox pop animation */
input[type="checkbox"]:checked + div {
 animation: check-pop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes check-pop {
 0% { transform: scale(0.8); }
 50% { transform: scale(1.1); }
 100% { transform: scale(1); }
}

/* Smooth fade in for table rows */
tbody tr {
 animation: fadeIn 0.4s ease-out forwards;
 opacity: 0;
}
tbody tr:nth-child(1) { animation-delay: 0.1s; }
tbody tr:nth-child(2) { animation-delay: 0.2s; }
tbody tr:nth-child(3) { animation-delay: 0.3s; }
tbody tr:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeIn {
 from { opacity: 0; transform: translateY(5px); }
 to { opacity: 1; transform: translateY(0); }
}
</style>
