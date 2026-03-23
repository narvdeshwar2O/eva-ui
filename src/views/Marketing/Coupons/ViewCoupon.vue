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
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Coupons</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">View Coupon</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Coupons</h2>
 </div>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="eye" size="14"></feather>
 View Coupons
 </button>
 </div>
 </div>

 <!-- MAIN VIEW CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-8 relative z-10 text-left">
 
 <div class="overflow-x-auto rounded-xl border border-blue-200/60 bg-white">
 <table class="w-full text-left border-collapse">
 <tbody class="divide-y divide-blue-100">
 <tr class="hover:bg-blue-50/50 transition-colors">
 <td class="px-6 py-3 w-1/4 text-[11px] font-black text-blue-900 uppercase tracking-widest bg-blue-50/50 border-r border-blue-100">Name</td>
 <td class="px-6 py-3 text-xs font-semibold text-blue-950">{{ coupon?.name || 'This coupon only for testing Purpose' }}</td>
 </tr>
 <tr class="hover:bg-blue-50/50 transition-colors">
 <td class="px-6 py-3 w-1/4 text-[11px] font-black text-blue-900 uppercase tracking-widest bg-blue-50/50 border-r border-blue-100">Description</td>
 <td class="px-6 py-3 text-xs font-semibold text-blue-950">{{ coupon?.name || 'This coupon only for testing Purpose' }}</td>
 </tr>
 <tr class="hover:bg-blue-50/50 transition-colors">
 <td class="px-6 py-3 w-1/4 text-[11px] font-black text-blue-900 uppercase tracking-widest bg-blue-50/50 border-r border-blue-100">Code</td>
 <td class="px-6 py-3 text-xs font-semibold text-blue-950">{{ coupon?.code || 'MYCOUPON' }}</td>
 </tr>
 <tr class="hover:bg-blue-50/50 transition-colors">
 <td class="px-6 py-3 w-1/4 text-[11px] font-black text-blue-900 uppercase tracking-widest bg-blue-50/50 border-r border-blue-100">Type</td>
 <td class="px-6 py-3 text-xs font-semibold text-blue-950">{{ coupon?.type || 'Discount Rate (in %)' }}</td>
 </tr>
 <tr class="hover:bg-blue-50/50 transition-colors">
 <td class="px-6 py-3 w-1/4 text-[11px] font-black text-blue-900 uppercase tracking-widest bg-blue-50/50 border-r border-blue-100">Amount</td>
 <td class="px-6 py-3 text-xs font-semibold text-blue-950">{{ coupon?.amount || '100' }}</td>
 </tr>
 <tr class="hover:bg-blue-50/50 transition-colors">
 <td class="px-6 py-3 w-1/4 text-[11px] font-black text-blue-900 uppercase tracking-widest bg-blue-50/50 border-r border-blue-100">Expires At</td>
 <td class="px-6 py-3 text-xs font-semibold text-blue-950 tabular-nums">{{ coupon?.expiresAt || '20 Feb 2025' }}</td>
 </tr>
 <tr class="hover:bg-blue-50/50 transition-colors">
 <td class="px-6 py-3 w-1/4 text-[11px] font-black text-blue-900 uppercase tracking-widest bg-blue-50/50 border-r border-blue-100">Status</td>
 <td class="px-6 py-3 text-xs font-semibold text-blue-950">{{ coupon?.status ? 'On' : 'On' }}</td>
 </tr>
 <tr class="hover:bg-blue-50/50 transition-colors">
 <td class="px-6 py-3 w-1/4 text-[11px] font-black text-blue-900 uppercase tracking-widest bg-blue-50/50 border-r border-blue-100">Minimum Order Price</td>
 <td class="px-6 py-3 text-xs font-semibold text-blue-950">100</td>
 </tr>
 <tr class="hover:bg-blue-50/50 transition-colors">
 <td class="px-6 py-3 w-1/4 text-[11px] font-black text-blue-900 uppercase tracking-widest bg-blue-50/50 border-r border-blue-100">Per User Limit</td>
 <td class="px-6 py-3 text-xs font-semibold text-blue-950 tabular-nums">100000</td>
 </tr>
 </tbody>
 </table>
 </div>

 <div class="mt-6">
 <button 
 @click="$emit('back')"
 class="w-fit px-8 mx-auto sm:mx-0 py-3 rounded-xl bg-blue-50 text-blue-600 font-black uppercase text-[11px] tracking-widest shadow-sm border border-blue-200 hover:bg-blue-100 transition-all duration-300"
 >
 Back to list
 </button>
 </div>

 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ViewCoupon',
 props: {
 coupon: { type: Object, default: null }
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
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
