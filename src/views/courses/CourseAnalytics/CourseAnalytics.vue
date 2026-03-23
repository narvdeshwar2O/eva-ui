<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('navigate', 'list_course')" class="hover:text-blue-600 cursor-pointer transition-colors">Courses</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950">Course Analytics</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Course Analytics</h2>
 </div>
 <button 
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="download" size="14"></feather>
 Download Report
 </button>
 </div>

 <!-- Filters & Table Card -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 
 <div class="p-6 space-y-6 relative z-10">
 <!-- Top Toolbar -->
 <div class="flex flex-col lg:flex-row lg:items-center justify-end gap-4">
 <div class="relative min-w-[280px]">
 <input 
 type="text" 
 placeholder="Search..." 
 class="w-full h-11 pl-11 pr-4 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold shadow-inner placeholder:text-indigo-300"
 />
 <feather type="search" size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>
 </div>

 <!-- Table Container -->
 <div class="overflow-x-auto rounded-2xl border border-blue-100 shadow-sm bg-white/50 backdrop-blur-sm">
 <table class="w-full text-left border-collapse min-w-[1500px]">
 <thead>
 <tr class="bg-blue-50/50 border-b border-blue-100">
 <th v-for="head in ['S.N', 'User Id', 'First Name', 'Last Name', 'E-mail', 'Contact No.', 'Courses', 'Selling Price', 'Coupon Apply', 'Manual Unlock', 'purchase Date', 'Validity']" :key="head" class="px-5 py-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
 <div class="flex items-center gap-1.5 grayscale opacity-70 hover:opacity-100 transition-all cursor-pointer group">
 {{ head }}
 <feather type="chevron-down" size="10" class="group-hover:translate-y-0.5 transition-transform"></feather>
 </div>
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100/60">
 <tr v-if="analyticsData.length === 0">
 <td colspan="12" class="px-5 py-12 text-center text-indigo-400 font-bold text-sm bg-blue-50/20">
 No data available in table
 </td>
 </tr>
 <tr 
 v-for="(item, index) in analyticsData" 
 :key="index" 
 class="group hover:bg-blue-50/40 transition-all duration-300"
 >
 <td class="px-5 py-3 text-[11px] font-normal text-black tabular-nums">{{ index + 1 }}</td>
 <td class="px-5 py-3 text-[11px] font-normal text-black tabular-nums">#{{ item.userId }}</td>
 <td class="px-5 py-3 text-[11px] font-normal text-black">{{ item.firstName }}</td>
 <td class="px-5 py-3 text-[11px] font-normal text-black">{{ item.lastName }}</td>
 <td class="px-5 py-3 text-[11px] font-normal text-blue-600 cursor-pointer underline underline-offset-4 decoration-blue-200">{{ item.email }}</td>
 <td class="px-5 py-3 text-[11px] font-normal text-black tabular-nums">{{ item.contact }}</td>
 <td class="px-5 py-3">
 <span class="px-2.5 py-1 rounded-lg bg-blue-50/50 text-[9px] font-normal text-black border border-blue-100/50 uppercase tracking-widest whitespace-nowrap">
 {{ item.course }}
 </span>
 </td>
 <td class="px-5 py-3 text-[11px] font-black text-blue-950 tabular-nums">₹{{ item.price }}</td>
 <td class="px-5 py-3">
 <span :class="['px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tight', item.coupon ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-blue-100 text-indigo-400 border border-blue-200']">
 {{ item.coupon || 'None' }}
 </span>
 </td>
 <td class="px-5 py-3">
 <div :class="['w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-sm', item.manualUnlock ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-blue-50 text-indigo-400 border border-blue-100']">
 <feather :type="item.manualUnlock ? 'unlock' : 'lock'" size="14"></feather>
 </div>
 </td>
 <td class="px-5 py-3 text-[11px] font-normal text-black tabular-nums">{{ item.purchaseDate }}</td>
 <td class="px-5 py-3">
 <div class="flex items-center gap-2">
 <div class="flex-1 h-1.5 bg-blue-100 rounded-full overflow-hidden w-20">
 <div class="h-full bg-blue-600 rounded-full" :style="{ width: item.validityProgress + '%' }"></div>
 </div>
 <span class="text-[10px] font-black text-blue-950 whitespace-nowrap">{{ item.validity }} Days</span>
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
 Showing <span class="text-blue-950">{{ analyticsData.length > 0 ? '1' : '0' }}</span> to <span class="text-blue-950">{{ analyticsData.length }}</span> of <span class="text-blue-950 text-xs">{{ analyticsData.length }} entries</span>
 </p>
 </div>
 
 <div class="flex items-center gap-2.5">
 <button class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-blue-200 text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm group">
 <feather type="chevron-left" size="14" class="group-hover:-translate-x-0.5 transition-transform"></feather>
 Previous
 </button>
 <button class="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none border-2 border-blue-400/20 group">
 Next
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
 name: 'CourseAnalytics',
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
 // Adding some dummy data for "Premium" feel, otherwise it will show "No data"
 analyticsData: [
 { userId: 1024, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', contact: '9876543210', course: 'Python Learning', price: '7999.00', coupon: 'SAVE20', manualUnlock: false, purchaseDate: '2023-03-27', validity: '365', validityProgress: 85 },
 { userId: 1025, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', contact: '8765432109', course: 'Java Masterclass', price: '5499.00', coupon: null, manualUnlock: true, purchaseDate: '2023-04-12', validity: '180', validityProgress: 45 },
 { userId: 1026, firstName: 'Alex', lastName: 'Johnson', email: 'alex.j@example.com', contact: '7654321098', course: 'Japanese N5', price: '8999.00', coupon: 'FIRST50', manualUnlock: false, purchaseDate: '2023-05-01', validity: '365', validityProgress: 95 }
 ]
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); }
.glass-glow {
 position: absolute;
 top: -50%;
 left: -50%;
 width: 200%;
 height: 200%;
 background: radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.03) 0%, transparent 50%);
 pointer-events: none;
}
/* Custom horizontal scrollbar matching project style */
.overflow-x-auto::-webkit-scrollbar { height: 6px; }
.overflow-x-auto::-webkit-scrollbar-track { background: #f0f9ff; border-radius: 10px; }
.overflow-x-auto::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.overflow-x-auto::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>
