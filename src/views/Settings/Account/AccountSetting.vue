<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Settings</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">Account Setting</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Edit Account</h2>
 </div>
 </div>
 </div>

 <!-- TABS -->
 <div class="glass-card bg-white/80 backdrop-blur-md border border-blue-200/60 overflow-hidden">
 <div class="flex bg-blue-50/50 border-b border-blue-200/60">
 <button 
 v-for="tab in ['Profile', 'Update Information', 'Change Password']" 
 :key="tab"
 @click="activeTab = tab"
 :class="[ 'px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all', activeTab === tab ? 'bg-white text-blue-600 border-b-2 border-blue-600 -mb-[1px]' : 'text-blue-500 hover:text-blue-950' ]"
 >
 {{ tab }}
 </button>
 </div>

 <div class="p-8 text-left">
 <!-- PROFILE TAB -->
 <div v-if="activeTab === 'Profile'" class="relative overflow-hidden rounded-2xl border border-blue-100 divide-y divide-blue-100 bg-white">
 <div class="grid grid-cols-[200px_1fr] group">
 <div class="bg-blue-50/50 px-6 py-3 text-[11px] font-black text-blue-900 uppercase tracking-widest border-r border-blue-100">Avatar</div>
 <div class="px-6 py-3 flex items-center">
 <div class="w-20 h-20 rounded-xl bg-blue-50 border border-blue-200 overflow-hidden flex items-center justify-center">
 <feather type="user" size="32" class="text-indigo-300"></feather>
 </div>
 </div>
 </div>
 <div class="grid grid-cols-[200px_1fr] group">
 <div class="bg-blue-50/50 px-6 py-3 text-[11px] font-black text-blue-900 uppercase tracking-widest border-r border-blue-100">Name</div>
 <div class="px-6 py-3 text-sm font-semibold text-blue-600">{{ account.name }}</div>
 </div>
 <div class="grid grid-cols-[200px_1fr] group">
 <div class="bg-blue-50/50 px-6 py-3 text-[11px] font-black text-blue-900 uppercase tracking-widest border-r border-blue-100">E-mail</div>
 <div class="px-6 py-3 text-sm font-semibold text-blue-600 underline">{{ account.email }}</div>
 </div>
 <div class="grid grid-cols-[200px_1fr] group">
 <div class="bg-blue-50/50 px-6 py-3 text-[11px] font-black text-blue-900 uppercase tracking-widest border-r border-blue-100">Created At</div>
 <div class="px-6 py-3 text-sm font-semibold text-blue-600">Mon Dec 30 12:50:51 IST 2024 (2024-12-30 12:50:51)</div>
 </div>
 <div class="grid grid-cols-[200px_1fr] group">
 <div class="bg-blue-50/50 px-6 py-3 text-[11px] font-black text-blue-900 uppercase tracking-widest border-r border-blue-100">Last Updated</div>
 <div class="px-6 py-3 text-sm font-semibold text-blue-600">Fri Mar 13 10:09:48 IST 2026 (2026-03-13 10:09:48)</div>
 </div>
 </div>

 <!-- UPDATE INFORMATION TAB -->
 <div v-if="activeTab === 'Update Information'" class="space-y-6">
 <div class="flex flex-col gap-6 mb-4">
 <div class="flex items-center gap-8">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest w-[120px]">Avatar Location</label>
 <div class="flex items-center gap-4">
 <label class="flex items-center gap-2 cursor-pointer group">
 <input type="radio" value="gravatar" v-model="account.avatarLoc" class="w-4 h-4 text-blue-600 border-indigo-300 focus:ring-blue-500" />
 <span class="text-[11px] font-bold text-blue-600 group-hover:text-blue-950 transition-colors">Gravatar</span>
 </label>
 <label class="flex items-center gap-2 cursor-pointer group">
 <input type="radio" value="upload" v-model="account.avatarLoc" class="w-4 h-4 text-blue-600 border-indigo-300 focus:ring-blue-500" />
 <span class="text-[11px] font-bold text-blue-600 group-hover:text-blue-950 transition-colors">Upload</span>
 </label>
 </div>
 </div>

 <!-- Conditional File Upload Input -->
 <transition name="fade">
 <div v-if="account.avatarLoc === 'upload'" class="flex items-center gap-8 animate-in fade-in slide-in-from-top-2 duration-300">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest w-[120px]">Choose Avatar</label>
 <div class="flex-1">
 <input type="file" accept="image/*" class="w-full text-xs text-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer" />
 <p class="text-[9px] text-indigo-400 font-bold uppercase mt-2 tracking-tighter">Recommended: Square image, max 2MB (.jpg, .png)</p>
 </div>
 </div>
 </transition>
 </div>

 <div class="space-y-6">
 <div>
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">First Name</label>
 <input type="text" v-model="account.firstName" class="w-full h-11 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all" />
 </div>
 <div>
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Last Name</label>
 <input type="text" v-model="account.lastName" class="w-full h-11 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all" />
 </div>
 <div>
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Mobile No.</label>
 <input type="text" v-model="account.mobile" class="w-full h-11 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all" />
 </div>
 </div>

 <div class="flex justify-end pt-4">
 <button @click="handleUpdate" class="px-6 py-2.5 rounded-xl bg-rose-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all">Update</button>
 </div>
 </div>

 <!-- CHANGE PASSWORD TAB -->
 <div v-if="activeTab === 'Change Password'" class="space-y-6">
 <div>
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Old Password</label>
 <input type="password" placeholder="Old Password" class="w-full h-11 px-5 rounded-xl bg-white border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all placeholder:text-indigo-300" />
 </div>
 <div>
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">New Password</label>
 <input type="password" placeholder="New Password" class="w-full h-11 px-5 rounded-xl bg-white border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all placeholder:text-indigo-300" />
 </div>
 <div>
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Password Confirmation</label>
 <input type="password" placeholder="Password Confirmation" class="w-full h-11 px-5 rounded-xl bg-white border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all placeholder:text-indigo-300" />
 </div>

 <div class="flex justify-end pt-4">
 <button @click="alert('Password updated')" class="px-6 py-2.5 rounded-xl bg-rose-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all">Update Password</button>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'AccountSetting',
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
 activeTab: 'Profile',
 account: {
 name: 'Admin Istrator',
 email: 'admin@lms.com',
 firstName: 'Admin',
 lastName: 'Istrator',
 mobile: '9012050035',
 avatarLoc: 'gravatar'
 }
 }
 },
 methods: {
 handleUpdate() {
 alert('Account information updated successfully!');
 }
 }
}
</script>

<style scoped>
.glass-card { border-radius: 2rem; }
</style>
