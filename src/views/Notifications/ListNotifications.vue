<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">Notifications</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Notifications</h2>
 </div>
 </div>
 <button @click="$emit('navigate', 'create_notification')" class="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all group">
 <feather type="plus" size="18" class="group-hover:rotate-90 transition-transform duration-300"></feather>
 <span class="text-[11px] font-black uppercase tracking-[0.1em]">Create Notification</span>
 </button>
 </div>

 <!-- NOTIFICATIONS TABLE -->
 <div class="glass-card bg-white/80 backdrop-blur-md border border-blue-200/60 overflow-hidden">
 <div class="overflow-x-auto">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/80 border-b border-blue-100 text-[10px] font-black text-blue-500 uppercase tracking-widest whitespace-nowrap">
 <th class="px-6 py-3 border-r border-blue-100/50">Title</th>
 <th class="px-6 py-3 border-r border-blue-100/50">Course Name</th>
 <th class="px-6 py-3 border-r border-blue-100/50">Message</th>
 <th class="px-6 py-3 border-r border-blue-100/50">Schedule</th>
 <th class="px-6 py-3 border-r border-blue-100/50 text-center">Created At</th>
 <th class="px-6 py-3 text-center">Actions</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100">
 <tr v-for="note in notifications" :key="note.id" class="group hover:bg-blue-50/50 transition-colors">
 <td class="px-6 py-3">
 <div class="text-[11px] font-bold text-blue-950 tracking-tight">{{ note.title }}</div>
 </td>
 <td class="px-6 py-3">
 <span v-if="note.course" class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[9px] font-black uppercase">{{ note.course }}</span>
 <span v-else class="text-[10px] font-bold text-indigo-400">N/A</span>
 </td>
 <td class="px-6 py-3">
 <p class="text-[11px] font-semibold text-blue-500 max-w-[200px] truncate group-hover:text-blue-950 transition-colors">{{ note.message }}</p>
 </td>
 <td class="px-6 py-3">
 <div v-if="note.schedule" class="flex items-center gap-2 text-blue-600">
 <feather type="calendar" size="12"></feather>
 <span class="text-[10px] font-black uppercase">{{ note.schedule }}</span>
 </div>
 <span v-else class="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">Instant</span>
 </td>
 <td class="px-6 py-3 text-center">
 <div class="text-[10px] font-bold text-blue-600 whitespace-nowrap">{{ note.created }}</div>
 </td>
 <td class="px-6 py-3">
 <div class="flex flex-col items-center gap-1.5 min-w-[120px]">
 <span class="text-[9px] font-black text-amber-500 uppercase tracking-tighter">
 <feather type="edit-3" size="10" class="mr-1"></feather>
 Time Exceeded
 </span>
 <button class="w-8 h-8 rounded-xl bg-blue-50 text-indigo-400 border border-blue-200 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all">
 <feather type="x" size="14"></feather>
 </button>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <!-- Pagination -->
 <div class="p-6 border-t border-blue-100 flex items-center justify-between">
 <p class="text-[10px] font-bold text-indigo-400 uppercase">Showing 1 to {{ notifications.length }} of 42 entries</p>
 <div class="flex items-center gap-1">
 <button class="w-8 h-8 rounded-lg flex items-center justify-center border border-blue-200 text-indigo-400 hover:bg-blue-50 transition-all"><feather type="chevron-left" size="14"></feather></button>
 <button class="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600 text-white text-[10px] font-black">1</button>
 <button class="w-8 h-8 rounded-lg flex items-center justify-center border border-blue-200 text-blue-600 text-[10px] font-black hover:bg-blue-50">2</button>
 <button class="w-8 h-8 rounded-lg flex items-center justify-center border border-blue-200 text-indigo-400 hover:bg-blue-50 transition-all"><feather type="chevron-right" size="14"></feather></button>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ListNotifications',
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
 notifications: [
 { id: 1, title: 'Exam Update', course: 'English Language', message: 'The mid-term exam schedule has been updated...', schedule: '2025-04-03 12:00', created: '04/03/2025 10:00:21' },
 { id: 2, title: 'Holiday Notice', course: '', message: 'The institute will remain closed on Sunday...', schedule: '', created: '03/03/2025 15:45:12' },
 { id: 3, title: 'New Materials', course: 'Mathematics', message: 'New lecture notes have been uploaded for...', schedule: '2025-04-02 09:00', created: '01/03/2025 11:20:00' },
 { id: 4, title: 'Fee Reminder', course: '', message: 'This is a gentle reminder regarding the...', schedule: '', created: '28/02/2025 09:30:15' }
 ]
 }
 }
}
</script>

<style scoped>
.glass-card { border-radius: 2rem; }
th { border-bottom: 2px solid rgba(255,255,255,0.05); }
</style>
