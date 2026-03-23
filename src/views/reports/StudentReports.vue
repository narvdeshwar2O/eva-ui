<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase">Reports</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase">Students Report</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Students Report</h2>
 </div>
 </div>

 <!-- MAIN FILTER CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="p-6 relative z-10 text-left">
 <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
 <div class="space-y-1.5">
 <label class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Select Report Type</label>
 <select class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm cursor-pointer appearance-none">
 <option value="">Select Report Type</option>
 <option value="attendance">Attendance Report</option>
 <option value="performance">Performance Report</option>
 <option value="enrollment">Enrollment Report</option>
 </select>
 </div>
 <div class="space-y-1.5">
 <label class="text-[10px] font-black text-blue-500 uppercase tracking-widest">From Date</label>
 <input type="date" class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Till Date</label>
 <div class="flex items-center gap-4">
 <input type="date" class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm" />
 <button class="px-6 h-11 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">Filter</button>
 </div>
 </div>
 </div>

 <div class="flex items-center justify-between mt-8">
 <div class="relative">
 <input type="text" placeholder="Search report details..." class="w-80 h-10 pl-10 pr-4 rounded-xl bg-white border border-blue-200 text-xs focus:outline-none focus:border-blue-600 transition-all shadow-sm" />
 <feather type="search" size="13" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>
 <div class="flex items-center gap-2">
 <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100/50 hover:bg-indigo-100 transition-all">
 <feather type="file-text" size="12"></feather> CSV
 </button>
 <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100/50 hover:bg-emerald-100 transition-all">
 <feather type="file" size="12"></feather> Excel
 </button>
 </div>
 </div>

 <!-- Table Container -->
 <div class="overflow-x-auto rounded-2xl border border-blue-100 shadow-sm bg-white/50 backdrop-blur-sm mt-6">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/50 border-b border-blue-100">
 <th v-for="head in ['S.N', 'Student Name', 'Category', 'Course', 'Date', 'Status', 'Record']" :key="head" class="px-5 py-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] whitespace-nowrap">
 {{ head }}
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100/60">
 <tr v-if="records.length === 0">
 <td colspan="7" class="px-5 py-20 text-center">
 <div class="flex flex-col items-center gap-3">
 <div class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-200 border-4 border-white shadow-inner">
 <feather type="file-minus" size="32"></feather>
 </div>
 <p class="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em]">No data available in table</p>
 </div>
 </td>
 </tr>
 <tr v-for="(item, index) in records" :key="item.id" class="group hover:bg-blue-50/40 transition-all duration-300">
 <td class="px-5 py-3 text-[11px] font-normal text-black tabular-nums">{{ index + 1 }}</td>
 <td class="px-5 py-3 text-[11px] font-bold text-blue-900">{{ item.name }}</td>
 <td class="px-5 py-3 text-[11px] font-medium text-blue-500 uppercase tracking-tight">{{ item.category }}</td>
 <td class="px-5 py-3 text-[11px] font-bold text-blue-600">{{ item.course }}</td>
 <td class="px-5 py-3 text-[11px] font-medium text-blue-500 tabular-nums">{{ item.date }}</td>
 <td class="px-5 py-3">
 <span :class="['px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter border', item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100']">
 {{ item.status }}
 </span>
 </td>
 <td class="px-5 py-3 text-[11px] font-bold text-blue-950">
 <button @click="$emit('view-report', item)" class="flex items-center gap-1 hover:text-blue-600 transition-colors">
 <feather type="file-text" size="12"></feather>
 View Report
 </button>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <!-- Pagination -->
 <div class="flex items-center justify-between pt-6">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Showing {{ records.length ? '1' : '0' }} to {{ records.length }} of {{ records.length }} entries</span>
 <div class="flex gap-2">
 <button class="w-9 h-9 flex items-center justify-center rounded-xl border border-blue-200 text-indigo-400 hover:border-blue-600 transition-all"><feather type="chevron-left" size="14"></feather></button>
 <button class="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 text-[11px] font-black">1</button>
 <button class="w-9 h-9 flex items-center justify-center rounded-xl border border-blue-200 text-indigo-400 hover:border-blue-600 transition-all"><feather type="chevron-right" size="14"></feather></button>
 </div>
 </div>
 </div>
 </div>

 <!-- FOOTER -->
 <div class="text-center py-6 mt-12 border-t border-blue-100">
 <p class="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em]">Copyright © 2026 Admin Panel All Rights Reserved. <span class="ml-4">Powered By Evoclasses</span></p>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'StudentReports',
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
 records: [
 { id: 1, name: 'Ashish Kumar', category: 'Academic', course: 'Python Learning', date: '2023-10-15', status: 'Completed' },
 { id: 2, name: 'John Doe', category: 'Professional', course: 'Java Masterclass', date: '2023-11-20', status: 'Active' },
 { id: 3, name: 'Jane Smith', category: 'Academic', course: 'Advanced Vue.js', date: '2023-12-05', status: 'Active' },
 { id: 4, name: 'Mike Ross', category: 'General', course: 'Competitive Coding', date: '2024-01-10', status: 'Completed' }
 ]
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 1.5rem; border: 1px solid rgba(255, 255, 255, 0.2); }
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
