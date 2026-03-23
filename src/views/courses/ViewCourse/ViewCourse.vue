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
 <span class="text-blue-950">Course Details</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Courses</h2>
 </div>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="list" size="14"></feather>
 Back to List
 </button>
 </div>

 <!-- Details Table Card -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 
 <div class="p-0 relative z-10 overflow-hidden">
 <table class="w-full border-collapse">
 <tbody class="divide-y divide-blue-100">
 <tr v-for="field in details" :key="field.label" class="group hover:bg-blue-50/30 transition-all duration-300">
 <td class="w-1/3 px-6 py-3 text-[11px] font-black text-blue-900 uppercase tracking-widest bg-blue-50/50 group-hover:bg-blue-50/50 transition-colors border-r border-blue-100">
 {{ field.label }}
 </td>
 <td class="px-6 py-3 text-sm font-normal text-black">
 <template v-if="field.type === 'checkbox'">
 <div class="w-5 h-5 bg-white border-2 border-blue-200 rounded-md flex items-center justify-center transition-all group-hover:border-blue-400">
 <feather v-if="field.value" type="check" size="12" class="text-blue-600 stroke-[3]"></feather>
 </div>
 </template>
 <template v-else>
 <span :class="field.label === 'Title' ? 'text-blue-600 font-bold ' : ''">
 {{ field.value || '-' }}
 </span>
 <span v-if="field.label === 'Selling Price' && field.value" class="ml-1 text-indigo-400 font-bold">₹</span>
 </template>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <!-- Timeline Section -->
 <div class="space-y-6 pt-4 pb-12">
 <div class="bg-blue-50/30 p-4 rounded-2xl border border-blue-100/50">
 <h3 class="text-lg font-black text-blue-950 tracking-tight flex items-center gap-2">
 <div class="w-2 h-6 bg-blue-600 rounded-full"></div>
 Course timeline
 </h3>
 <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1 ml-4">
 Only Published Lessons and Tests will be Displayed and Sorted. Drag and change sequence of Lessons/Tests for course
 </p>
 </div>

 <div class="space-y-3">
 <div v-for="item in timelineItems" :key="item.id" class="flex items-center bg-white rounded-2xl border border-blue-200 p-2 group hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-move transform hover:-translate-x-1">
 <div class="px-6 py-3 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 group-hover:bg-blue-700">
 {{ item.type }}
 </div>
 <div class="px-6 text-[12px] font-normal text-black">
 {{ item.title }}
 </div>
 <div class="ml-auto pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
 <feather type="menu" size="16" class="text-indigo-300"></feather>
 </div>
 </div>
 </div>

 <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
 <button @click="$emit('back')" class="w-fit mx-auto sm:mx-0 px-6 py-3 rounded-2xl border-2 border-blue-100 bg-white text-blue-600 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-50 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2">
 <feather type="chevron-left" size="16"></feather>
 Back to list
 </button>
 <button class="w-fit mx-auto sm:mx-0 px-6 py-3 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2">
 <feather type="save" size="16"></feather>
 Save timeline
 </button>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ViewCourse',
 props: {
 course: {
 type: Object,
 default: () => ({})
 }
 },
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
 computed: {
 details() {
 return [
 { label: 'Teachers', value: this.course.teacher || 'Dummy Teacher' },
 { label: 'Title', value: this.course.title || 'Python Learning' },
 { label: 'SEO Friendly URL', value: (this.course.title ? this.course.title.toLowerCase().replace(/ /g, '-') : 'python-learning') },
 { label: 'Category', value: this.course.category || 'Tech e-books (library)' },
 { label: 'Description', value: '' },
 { label: 'Selling Price', value: '7999.00' },
 { label: 'Course Image', value: '' },
 { label: 'Media Video', value: 'No Videos' },
 { label: 'Start Date', value: '2025-05-27' },
 { label: 'Expire / Disable Course Date', value: '2026-12-16' },
 { label: 'Published', type: 'checkbox', value: true },
 { label: 'Meta Title', value: '' },
 { label: 'Meta Description', value: '' },
 { label: 'Meta Keywords', value: '' },
 ];
 }
 },
 data() {
 return {
 timelineItems: [
 { id: 1, type: 'Lesson', title: 'Python Youtube Video' }
 ]
 }
 }
}
</script>

<style scoped>
/* Glassmorphism effects */
.glass-card {
 box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
}

/* Custom transitions */
.divide-y tr {
 animation: slideIn 0.3s ease-out forwards;
 opacity: 0;
}
.divide-y tr:nth-child(n) { animation-delay: calc(var(--i) * 0.05s); }

@keyframes slideIn {
 from { opacity: 0; transform: translateX(-10px); }
 to { opacity: 1; transform: translateX(0); }
}
</style>
