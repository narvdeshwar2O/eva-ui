<template>
 <div class="space-y-6 pb-20">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
 <div class="space-y-1">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Access</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">User Management</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">View User</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">View User</h2>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('edit', user)"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="edit-3" size="14"></feather>
 Edit User
 </button>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest border border-blue-100 shadow-sm hover:bg-blue-100 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="users" size="14"></feather>
 Back to Users
 </button>
 </div>
 </div>

 <!-- MAIN FORM CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-8 relative z-10 text-left">
 <div class="space-y-8">
 
 <div class="flex items-center gap-6 pb-6 border-b border-blue-100">
 <div class="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-black text-blue-600 uppercase shadow-inner border-[6px] border-white">
 {{ user?.name ? user.name.charAt(0) : 'U' }}
 </div>
 <div>
 <h3 class="text-2xl font-black text-blue-950 tracking-tight">{{ user?.name || 'Unknown User' }}</h3>
 <p class="text-[11px] font-bold text-blue-500 uppercase tracking-widest mt-1">{{ user?.email || 'N/A' }}</p>
 <div class="flex items-center gap-2 mt-2">
 <span class="px-2 py-0.5 rounded bg-blue-50 text-[9px] font-black text-blue-600 uppercase tracking-widest border border-blue-100 shadow-sm">{{ user?.role || 'N/A' }}</span>
 <span v-if="user?.confirmed" class="px-2 py-0.5 rounded bg-emerald-50 text-[9px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100 shadow-sm flex items-center gap-1"><feather type="check" size="10"></feather> Confirmed</span>
 <span v-else class="px-2 py-0.5 rounded bg-rose-50 text-[9px] font-black text-rose-600 uppercase tracking-widest border border-rose-100 shadow-sm">Unconfirmed</span>
 </div>
 </div>
 </div>

 <!-- Basic Info Grid -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Full Name</label>
 <div class="w-full h-12 px-5 flex items-center rounded-2xl bg-blue-50 border border-blue-100 text-sm font-semibold text-blue-950 shadow-sm">{{ user?.name || '—' }}</div>
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">E-mail Address</label>
 <div class="w-full h-12 px-5 flex items-center rounded-2xl bg-blue-50 border border-blue-100 text-sm font-semibold text-blue-950 shadow-sm">{{ user?.email || '—' }}</div>
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Phone</label>
 <div class="w-full h-12 px-5 flex items-center rounded-2xl bg-blue-50 border border-blue-100 text-sm font-semibold text-blue-950 shadow-sm">{{ user?.mobile || '—' }}</div>
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">City</label>
 <div class="w-full h-12 px-5 flex items-center rounded-2xl bg-blue-50 border border-blue-100 text-sm font-semibold text-blue-950 shadow-sm">{{ user?.city || '—' }}</div>
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Course Category</label>
 <div class="w-full h-12 px-5 flex items-center rounded-2xl bg-blue-50 border border-blue-100 text-sm font-semibold text-blue-950 shadow-sm">{{ user?.category || '—' }}</div>
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Created On</label>
 <div class="w-full h-12 px-5 flex items-center rounded-2xl bg-blue-50 border border-blue-100 text-sm font-semibold text-blue-950 shadow-sm tabular-nums">{{ user?.createdOn || '—' }}</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ViewUser',
 props: {
 user: { type: Object, required: true }
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
