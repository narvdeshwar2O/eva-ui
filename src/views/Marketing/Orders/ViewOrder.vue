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
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Orders</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">Order Details</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Order Details</h2>
 </div>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="chevron-left" size="14"></feather>
 Back to Orders
 </button>
 </div>
 </div>

 <!-- ORDER INFO CARDS -->
 <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
 <!-- Customer Info -->
 <div class="glass-card bg-white/80 backdrop-blur-md p-6 border border-blue-200/60">
 <h3 class="text-[12px] font-black text-blue-950 uppercase tracking-widest mb-6 flex items-center gap-2">
 <feather type="user" size="14" class="text-blue-600"></feather>
 Customer Information
 </h3>
 <div class="space-y-4">
 <div class="flex justify-between items-center border-b border-blue-100 pb-3">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Email Address</span>
 <span class="text-sm font-semibold text-blue-600">{{ order?.email || 'shashank.chitransh99@gmail.com' }}</span>
 </div>
 <div class="flex justify-between items-center border-b border-blue-100 pb-3">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Reference No.</span>
 <span class="text-sm font-bold text-blue-950">{{ order?.reference || 'vsoU4wen' }}</span>
 </div>
 <div class="flex justify-between items-center">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Order Status</span>
 <span class="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">{{ order?.payment || 'Completed' }}</span>
 </div>
 </div>
 </div>

 <!-- Summary Info -->
 <div class="glass-card bg-white/80 backdrop-blur-md p-6 border border-blue-200/60">
 <h3 class="text-[12px] font-black text-blue-950 uppercase tracking-widest mb-6 flex items-center gap-2">
 <feather type="shopping-bag" size="14" class="text-blue-600"></feather>
 Order Summary
 </h3>
 <div class="space-y-4">
 <div class="flex justify-between items-center border-b border-blue-100 pb-3">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Order Date</span>
 <span class="text-sm font-semibold text-blue-950">{{ order?.date || '9 months ago' }}</span>
 </div>
 <div class="flex justify-between items-center border-b border-blue-100 pb-3">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Amount Paid</span>
 <span class="text-sm font-black text-blue-950">₹{{ order?.amount || '0' }}</span>
 </div>
 <div class="flex justify-between items-center">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Payment Method</span>
 <span class="text-[10px] font-bold text-blue-600 uppercase">Online Payment (Razorpay)</span>
 </div>
 </div>
 </div>
 </div>

 <!-- Items Table -->
 <div class="glass-card bg-white/80 backdrop-blur-md p-6 border border-blue-200/60 text-left">
 <h3 class="text-[12px] font-black text-blue-950 uppercase tracking-widest mb-6">Ordered Items</h3>
 <div class="overflow-x-auto rounded-xl border border-blue-100 bg-white">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50 border-b border-blue-100 font-black text-[10px] text-blue-500 uppercase tracking-widest">
 <th class="px-6 py-3">Item Name</th>
 <th class="px-6 py-3 text-center">Qty</th>
 <th class="px-6 py-3 text-right">Price</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-50">
 <tr v-for="(item, i) in order?.items || ['English Language']" :key="i" class="text-xs font-semibold text-blue-700">
 <td class="px-6 py-3">{{ item }}</td>
 <td class="px-6 py-3 text-center">1</td>
 <td class="px-6 py-3 text-right font-black">₹{{ order?.amount || '0' }}</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ViewOrder',
 props: {
 order: { type: Object, default: null }
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
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 1.5rem; }
</style>
