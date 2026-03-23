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
 <span class="text-blue-950 uppercase">Sales Report</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Sales Report</h2>
 </div>
 <div class="flex items-center gap-3">
 <button class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-blue-200 text-blue-600 text-[11px] font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
 <feather type="download" size="14"></feather>
 Export All
 </button>
 </div>
 </div>

 <!-- FILTER CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="p-6 relative z-10 text-left">
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 <div class="space-y-1.5">
 <label class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Date Range</label>
 <div class="relative group">
 <input type="date" v-model="filters.dateRange" class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm" />
 <feather type="calendar" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none group-hover:text-blue-600 transition-colors"></feather>
 </div>
 </div>
 <div class="space-y-1.5">
 <label class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Select Student</label>
 <select v-model="filters.student" class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm appearance-none cursor-pointer">
 <option value="">Select Student</option>
 <option v-for="s in students" :key="s.id" :value="s.id">{{ s.name }}</option>
 </select>
 </div>
 <div class="space-y-1.5">
 <label class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Select Course</label>
 <select v-model="filters.course" class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm appearance-none cursor-pointer">
 <option value="">Select Course</option>
 <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.title }}</option>
 </select>
 </div>
 <div class="space-y-1.5">
 <label class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Select Bundle</label>
 <select v-model="filters.bundle" class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm appearance-none cursor-pointer">
 <option value="">Select Bundle</option>
 <option value="1">Standard Bundle</option>
 <option value="2">Premium Bundle</option>
 </select>
 </div>
 </div>
 <div class="flex items-center gap-3 mt-6">
 <button class="px-6 py-3 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">Filter</button>
 <button class="px-6 py-3 rounded-xl bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-200 transition-all">Reset</button>
 </div>
 </div>
 </div>

 <!-- STATS CARDS -->
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 <div v-for="stat in stats" :key="stat.label" class="glass-card relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
 <div :class="['absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity bg-gradient-to-br', stat.colorClass]"></div>
 <div class="p-6 relative z-10 flex flex-col items-center justify-center space-y-2">
 <div :class="['w-10 h-10 rounded-2xl flex items-center justify-center mb-2', stat.iconBg]">
 <feather :type="stat.icon" size="18" :class="stat.iconColor"></feather>
 </div>
 <p class="text-3xl font-black text-blue-950 tracking-tight">{{ stat.prefix }}{{ stat.value }}</p>
 <p class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{{ stat.label }}</p>
 </div>
 </div>
 </div>

 <!-- TABLES SECTION -->
 <div v-for="section in ['Courses', 'Combo']" :key="section" class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 space-y-6 relative z-10 text-left">
 <div class="flex items-center justify-between">
 <h3 class="text-lg font-black text-blue-950 tracking-tight">{{ section }}</h3>
 <div class="flex items-center gap-3">
 <div class="relative">
 <input type="text" placeholder="Search..." class="w-64 h-10 pl-10 pr-4 rounded-xl bg-blue-50 border border-blue-200 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm" />
 <feather type="search" size="13" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>
 <div class="flex items-center gap-1.5 p-1 bg-blue-50 rounded-lg border border-blue-100 shadow-inner">
 <button class="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md text-indigo-400 hover:text-rose-600 transition-all"><feather type="file-text" size="13"></feather></button>
 <button class="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md text-indigo-400 hover:text-emerald-600 transition-all"><feather type="file" size="13"></feather></button>
 <button class="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md text-indigo-400 hover:text-blue-600 transition-all"><feather type="printer" size="13"></feather></button>
 </div>
 </div>
 </div>

 <div class="overflow-x-auto rounded-2xl border border-blue-100 shadow-sm bg-white/50 backdrop-blur-sm">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/50 border-b border-blue-100">
 <th v-for="head in ['S.N', 'ID', 'Student', 'Name', 'Transaction ID', 'Amount (in ₹)', 'Date', 'Actions']" :key="head" class="px-5 py-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] whitespace-nowrap">
 {{ head }}
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100/60">
 <tr v-if="salesData[section.toLowerCase()].length === 0">
 <td colspan="8" class="px-5 py-12 text-center text-indigo-400 font-bold text-sm bg-blue-50/20 tracking-widest uppercase">
 No data available in table
 </td>
 </tr>
 <tr v-for="(item, index) in salesData[section.toLowerCase()]" :key="item.id" class="group hover:bg-blue-50/40 transition-all duration-300">
 <td class="px-5 py-3 text-[11px] font-normal text-black tabular-nums">{{ index + 1 }}</td>
 <td class="px-5 py-3 text-[11px] font-bold text-blue-900">{{ item.id }}</td>
 <td class="px-5 py-3 text-[11px] font-bold text-blue-600">{{ item.student }}</td>
 <td class="px-5 py-3 text-[11px] font-medium text-blue-600">{{ item.name }}</td>
 <td class="px-5 py-3 text-[11px] font-medium text-indigo-400 tabular-nums">{{ item.transactionId }}</td>
 <td class="px-5 py-3 text-[11px] font-black text-blue-950 tabular-nums">₹ {{ item.amount }}</td>
 <td class="px-5 py-3 text-[11px] font-medium text-blue-500">{{ item.date }}</td>
 <td class="px-5 py-3">
 <button @click="$emit('view-report', item)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950 text-white text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-sm">
 <feather type="eye" size="10"></feather> View
 </button>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <!-- Pagination -->
 <div class="flex items-center justify-between pt-4 border-t border-blue-50">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Showing 0 to 0 of 0 entries</span>
 <div class="flex gap-2">
 <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-200 text-indigo-400 hover:border-blue-600 transition-all"><feather type="chevron-left" size="12"></feather></button>
 <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-200 text-indigo-400 hover:border-blue-600 transition-all"><feather type="chevron-right" size="12"></feather></button>
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
 name: 'SalesReports',
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
 filters: {
 dateRange: '',
 student: '',
 course: '',
 bundle: ''
 },
 students: [
 { id: 1, name: 'Ashish Kumar' },
 { id: 2, name: 'John Doe' }
 ],
 courses: [
 { id: 1, title: 'Python Learning' },
 { id: 2, title: 'Java Masterclass' }
 ],
 stats: [
 { label: 'Total Earnings', value: '0', prefix: '₹', icon: 'dollar-sign', colorClass: 'from-emerald-600 to-teal-400', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
 { label: 'Total Sales', value: '1', prefix: '', icon: 'shopping-bag', colorClass: 'from-purple-600 to-indigo-400', iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
 { label: 'Total Subscribe', value: '0', prefix: '', icon: 'users', colorClass: 'from-blue-600 to-sky-400', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
 { label: 'Subscribe Earning', value: '0', prefix: '₹', icon: 'trending-up', colorClass: 'from-rose-600 to-orange-400', iconBg: 'bg-rose-50', iconColor: 'text-rose-600' }
 ],
 salesData: {
 courses: [
 { id: 'ORD-7721', student: 'Ashish Kumar', name: 'Python Masterclass', transactionId: 'TXN-9920112', amount: '1,299', date: '2023-10-15' },
 { id: 'ORD-7722', student: 'John Doe', name: 'Java Basics', transactionId: 'TXN-9920113', amount: '899', date: '2023-10-16' }
 ],
 combo: [
 { id: 'ORD-8821', student: 'Jane Smith', name: 'Full Stack Bundle', transactionId: 'TXN-8820112', amount: '4,500', date: '2023-10-17' }
 ]
 }
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
input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; filter: grayscale(1) opacity(0.5); }
</style>
