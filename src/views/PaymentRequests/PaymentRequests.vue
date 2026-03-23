<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">Payment Requests</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Payment Requests</h2>
 </div>
 </div>
 </div>

 <!-- MAIN CARD -->
 <div class="glass-card bg-white/80 backdrop-blur-md border border-blue-200/60 p-6">
 <!-- Toolbar -->
 <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
 <!-- Filters (Tabs) -->
 <div class="flex items-center gap-1 bg-blue-100 p-1 rounded-xl w-fit">
 <button 
 v-for="tab in ['All', 'Approved', 'Rejected']" 
 :key="tab"
 @click="activeTab = tab"
 :class="[ 'px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all', activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-blue-500 hover:text-blue-950' ]"
 >
 {{ tab }}
 </button>
 </div>

 <!-- Entries & Search -->
 <div class="flex flex-wrap items-center gap-4">
 <div class="flex items-center gap-3 bg-blue-50 border border-blue-200 px-4 py-2 rounded-2xl">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Show</span>
 <select class="bg-transparent text-xs font-bold outline-none cursor-pointer">
 <option>10</option>
 <option>25</option>
 <option>50</option>
 </select>
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Entries</span>
 </div>

 <div class="relative group">
 <input 
 type="text" 
 placeholder="Search teacher..." 
 class="w-64 h-11 pl-12 pr-6 rounded-2xl bg-white border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 transition-all"
 />
 <feather type="search" size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 group-focus-within:text-blue-600 transition-colors"></feather>
 </div>

 <!-- Export Actions -->
 <div class="flex items-center gap-2">
 <button v-for="icon in ['file-text', 'copy', 'printer']" :key="icon" class="w-10 h-10 rounded-xl bg-blue-950 text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-blue-950/10">
 <feather :type="icon" size="14"></feather>
 </button>
 </div>
 </div>
 </div>

 <!-- TABLE AREA -->
 <div class="overflow-x-auto rounded-3xl border border-blue-100 bg-white">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/80 text-[10px] font-black text-blue-500 uppercase tracking-widest whitespace-nowrap border-b border-blue-100">
 <th class="px-6 py-3 border-r border-blue-100/50">S.N</th>
 <th class="px-6 py-3 border-r border-blue-100/50">ID</th>
 <th class="px-6 py-3 border-r border-blue-100/50">Teacher Name</th>
 <th class="px-6 py-3 border-r border-blue-100/50">Amount</th>
 <th class="px-6 py-3 border-r border-blue-100/50">Total Balance</th>
 <th class="px-6 py-3 border-r border-blue-100/50">Status</th>
 <th class="px-6 py-3 border-r border-blue-100/50">Date</th>
 <th class="px-6 py-3 text-center">Actions</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-50 text-[11px] font-bold text-blue-600">
 <tr v-for="(req, idx) in filteredRequests" :key="req.id" class="group hover:bg-blue-50/30 transition-colors">
 <td class="px-6 py-3 tabular-nums text-indigo-400 font-medium">{{ idx + 1 }}</td>
 <td class="px-6 py-3 text-blue-950">#{{ req.id }}</td>
 <td class="px-6 py-3">
 <div class="flex items-center gap-3">
 <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-indigo-400 overflow-hidden border border-blue-200">
 <img v-if="req.avatar" :src="req.avatar" class="w-full h-full object-cover" />
 <feather v-else type="user" size="14"></feather>
 </div>
 <span class="text-blue-950 tracking-tight">{{ req.teacher }}</span>
 </div>
 </td>
 <td class="px-6 py-3 text-blue-950">₹ {{ req.amount }}</td>
 <td class="px-6 py-3 text-indigo-400">₹ {{ req.balance }}</td>
 <td class="px-6 py-3">
 <span :class="[ 'px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest', statusClasses[req.status] ]">
 {{ req.status }}
 </span>
 </td>
 <td class="px-6 py-3 font-semibold whitespace-nowrap text-indigo-400 text-[10px]">{{ req.date }}</td>
 <td class="px-6 py-3">
 <div class="flex items-center justify-center gap-2">
 <button @click="handleAction('approve', req.id)" class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm" title="Approve">
 <feather type="check" size="14"></feather>
 </button>
 <button @click="handleAction('reject', req.id)" class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm" title="Reject">
 <feather type="x" size="14"></feather>
 </button>
 </div>
 </td>
 </tr>
 <tr v-if="filteredRequests.length === 0">
 <td colspan="8" class="px-6 py-20 text-center">
 <div class="flex flex-col items-center justify-center space-y-3 opacity-40">
 <feather type="inbox" size="48" class="text-indigo-300"></feather>
 <p class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">No payment requests found in table</p>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <!-- Pagination -->
 <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
 <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Showing {{ filteredRequests.length }} of {{ requests.length }} entries</p>
 <div class="flex items-center gap-1.5">
 <button class="w-9 h-9 rounded-xl border border-blue-200 flex items-center justify-center text-indigo-400 hover:bg-blue-50 transition-all"><feather type="chevron-left" size="14"></feather></button>
 <button class="w-9 h-9 rounded-xl bg-blue-600 text-white text-xs font-black shadow-lg shadow-blue-500/20">1</button>
 <button class="w-9 h-9 rounded-xl border border-blue-200 text-blue-600 text-xs font-black hover:bg-blue-50 transition-all">2</button>
 <button class="w-9 h-9 rounded-xl border border-blue-200 flex items-center justify-center text-indigo-400 hover:bg-blue-50 transition-all"><feather type="chevron-right" size="14"></feather></button>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'PaymentRequests',
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
 activeTab: 'All',
 statusClasses: {
 'Pending': 'bg-amber-50 text-amber-600',
 'Approved': 'bg-emerald-50 text-emerald-600',
 'Rejected': 'bg-rose-50 text-rose-600'
 },
 requests: [
 { id: 4521, teacher: 'Dr. Sarah Wilson', avatar: 'https://i.pravatar.cc/150?u=sarah', amount: '12,500', balance: '28,400', status: 'Pending', date: 'Mar 12, 2026' },
 { id: 4518, teacher: 'John Anderson', avatar: 'https://i.pravatar.cc/150?u=john', amount: '8,200', balance: '15,600', status: 'Approved', date: 'Mar 10, 2026' },
 { id: 4515, teacher: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?u=emily', amount: '4,500', balance: '9,200', status: 'Rejected', date: 'Mar 08, 2026' },
 { id: 4512, teacher: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?u=michael', amount: '15,000', balance: '45,000', status: 'Pending', date: 'Mar 05, 2026' }
 ]
 }
 },
 computed: {
 filteredRequests() {
 if (this.activeTab === 'All') return this.requests;
 return this.requests.filter(r => r.status === this.activeTab);
 }
 },
 methods: {
 handleAction(type, id) {
 alert(`Request #${id} marked as ${type}`);
 }
 }
}
</script>

<style scoped>
.glass-card { border-radius: 2.5rem; }
</style>
