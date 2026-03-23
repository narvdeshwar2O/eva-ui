<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">Notice Board</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Notice Board</h2>
 </div>
 </div>
 <button @click="$emit('navigate', 'create_notice')" class="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all group">
 <feather type="plus-circle" size="18" class="group-hover:rotate-90 transition-transform duration-300"></feather>
 <span class="text-[11px] font-black uppercase tracking-[0.1em]">ADD Notice</span>
 </button>
 </div>

 <!-- NOTICE BOARD TABLE -->
 <div class="glass-card bg-white/80 backdrop-blur-md border border-blue-200/60 overflow-hidden">
 <div class="overflow-x-auto">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/80 border-b border-blue-100 text-[10px] font-black text-blue-500 uppercase tracking-widest whitespace-nowrap">
 <th class="px-6 py-3 border-r border-blue-100/50">S.N</th>
 <th class="px-6 py-3 border-r border-blue-100/50">ID</th>
 <th class="px-6 py-3 border-r border-blue-100/50">Title</th>
 <th class="px-6 py-3 border-r border-blue-100/50">Message</th>
 <th class="px-6 py-3 border-r border-blue-100/50">Status</th>
 <th class="px-6 py-3 text-center">Actions</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100">
 <tr v-for="(notice, idx) in notices" :key="notice.id" class="group hover:bg-blue-50/50 transition-colors">
 <td class="px-6 py-3 tabular-nums text-[11px] font-bold text-indigo-400">{{ idx + 1 }}</td>
 <td class="px-6 py-3 text-[11px] font-bold text-blue-950">#{{ notice.id }}</td>
 <td class="px-6 py-3">
 <div class="text-[11px] font-bold text-blue-950 tracking-tight">{{ notice.title }}</div>
 </td>
 <td class="px-6 py-3">
 <p class="text-[11px] font-semibold text-blue-500 max-w-[300px] truncate group-hover:text-blue-950 transition-colors" v-html="notice.message"></p>
 </td>
 <td class="px-6 py-3">
 <span :class="[ 'px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest', notice.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600' ]">
 {{ notice.status }}
 </span>
 </td>
 <td class="px-6 py-3">
 <div class="flex items-center justify-center gap-2">
 <button @click="$emit('view-notice', notice)" class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm" title="View">
 <feather type="eye" size="14"></feather>
 </button>
 <button @click="$emit('edit-notice', notice)" class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all shadow-sm" title="Edit">
 <feather type="edit-3" size="14"></feather>
 </button>
 <button @click="handleDelete(notice.id)" class="w-8 h-8 rounded-xl bg-blue-50 text-rose-500 border border-blue-200 flex items-center justify-center hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all shadow-sm" title="Delete">
 <feather type="trash-2" size="14"></feather>
 </button>
 </div>
 </td>
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
 name: 'ListNotice',
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
 notices: [
 { id: 101, title: 'New Course Launch', message: 'We are launching a new Premium Full Pack V2...', status: 'Active' },
 { id: 102, title: 'Weekend Maintenance', message: 'System will be down for 2 hours on Sunday...', status: 'Active' },
 { id: 103, title: 'Holiday Announcement', message: 'Institute will remain closed on Holi festival...', status: 'Inactive' }
 ]
 }
 },
 methods: {
 handleDelete(id) {
 if(confirm('Are you sure you want to delete this notice?')) {
 alert('Notice deleted successfully');
 }
 }
 }
}
</script>

<style scoped>
.glass-card { border-radius: 2rem; }
</style>
