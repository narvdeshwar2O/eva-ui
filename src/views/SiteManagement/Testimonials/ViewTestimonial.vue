<template>
 <div class="space-y-6 pb-20">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Site Management</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Testimonials</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">View Testimonial</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Testimonial Details</h2>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('edit', testimonial)"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="edit-3" size="14"></feather>
 Edit Testimonial
 </button>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-100 text-blue-600 text-[11px] font-black uppercase tracking-widest hover:bg-blue-200 transition-all outline-none"
 >
 <feather type="chevron-left" size="14"></feather>
 Back
 </button>
 </div>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
 <!-- Main Content Card -->
 <div class="lg:col-span-2 space-y-8">
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md p-8">
 <div class="flex items-start gap-6">
 <div class="w-24 h-24 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
 <feather type="user" size="40"></feather>
 </div>
 <div class="space-y-3">
 <h1 class="text-3xl font-black text-blue-950 tracking-tight">{{ testimonial.name }}</h1>
 <div class="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100/50">
 {{ testimonial.occupation }}
 </div>
 </div>
 </div>
 
 <div class="mt-8 pt-8 border-t border-blue-100">
 <div class="relative">
 <feather type="quote" size="40" class="absolute -top-4 -left-2 text-blue-100 z-0"></feather>
 <p class="text-lg text-blue-600 font-medium leading-relaxed relative z-10 pl-8">
 "{{ testimonial.content }}"
 </p>
 </div>
 </div>
 </div>
 </div>

 <!-- Info Sidebar -->
 <div class="space-y-6">
 <!-- Status Card -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md p-6">
 <h3 class="text-[11px] font-black text-blue-900 uppercase tracking-widest mb-4">Publication Status</h3>
 <div class="flex items-center justify-between p-4 rounded-2xl border border-blue-100" :class="testimonial.status ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'">
 <span class="text-[11px] font-black uppercase tracking-widest">Currently Active</span>
 <div class="w-2.5 h-2.5 rounded-full animate-pulse" :class="testimonial.status ? 'bg-emerald-600' : 'bg-indigo-300'"></div>
 </div>
 </div>

 <!-- Metadata -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md p-6">
 <h3 class="text-[11px] font-black text-blue-900 uppercase tracking-widest mb-4">Metadata</h3>
 <div class="space-y-4">
 <div class="flex items-center justify-between text-[11px]">
 <span class="font-bold text-indigo-400 uppercase tracking-tighter">ID:</span>
 <span class="font-black text-blue-950">#{{ testimonial.id }}</span>
 </div>
 <div class="flex items-center justify-between text-[11px]">
 <span class="font-bold text-indigo-400 uppercase tracking-tighter">Created:</span>
 <span class="font-black text-blue-950">Oct 12, 2023</span>
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
 name: 'ViewTestimonial',
 props: {
 testimonial: {
 type: Object,
 required: true
 }
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
