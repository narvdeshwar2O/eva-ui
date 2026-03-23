<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Access</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">User Management</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">User Courses</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Extend Validity</h2>
 <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">{{ user?.name || '' }} Courses</span>
 </div>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('add')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="plus-circle" size="14"></feather>
 ADD
 </button>
 </div>
 </div>

 <!-- MAIN LIST CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 relative z-10 text-left space-y-4">
 
 <div class="flex items-center gap-3 pb-2 text-[11px] font-bold">
 <span class="text-blue-600 cursor-pointer">All</span>
 <span class="text-indigo-300">|</span>
 <span class="text-blue-500 hover:text-blue-950 cursor-pointer">Trash</span>
 </div>

 <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4">
 <div class="flex items-center gap-4">
 <div class="flex items-center gap-2">
 <span class="text-[11px] font-bold text-blue-600">Show</span>
 <select class="h-9 px-2 rounded-lg bg-white border border-blue-500/50 text-xs font-semibold text-blue-950 outline-none focus:border-blue-600 transition-all cursor-pointer">
 <option>10</option>
 <option>25</option>
 <option>50</option>
 </select>
 <span class="text-[11px] font-bold text-blue-600">entries</span>
 </div>
 </div>
 
 <div class="flex items-center gap-4">
 <div class="flex items-center gap-2">
 <span class="text-[11px] font-bold text-blue-600">Search:</span>
 <input 
 v-model="searchQuery"
 type="text" 
 class="w-48 h-9 px-3 rounded-full bg-white border border-blue-600 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-blue-950 font-semibold"
 />
 </div>
 <div class="flex items-center gap-2">
 <button class="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"><feather type="copy" size="12"></feather></button>
 <button class="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"><feather type="download" size="12"></feather></button>
 <button class="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"><feather type="printer" size="12"></feather></button>
 </div>
 </div>
 </div>

 <div class="overflow-x-auto rounded-xl border border-blue-200/60 bg-white">
 <table class="w-full text-left border-collapse min-w-[max-content]">
 <thead>
 <tr class="bg-blue-50/50 border-b border-blue-200/60">
 <th v-for="head in ['S.N', 'Users', 'Course', 'Phone No.', 'Created At', 'Manual Unlock', 'Validity', 'Revert', 'Actions']" :key="head" class="px-4 py-3 text-[10px] font-black text-blue-700 uppercase tracking-widest border-r border-blue-100 last:border-0 whitespace-nowrap">
 <div class="flex items-center justify-between gap-2">
 {{ head }}
 <div class="flex flex-col opacity-30">
 <feather type="chevron-up" size="10" class="-mb-1"></feather>
 <feather type="chevron-down" size="10"></feather>
 </div>
 </div>
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100">
 <tr v-for="(item, index) in filteredRecords" :key="index" class="hover:bg-blue-50/50 transition-colors">
 <td class="px-4 py-3 text-[11px] font-semibold text-blue-600 border-r border-blue-100 tabular-nums">{{ index + 1 }}</td>
 <td class="px-4 py-3 text-[11px] text-blue-600 font-medium border-r border-blue-100">{{ item.email }}</td>
 <td class="px-4 py-3 text-[11px] font-semibold text-blue-700 border-r border-blue-100">{{ item.course }}</td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-600 border-r border-blue-100 tabular-nums">{{ item.phone }}</td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-600 border-r border-blue-100 tabular-nums">{{ item.createdAt }}</td>
 <td class="px-4 py-3 text-[11px] font-semibold text-blue-700 border-r border-blue-100">{{ item.manualUnlock }}</td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-600 border-r border-blue-100 tabular-nums">{{ item.validity }}</td>
 <td class="px-4 py-3 text-[11px] font-semibold text-blue-700 border-r border-blue-100 uppercase tracking-tight">{{ item.revert }}</td>
 <td class="px-4 py-3 text-center border-r border-blue-100">
 <button class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm mx-auto">
 <feather type="more-horizontal" size="14"></feather>
 </button>
 </td>
 </tr>
 <tr v-if="filteredRecords.length === 0">
 <td colspan="9" class="px-4 py-8 text-center text-sm font-semibold text-blue-500">No courses found for this user.</td>
 </tr>
 </tbody>
 </table>
 </div>

 <div class="flex items-center justify-between pt-2">
 <div class="flex items-center gap-1.5">
 <button class="w-8 h-8 flex items-center justify-center rounded-full border border-blue-200 text-[10px] font-bold text-indigo-400 hover:border-blue-600 hover:text-blue-600 transition-colors"><feather type="chevron-left" size="12"></feather></button>
 <button class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-500/20 text-[10px] font-black">1</button>
 <button class="w-8 h-8 flex items-center justify-center rounded-full border border-blue-200 text-[10px] font-bold text-indigo-400 hover:border-blue-600 hover:text-blue-600 transition-colors"><feather type="chevron-right" size="12"></feather></button>
 </div>
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Showing 1 to {{ filteredRecords.length }} of {{ records.length }} entries</span>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ViewUserCourse',
 props: {
 user: { type: Object, default: null }
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
 records: [
 { 
 email: 'shashank.chitransh99@gmail.com', phone: '6395772952', 
 course: 'English Language', createdAt: '29-May-2025',
 manualUnlock: 'Yes', validity: '2025-08-29', revert: 'NO'
 }
 ]
 }
 },
 computed: {
 filteredRecords() {
 if (!this.searchQuery) return this.records;
 const q = this.searchQuery.toLowerCase();
 return this.records.filter(r => 
 r.course.toLowerCase().includes(q) || 
 r.email.toLowerCase().includes(q)
 );
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
