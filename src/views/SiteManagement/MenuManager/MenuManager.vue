<template>
 <div class="space-y-6 pb-20">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
 <div class="space-y-1">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Site Management</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">Menu Manager</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Menu Manager</h2>
 </div>
 </div>

 <!-- Top Selection Card -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 relative z-10 text-left border-b border-white/50">
 <div class="flex flex-col md:flex-row md:items-center gap-4">
 <p class="text-[11px] font-black text-blue-500 uppercase tracking-wider">Select the menu you want to edit</p>
 <div class="flex flex-wrap items-center gap-3">
 <select v-model="selectedMenuId" class="h-10 px-4 rounded-xl bg-blue-50/50 border border-blue-200 text-xs font-bold text-blue-600 outline-none focus:border-blue-500 transition-all select-none">
 <option value="">Select menu</option>
 <option value="main">Main Menu</option>
 <option value="footer">Footer Menu</option>
 <option value="sidebar">Sidebar Menu</option>
 </select>
 <button class="px-5 h-10 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 hover:bg-blue-100 transition-all shadow-sm">
 Choose
 </button>
 </div>
 </div>
 </div>
 </div>

 <!-- Main Creation/Edit Area -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="p-8 relative z-10 space-y-8 text-left">
 
 <!-- Name Row -->
 <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-3xl bg-blue-50/40 border border-blue-100/50 shadow-inner">
 <div class="flex-1 flex flex-col md:flex-row md:items-center gap-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em] whitespace-nowrap">Name</label>
 <input 
 v-model="menuName"
 type="text" 
 placeholder="Enter menu name" 
 class="w-full max-w-md h-12 px-6 rounded-2xl bg-white border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm"
 />
 </div>
 <button 
 @click="handleCreate"
 :disabled="!menuName"
 class="flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
 >
 <feather type="plus" size="14"></feather>
 Create Menu
 </button>
 </div>

 <!-- Empty State / Instructions -->
 <div class="space-y-6">
 <div class="flex items-center gap-3 border-b border-blue-100 pb-4">
 <feather type="edit-3" size="18" class="text-blue-600"></feather>
 <h3 class="text-lg font-black text-blue-950 tracking-tight">Menu Creation</h3>
 </div>
 
 <div class="p-12 rounded-3xl border-2 border-dashed border-blue-100 bg-blue-50/20 flex flex-col items-center justify-center text-center space-y-4">
 <div class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
 <feather type="layers" size="24"></feather>
 </div>
 <p class="text-xs font-black text-blue-900 uppercase tracking-[0.2em]">Ready to build?</p>
 <p class="text-sm text-indigo-400 font-medium max-w-xs leading-relaxed">Please enter the name and select <span class="text-blue-600 font-bold">"Create menu"</span> button to begin designing your site navigation structure.</p>
 </div>
 </div>

 <!-- Action Footer -->
 <div class="flex justify-end pt-4 border-t border-blue-50">
 <button 
 @click="handleCreate"
 :disabled="!menuName"
 class="flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
 >
 <feather type="check" size="14"></feather>
 Create Menu
 </button>
 </div>

 </div>
 </div>

 <!-- SUCCESS TOAST -->
 <transition name="fade-slide">
 <div v-if="showSuccess" class="fixed bottom-10 right-10 z-[100]">
 <div class="flex items-center gap-4 bg-emerald-600 text-white px-6 py-3 rounded-3xl shadow-2xl border border-emerald-500/20 backdrop-blur-md">
 <feather type="check-circle" size="22"></feather>
 <div class="text-left font-bold">
 <p class="text-[13px]">Menu structure initialized!</p>
 </div>
 </div>
 </div>
 </transition>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'MenuManager',
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
 selectedMenuId: '',
 menuName: '',
 isCreating: false,
 showSuccess: false
 }
 },
 methods: {
 handleCreate() {
 if (!this.menuName) return;
 this.showSuccess = true;
 setTimeout(() => {
 this.showSuccess = false;
 this.menuName = '';
 }, 3000);
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
.glass-glow {
 position: absolute;
 top: -50%;
 left: -50%;
 width: 200%;
 height: 200%;
 background: radial-gradient(circle at 10% 10%, rgba(37, 99, 235, 0.03) 0%, transparent 50%);
 pointer-events: none;
}
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s ease; }
.fade-slide-enter { opacity: 0; transform: translateY(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(20px); }
</style>
