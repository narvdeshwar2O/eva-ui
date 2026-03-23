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
 <span class="text-blue-950">Lessons</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Lessons</h2>
 </div>
 <button 
 @click="$emit('add-lesson')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="plus-circle" size="14"></feather>
 ADD
 </button>
 </div>

 <!-- Filter Card based on Screenshot -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 
 <div class="p-6 space-y-6 relative z-10">
 <!-- Course Filter -->
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Course</label>
 <select class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold cursor-pointer">
 <option value="">Select Course</option>
 <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.title }}</option>
 </select>
 </div>

 <div class="flex items-center justify-between gap-4 pt-2">
 <div class="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest">
 <button class="text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer hover:opacity-80 transition-all font-bold">All</button>
 <span class="text-indigo-300 pb-1 px-1 font-normal">|</span>
 <button class="text-indigo-400 hover:text-rose-500 transition-colors cursor-pointer flex items-center gap-1.5 pb-1 font-bold">
 <feather type="trash-2" size="12"></feather>
 Trash
 </button>
 </div>

 <div class="flex items-center gap-4">
 <div class="flex items-center gap-2 bg-blue-50/80 px-4 py-2 rounded-xl border border-blue-200/60 shadow-inner">
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-tighter">Show</span>
 <select class="bg-transparent text-xs font-black text-blue-950 outline-none cursor-pointer">
 <option>10</option>
 <option>25</option>
 <option>50</option>
 </select>
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-tighter">entries</span>
 </div>
 <div class="relative min-w-[200px]">
 <input type="text" placeholder="Search..." class="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-blue-200 text-sm focus:outline-none focus:border-blue-600 transition-all text-blue-950 font-semibold shadow-sm placeholder:text-indigo-300" />
 <feather type="search" size="14" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>
 </div>
 </div>

 <!-- Table Container -->
 <div class="overflow-x-auto rounded-2xl border border-blue-100 shadow-sm bg-white/50 backdrop-blur-sm mt-6">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/50 border-b border-blue-100">
 <th v-for="head in ['S.N', 'Title', 'Sequence', 'Course', 'Created At', 'Actions']" :key="head" :class="['px-5 py-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]', head === 'Actions' ? 'text-right' : '']">
 {{ head }}
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100/60">
 <tr v-if="lessons.length === 0">
 <td colspan="6" class="px-5 py-20 text-center">
 <div class="flex flex-col items-center gap-3">
 <div class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-200 border-4 border-white shadow-inner">
 <feather type="book-open" size="32"></feather>
 </div>
 <p class="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em]">No lessons found for selected course</p>
 </div>
 </td>
 </tr>
 <tr v-for="(lesson, index) in lessons" :key="lesson.id" class="group hover:bg-blue-50/40 transition-all duration-300">
 <!-- Row data would go here -->
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ListLesson',
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
 courses: [
 { id: 1, title: 'Python Learning' },
 { id: 2, title: 'Java Masterclass' }
 ],
 lessons: []
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); }
.glass-glow {
 position: absolute;
 top: -50%;
 left: -50%;
 width: 200%;
 height: 200%;
 background: radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.03) 0%, transparent 50%);
 pointer-events: none;
}
</style>
