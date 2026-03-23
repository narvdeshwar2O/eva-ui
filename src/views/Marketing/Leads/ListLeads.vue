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
 <span class="text-blue-950 uppercase tracking-tight">Leads</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Leads</h2>
 </div>
 </div>
 </div>

 <!-- MAIN LIST CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 relative z-10 text-left space-y-4">
 
 <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4">
 <div class="flex items-center gap-4">
 <div class="flex items-center gap-2 bg-blue-50/80 px-3 py-1.5 rounded-xl border border-blue-200/60">
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-tighter">Show</span>
 <select v-model="perPage" class="bg-transparent text-[10px] font-black text-blue-950 outline-none cursor-pointer">
 <option :value="10">10</option>
 <option :value="25">25</option>
 <option :value="50">50</option>
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
 <th v-for="head in ['S.N', 'ID', 'Name', 'Email', 'Phone', 'Message', 'Time']" :key="head" class="px-4 py-3 text-[10px] font-black text-blue-700 uppercase tracking-widest border-r border-blue-100 last:border-0 whitespace-nowrap">
 <div class="flex items-center justify-between gap-2">
 {{ head }}
 <div class="flex flex-col opacity-30" v-if="head !== 'Message'">
 <feather type="chevron-up" size="10" class="-mb-1"></feather>
 <feather type="chevron-down" size="10"></feather>
 </div>
 </div>
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100">
 <tr v-for="(lead, index) in filteredLeads" :key="lead.id" class="hover:bg-blue-50/50 transition-colors">
 <td class="px-4 py-3 text-[11px] font-semibold text-blue-600 border-r border-blue-100 tabular-nums">{{ index + 1 }}</td>
 <td class="px-4 py-3 text-[11px] font-bold text-blue-600 border-r border-blue-100">{{ lead.id }}</td>
 <td class="px-4 py-3 text-[11px] font-semibold text-blue-700 border-r border-blue-100">{{ lead.name }}</td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-600 border-r border-blue-100">{{ lead.email }}</td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-600 border-r border-blue-100 tabular-nums">{{ lead.phone }}</td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-500 border-r border-blue-100 max-w-md">
 <div class="line-clamp-2 hover:line-clamp-none transition-all cursor-default">
 {{ lead.message }}
 </div>
 </td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-500 border-r border-blue-100 whitespace-nowrap">{{ lead.time }}</td>
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
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Showing 1 to {{ filteredLeads.length }} of {{ leads.length }} entries</span>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ListLeads',
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
 perPage: 10,
 leads: [
 { id: 35, name: 'Shashank shrivastava', email: 'shashank.chitransh99@gmail.com', phone: '9557641744', message: 'asdf', time: '04 Jun, 2025 | 12:24 PM' },
 { id: 34, name: 'Shashank shrivastava', email: 'shashank.chitransh99@gmail.com', phone: '9557641744', message: 'asdf', time: '04 Jun, 2025 | 12:10 PM' },
 { id: 33, name: 'Shashank shrivastava', email: 'shashank.chitransh99@gmail.com', phone: '9557641744', message: 'hi', time: '04 Jun, 2025 | 12:07 PM' },
 { id: 32, name: 'TRAHed', email: 'trato@93sus.myjino.ru', phone: '82518231417', message: 'Здравствуйте, уважаемые члены сообщества! Хочу сообщить свои впечатления...', time: '31 May, 2025 | 16:54 PM' },
 { id: 31, name: 'Pete Farling', email: 'aj37.revolver901@gmail.com', phone: 'N/A', message: 'Hi I can send a message (just like this one) to 15,000 website contact forms...', time: '31 May, 2025 | 10:13 PM' },
 { id: 30, name: 'Ronalddig', email: 'ronald@kodak.uk', phone: '87837742364', message: 'On our website, we suggest contemporary and the best IT solutions...', time: '31 May, 2025 | 11:09 AM' },
 { id: 29, name: 'Search Engine Index', email: 'submissions@searchindex.site', phone: '893937255', message: 'Hello, for your website do be displayed in searches your domain...', time: '31 May, 2025 | 03:03 AM' },
 { id: 28, name: 'Search Engine Index', email: 'submissions@searchindex.site', phone: '323907230', message: 'Hello, for your website do be displayed in searches your domain...', time: '31 May, 2025 | 02:49 AM' },
 { id: 27, name: 'Jessica Langdon', email: 'jessicalangdon240@gmail.com', phone: '635953079', message: 'Hi there, We run a YouTube growth service...', time: '30 May, 2025 | 19:29 PM' },
 { id: 26, name: 'Jessica Langdon', email: 'jessicalangdon240@gmail.com', phone: '7651110392', message: 'Hi there, We run a YouTube growth service...', time: '30 May, 2025 | 18:50 PM' }
 ]
 }
 },
 computed: {
 filteredLeads() {
 if (!this.searchQuery) return this.leads;
 const q = this.searchQuery.toLowerCase();
 return this.leads.filter(l => 
 l.name.toLowerCase().includes(q) || 
 l.email.toLowerCase().includes(q) ||
 l.phone.toLowerCase().includes(q) ||
 l.message.toLowerCase().includes(q)
 );
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
