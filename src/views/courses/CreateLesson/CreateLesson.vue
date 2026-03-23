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
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors">Lessons</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950">Create Lesson</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Create Lesson</h2>
 </div>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="list" size="14"></feather>
 View Lessons
 </button>
 </div>

 <!-- Creation Form -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 
 <div class="p-6 space-y-8 relative z-10">
 <!-- Basic Info -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Select Course <span class="text-rose-500">*</span>
 </label>
 <select v-model="formData.course" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold cursor-pointer">
 <option value="">Choose a Course</option>
 <option value="1">Python Learning</option>
 <option value="2">Java Masterclass</option>
 </select>
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Lesson Title <span class="text-rose-500">*</span>
 </label>
 <input type="text" v-model="formData.title" placeholder="e.g. Introduction to Variables" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 </div>

 <!-- Details -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Sequence / Order</label>
 <input type="number" v-model="formData.sequence" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Lesson Type <span class="text-rose-500">*</span>
 </label>
 <select v-model="formData.type" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold cursor-pointer">
 <option value="video">Video Lecture</option>
 <option value="pdf">PDF Document</option>
 <option value="quiz">Interactive Quiz</option>
 </select>
 </div>
 </div>

 <!-- Description -->
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Lesson Summary / Description</label>
 <textarea v-model="formData.description" rows="4" class="w-full px-5 py-3 rounded-xl border border-blue-200 text-sm focus:outline-none focus:border-blue-600 text-blue-950 font-semibold bg-blue-50/50" placeholder="Brief overview of what this lesson covers..."></textarea>
 </div>

 <!-- Content Area -->
 <div v-if="formData.type === 'video'" class="space-y-4 p-6 rounded-2xl bg-blue-50/30 border border-blue-100/50">
 <div class="flex items-center gap-2 mb-2">
 <div class="p-1.5 bg-blue-600 text-white rounded-lg">
 <feather type="video" size="14"></feather>
 </div>
 <h4 class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Video Content Settings</h4>
 </div>
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div class="space-y-1.5">
 <label class="text-[10px] font-black text-blue-500 uppercase tracking-tighter">Video Provider</label>
 <select class="w-full h-10 px-4 rounded-lg bg-white border border-blue-200 text-xs font-semibold focus:outline-none focus:border-blue-600">
 <option>YouTube</option>
 <option>Vimeo</option>
 <option>AWS S3</option>
 <option>Manual Upload</option>
 </select>
 </div>
 <div class="space-y-1.5">
 <label class="text-[10px] font-black text-blue-500 uppercase tracking-tighter">Video ID / URL</label>
 <input type="text" placeholder="Paste link here..." class="w-full h-10 px-4 rounded-lg bg-white border border-blue-200 text-xs font-semibold focus:outline-none focus:border-blue-600" />
 </div>
 </div>
 </div>

 <!-- Options -->
 <div class="flex flex-wrap gap-x-6 gap-y-4 py-6 border-y border-blue-100">
 <label class="flex items-center gap-2 cursor-pointer group">
 <div class="relative w-4 h-4">
 <input type="checkbox" v-model="formData.isPublished" class="peer absolute inset-0 opacity-0 cursor-pointer z-10" />
 <div class="absolute inset-0 bg-white border-2 border-blue-200 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
 <feather type="check" size="10" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-all"></feather>
 </div>
 <span class="text-[11px] font-black text-blue-600 uppercase tracking-tighter group-hover:text-blue-600 transition-all">Publish Lesson</span>
 </label>
 <label class="flex items-center gap-2 cursor-pointer group">
 <div class="relative w-4 h-4">
 <input type="checkbox" v-model="formData.isFree" class="peer absolute inset-0 opacity-0 cursor-pointer z-10" />
 <div class="absolute inset-0 bg-white border-2 border-blue-200 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
 <feather type="check" size="10" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-all"></feather>
 </div>
 <span class="text-[11px] font-black text-blue-600 uppercase tracking-tighter group-hover:text-blue-600 transition-all">Free Preview</span>
 </label>
 </div>

 <div class="flex items-center pt-4">
 <button 
 @click="$emit('back')"
 class="px-6 py-3.5 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 Create Lesson
 </button>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'CreateLesson',
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
 formData: {
 course: '',
 title: '',
 sequence: 1,
 type: 'video',
 description: '',
 isPublished: true,
 isFree: false
 }
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
