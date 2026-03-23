<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="hover:text-blue-600 cursor-pointer transition-colors" @click="$emit('back')">Teachers</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950">Create Teacher</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Create Teacher</h2>
 </div>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="users" size="14"></feather>
 View Teachers
 </button>
 </div>

 <!-- Form Card -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 
 <div class="p-8 relative z-10 space-y-8">
 <!-- Form Rows -->
 <div class="grid grid-cols-1 gap-6">
 <!-- First Name -->
 <div class="flex flex-col md:flex-row md:items-center gap-4 group">
 <label class="w-full md:w-1/4 text-[11px] font-black text-blue-600 uppercase tracking-widest group-hover:text-blue-600 transition-colors">First Name</label>
 <div class="flex-1 relative">
 <input type="text" placeholder="Enter first name" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner placeholder:text-indigo-300 text-black" />
 </div>
 </div>

 <!-- Last Name -->
 <div class="flex flex-col md:flex-row md:items-center gap-4 group">
 <label class="w-full md:w-1/4 text-[11px] font-black text-blue-600 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Last Name</label>
 <div class="flex-1 relative">
 <input type="text" placeholder="Enter last name" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner placeholder:text-indigo-300 text-black" />
 </div>
 </div>

 <!-- Email Address -->
 <div class="flex flex-col md:flex-row md:items-center gap-4 group">
 <label class="w-full md:w-1/4 text-[11px] font-black text-blue-600 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Email Address</label>
 <div class="flex-1 relative">
 <input type="email" placeholder="Enter email address" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner placeholder:text-indigo-300 text-black" />
 </div>
 </div>

 <!-- Password -->
 <div class="flex flex-col md:flex-row md:items-center gap-4 group">
 <label class="w-full md:w-1/4 text-[11px] font-black text-blue-600 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Password</label>
 <div class="flex-1 relative">
 <input type="password" placeholder="Create password" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner placeholder:text-indigo-300 text-black" />
 <button class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-blue-600 transition-colors">
 <feather type="eye" size="14"></feather>
 </button>
 </div>
 </div>

 <!-- Image -->
 <div class="flex flex-col md:flex-row md:items-center gap-4 group">
 <label class="w-full md:w-1/4 text-[11px] font-black text-blue-600 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Image</label>
 <div class="flex-1">
 <div class="flex items-center gap-4 p-1.5 rounded-xl bg-blue-50 border border-blue-200 shadow-inner group-hover:border-blue-200 transition-colors">
 <button class="px-6 py-2.5 rounded-lg bg-white border border-blue-200 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">Choose File</button>
 <span class="text-xs font-semibold text-indigo-400">No file chosen</span>
 </div>
 </div>
 </div>

 <!-- Gender -->
 <div class="flex flex-col md:flex-row md:items-center gap-4 group">
 <label class="w-full md:w-1/4 text-[11px] font-black text-blue-600 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Gender</label>
 <div class="flex-1 flex items-center gap-8">
 <label class="flex items-center gap-2 cursor-pointer group/opt">
 <input type="radio" name="gender" value="male" class="hidden peer" />
 <div class="w-5 h-5 rounded-full border-2 border-blue-200 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center transition-all group-hover/opt:border-blue-400">
 <div class="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-all"></div>
 </div>
 <span class="text-sm font-semibold text-blue-600 peer-checked:text-black">Male</span>
 </label>
 <label class="flex items-center gap-2 cursor-pointer group/opt">
 <input type="radio" name="gender" value="female" class="hidden peer" />
 <div class="w-5 h-5 rounded-full border-2 border-blue-200 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center transition-all group-hover/opt:border-blue-400">
 <div class="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-all"></div>
 </div>
 <span class="text-sm font-semibold text-blue-600 peer-checked:text-black">Female</span>
 </label>
 <label class="flex items-center gap-2 cursor-pointer group/opt">
 <input type="radio" name="gender" value="other" class="hidden peer" />
 <div class="w-5 h-5 rounded-full border-2 border-blue-200 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center transition-all group-hover/opt:border-blue-400">
 <div class="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-all"></div>
 </div>
 <span class="text-sm font-semibold text-blue-600 peer-checked:text-black">Other</span>
 </label>
 </div>
 </div>

 <!-- Phone Number -->
 <div class="flex flex-col md:flex-row md:items-center gap-4 group">
 <label class="w-full md:w-1/4 text-[11px] font-black text-blue-600 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Phone Number</label>
 <div class="flex-1 relative">
 <input type="tel" placeholder="Enter phone number" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner placeholder:text-indigo-300 text-black" />
 </div>
 </div>

 <!-- Status -->
 <div class="flex flex-col md:flex-row md:items-center gap-4 group">
 <label class="w-full md:w-1/4 text-[11px] font-black text-blue-600 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Status</label>
 <div class="flex-1">
 <label class="relative inline-flex items-center cursor-pointer group/toggle">
 <input type="checkbox" v-model="status" class="sr-only peer" />
 <div class="w-14 h-7 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-blue-600 shadow-inner group-hover/toggle:opacity-90"></div>
 <span class="ml-3 text-xs font-bold uppercase tracking-widest text-blue-500 peer-checked:text-blue-600 transition-colors">{{ status ? 'Active' : 'Inactive' }}</span>
 </label>
 </div>
 </div>
 </div>

 <!-- Bottom Actions -->
 <div class="flex items-center justify-end gap-4 pt-6 mt-8 border-t border-blue-100/50">
 <button @click="$emit('back')" class="px-6 py-3.5 rounded-2xl bg-white border-2 border-blue-100 text-blue-600 text-[11px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 shadow-sm">
 Cancel
 </button>
 <button class="px-6 py-3.5 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all active:scale-95">
 Create
 </button>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'CreateTeacher',
 components: {
 feather: {
 props: ['type', 'size'],
 mounted() {
 feather.replace();
 },
 updated() {
 feather.replace();
 },
 render(h) {
 return h('i', {
 attrs: {
 'data-feather': this.type,
 'width': this.size || 24,
 'height': this.size || 24,
 },
 class: 'inline-block align-middle'
 });
 }
 }
 },
 data() {
 return {
 status: true
 }
 }
}
</script>

<style scoped>
.glass-card {
 box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
}

/* Float Animation for form appearance */
.p-8 > div {
 animation: slideUp 0.5s ease-out forwards;
 opacity: 0;
}
.p-8 > div:nth-child(1) { animation-delay: 0.1s; }
.p-8 > div:nth-child(2) { animation-delay: 0.2s; }

@keyframes slideUp {
 from { opacity: 0; transform: translateY(20px); }
 to { opacity: 1; transform: translateY(0); }
}
</style>
