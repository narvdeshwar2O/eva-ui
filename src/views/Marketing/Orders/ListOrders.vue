<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Marketing</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">Orders</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Orders</h2>
 </div>
 </div>
 </div>

 <!-- MAIN LIST CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 relative z-10 text-left space-y-4">
 
 <div class="flex items-center gap-3 pb-2 text-[11px] font-bold">
 <span class="text-blue-600 cursor-pointer">All</span>
 <span class="text-indigo-300">|</span>
 <span class="text-blue-500 hover:text-blue-950 cursor-pointer">Offline Requests</span>
 </div>

 <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4">
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
 <th class="px-4 py-3 w-10 border-r border-blue-100">
 <input type="checkbox" class="w-4 h-4 rounded border-indigo-300 text-blue-600 focus:ring-blue-600">
 </th>
 <th v-for="head in ['S.N', 'ID', 'Reference No.', 'Items', 'Amount (in ₹)', 'Payment', 'User Email', 'Order date', 'Actions']" :key="head" class="px-4 py-3 text-[10px] font-black text-blue-700 uppercase tracking-widest border-r border-blue-100 last:border-0 whitespace-nowrap">
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
 <tr v-for="(order, index) in filteredOrders" :key="order.id" class="hover:bg-blue-50/50 transition-colors">
 <td class="px-4 py-3 border-r border-blue-100">
 <input type="checkbox" class="w-4 h-4 rounded border-indigo-300 text-blue-600 focus:ring-blue-600">
 </td>
 <td class="px-4 py-3 text-[11px] font-semibold text-blue-600 border-r border-blue-100 tabular-nums">{{ index + 1 }}</td>
 <td class="px-4 py-3 text-[11px] font-bold text-blue-600 border-r border-blue-100">{{ order.id }}</td>
 <td class="px-4 py-3 text-[11px] font-semibold text-blue-700 border-r border-blue-100">{{ order.reference }}</td>
 <td class="px-4 py-3 text-[11px] font-semibold text-blue-700 border-r border-blue-100">
 <div class="flex flex-col">
 <span v-for="(item, i) in order.items" :key="i">{{ i+1 }}. {{ item }}</span>
 </div>
 </td>
 <td class="px-4 py-3 text-[11px] font-bold text-blue-700 border-r border-blue-100 tabular-nums">{{ order.amount }}</td>
 <td class="px-4 py-3 border-r border-blue-100">
 <span :class="['px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest', order.payment === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600']">
 {{ order.payment }}
 </span>
 </td>
 <td class="px-4 py-3 text-[11px] text-blue-600 font-medium border-r border-blue-100">{{ order.email }}</td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-500 border-r border-blue-100">{{ order.date }}</td>
 <td class="px-4 py-3 text-center border-r border-blue-100">
 <button @click.stop="$emit('view', order)" class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm mx-auto">
 <feather type="eye" size="14"></feather>
 </button>
 </td>
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
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Showing 1 to {{ filteredOrders.length }} of {{ orders.length }} entries</span>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ListOrders',
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
 orders: [
 { id: 1, reference: 'vsoU4wen', items: ['English Language'], amount: 0, payment: 'Completed', email: 'shashank.chitransh99@gmail.com', date: '9 months ago' }
 ]
 }
 },
 computed: {
 filteredOrders() {
 if (!this.searchQuery) return this.orders;
 const q = this.searchQuery.toLowerCase();
 return this.orders.filter(o => 
 o.email.toLowerCase().includes(q) || 
 o.reference.toLowerCase().includes(q) ||
 o.items.some(i => i.toLowerCase().includes(q))
 );
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
