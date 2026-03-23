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
 <span class="text-blue-950 uppercase tracking-tight">Coupons</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Coupons</h2>
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
 <div class="p-6 relative z-10 text-left space-y-6">
 
 <div class="overflow-x-auto rounded-xl border border-blue-200/60 bg-white">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/50 border-b border-blue-200/60">
 <th v-for="head in ['S.N', 'ID', 'Name', 'Code', 'Type', 'Amount', 'Expires At', 'Status', 'Show In App', 'Actions']" :key="head" class="px-4 py-3 text-[10px] font-black text-blue-700 uppercase tracking-widest border-r border-blue-100 last:border-0 whitespace-nowrap">
 {{ head }}
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100">
 <tr v-for="(coupon, index) in coupons" :key="coupon.id" class="hover:bg-blue-50/50 transition-colors">
 <td class="px-4 py-3 text-[11px] font-semibold text-blue-600 border-r border-blue-100 tabular-nums">{{ index + 1 }}</td>
 <td class="px-4 py-3 text-[11px] font-bold text-blue-600 border-r border-blue-100">{{ coupon.id }}</td>
 <td class="px-4 py-3 text-[11px] font-semibold text-blue-700 border-r border-blue-100">{{ coupon.name }}</td>
 <td class="px-4 py-3 text-[11px] font-bold text-blue-700 border-r border-blue-100">{{ coupon.code }}</td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-600 border-r border-blue-100">{{ coupon.type }}</td>
 <td class="px-4 py-3 text-[11px] font-bold text-blue-700 border-r border-blue-100 tabular-nums">{{ coupon.amount }}</td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-600 border-r border-blue-100 tabular-nums">{{ coupon.expiresAt }}</td>
 
 <td class="px-4 py-3 border-r border-blue-100 align-middle">
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="coupon.status" class="sr-only peer">
 <div class="w-9 h-5 rounded-full peer-focus:outline-none transition-all flex items-center shadow-inner relative" :class="coupon.status ? 'bg-blue-600' : 'bg-blue-200'">
 <div class="after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all shadow-sm" :class="coupon.status ? 'after:translate-x-full' : ''"></div>
 </div>
 </label>
 </td>
 
 <td class="px-4 py-3 border-r border-blue-100 align-middle">
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="coupon.showInApp" class="sr-only peer">
 <div class="w-9 h-5 rounded-full peer-focus:outline-none transition-all flex items-center shadow-inner relative" :class="coupon.showInApp ? 'bg-blue-600' : 'bg-blue-200'">
 <div class="after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all shadow-sm" :class="coupon.showInApp ? 'after:translate-x-full' : ''"></div>
 </div>
 </label>
 </td>

 <td class="px-4 py-3 text-center border-r border-blue-100 relative">
 <button @click.stop="toggleActions(coupon.id)" class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm mx-auto">
 <feather type="more-horizontal" size="14"></feather>
 </button>

 <!-- Dropdown specific to glassmorphism / specific theme -->
 <div v-if="activeActions === coupon.id" class="absolute right-12 top-0 mt-2 w-48 bg-white/95 backdrop-blur-xl border border-blue-200/60 rounded-2xl shadow-xl z-50 overflow-hidden transform origin-top-right transition-all">
 <div class="p-1.5 space-y-1">
 <button @click="$emit('view', coupon)" class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 transition-colors rounded-xl">
 <feather type="eye" size="12"></feather> View
 </button>
 <button @click="$emit('edit', coupon)" class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 transition-colors rounded-xl">
 <feather type="edit-2" size="12"></feather> Edit
 </button>
 <button class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2 text-[10px] font-black text-rose-600 uppercase tracking-widest hover:bg-rose-50 transition-colors rounded-xl">
 <feather type="trash-2" size="12"></feather> Delete
 </button>
 </div>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ListCoupons',
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
 activeActions: null,
 coupons: [
 { id: 13, name: 'This coupon only for testing Purpose', code: 'MYCOUPON/1', type: 'Discount Rate (in %)', amount: 100, expiresAt: '20 Feb 2025', status: true, showInApp: false },
 { id: 12, name: 'Coupons for all', code: 'HUPKLIN/1', type: 'Discount Rate (in %)', amount: 100, expiresAt: '31 Jan 2025', status: true, showInApp: false },
 { id: 11, name: 'Single Coupon for all users', code: 'NEWYEAR2025/1', type: 'Discount Rate (in %)', amount: 100, expiresAt: '05 Jan 2025', status: true, showInApp: false },
 { id: 10, name: 'Single Coupon', code: 'newyear25/1', type: 'Discount Rate (in %)', amount: 100, expiresAt: '04 Jan 2025', status: true, showInApp: false },
 { id: 5, name: 'Multiple coupons for a user', code: 'BECAEE/3', type: 'Discount Rate (in %)', amount: 100, expiresAt: '04 Jan 2025', status: true, showInApp: false },
 { id: 4, name: 'Sample coupons for app', code: 'EVATESTING/1', type: 'Discount Rate (in %)', amount: 100, expiresAt: '03 Jan 2025', status: true, showInApp: false },
 { id: 1, name: 'For Internal Use', code: 'E170E9/3', type: 'Discount Rate (in %)', amount: 100, expiresAt: '03 Jan 2025', status: true, showInApp: false }
 ]
 }
 },
 mounted() {
 document.addEventListener('click', this.closeActions);
 },
 beforeDestroy() {
 document.removeEventListener('click', this.closeActions);
 },
 methods: {
 toggleActions(id) {
 if (this.activeActions === id) {
 this.activeActions = null;
 } else {
 this.activeActions = id;
 }
 },
 closeActions() {
 this.activeActions = null;
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
