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
 <span class="text-blue-950">Create Academic Year</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Create Academic Year</h2>
 </div>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="calendar" size="14"></feather>
 View Academic Year
 </button>
 </div>

 <!-- Form Card -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 
 <div class="p-8 relative z-10">
 <div class="max-w-xl space-y-8">
 <!-- Name -->
 <div class="space-y-2 group">
 <label class="text-[11px] font-black text-blue-600 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
 Name <span class="text-rose-500">*</span>
 </label>
 <input type="text" placeholder="e.g. 2024-2025" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner text-black placeholder:text-indigo-300" />
 </div>

 <!-- Bottom Actions -->
 <div class="flex items-center gap-4 pt-6">
 <button class="px-6 py-3 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2">
 <feather type="save" size="14"></feather>
 Save
 </button>
 <button @click="$emit('back')" class="px-6 py-3 rounded-2xl bg-white border-2 border-blue-100 text-indigo-400 text-[11px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95">
 Cancel
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
 name: 'CreateAcademicYear',
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
.glass-card { box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05); }
</style>
