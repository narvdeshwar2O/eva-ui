<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950">Add Course</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Create Course</h2>
 </div>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="list" size="14"></feather>
 View Courses
 </button>
 </div>

 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 
 <div class="p-6 space-y-8 relative z-10">
 <!-- Part 1: Selectors with "Add" Buttons -->
 <!-- Teachers -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
 <div class="lg:col-span-9 space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Teachers <span class="text-rose-500">*</span>
 </label>
 <div class="relative">
 <select class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold appearance-none cursor-pointer">
 <option value="">Select Teachers</option>
 </select>
 <feather type="chevron-down" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"></feather>
 </div>
 </div>
 <div class="lg:col-span-1 hidden lg:flex h-11 items-center justify-center">
 <span class="text-[10px] font-black text-indigo-400 uppercase">OR</span>
 </div>
 <div class="lg:col-span-2">
 <button 
 @click="$emit('add-teacher')"
 class="w-fit px-8 mx-auto sm:mx-0 h-11 rounded-xl border-2 border-blue-50 bg-blue-50/50 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
 >
 Add Teachers
 </button>
 </div>
 </div>

 <!-- Category -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
 <div class="lg:col-span-9 space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Category <span class="text-rose-500">*</span>
 </label>
 <div class="relative">
 <select class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold appearance-none cursor-pointer">
 <option value="">Tech e-books (library)</option>
 </select>
 <feather type="chevron-down" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"></feather>
 </div>
 </div>
 <div class="lg:col-span-1 hidden lg:flex h-11 items-center justify-center">
 <span class="text-[10px] font-black text-indigo-400 uppercase">OR</span>
 </div>
 <div class="lg:col-span-2">
 <button 
 @click="$emit('add-category')"
 class="w-fit px-8 mx-auto sm:mx-0 h-11 rounded-xl border-2 border-blue-50 bg-blue-50/50 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
 >
 Add Categories
 </button>
 </div>
 </div>

 <!-- Academic Year -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
 <div class="lg:col-span-9 space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Academic Year</label>
 <div class="relative">
 <select class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold appearance-none cursor-pointer">
 <option value="">Academic Year</option>
 </select>
 <feather type="chevron-down" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"></feather>
 </div>
 </div>
 <div class="lg:col-span-1 hidden lg:flex h-11 items-center justify-center">
 <span class="text-[10px] font-black text-indigo-400 uppercase">OR</span>
 </div>
 <div class="lg:col-span-2">
 <button 
 @click.stop="$emit('add-academic-year')"
 class="w-fit px-8 mx-auto sm:mx-0 h-11 rounded-xl border-2 border-blue-50 bg-blue-50/50 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
 >
 Add Academic Year
 </button>
 </div>
 </div>

 <!-- Select Class -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
 <div class="lg:col-span-9 space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Select Class:</label>
 <div class="relative">
 <select class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold appearance-none cursor-pointer">
 <option value="">Select Class</option>
 </select>
 <feather type="chevron-down" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"></feather>
 </div>
 </div>
 <div class="lg:col-span-1 hidden lg:flex h-11 items-center justify-center">
 <span class="text-[10px] font-black text-indigo-400 uppercase">OR</span>
 </div>
 <div class="lg:col-span-2">
 <button 
 @click.stop="$emit('add-class')"
 class="w-fit px-8 mx-auto sm:mx-0 h-11 rounded-xl border-2 border-blue-50 bg-blue-50/50 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
 >
 Add Class
 </button>
 </div>
 </div>

 <!-- Part 2: Main Info -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-blue-100">
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Title <span class="text-rose-500">*</span>
 </label>
 <input type="text" placeholder="Title" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">SEO Friendly URL</label>
 <input type="text" placeholder="Input slug or it will be generated automatically" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Test Series</label>
 <div class="relative">
 <select class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold appearance-none cursor-pointer">
 <option value="">Select TestSeries</option>
 </select>
 <feather type="chevron-down" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"></feather>
 </div>
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Course Features</label>
 <input type="text" placeholder="Separate keywords with a comma or enter key" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 </div>

 <!-- Part 3: Rich Text Editor -->
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Description</label>
 <div class="border border-blue-200 rounded-2xl overflow-hidden focus-within:border-blue-600 transition-all shadow-inner">
 <div class="bg-blue-50/80 px-4 py-3 border-b border-blue-200 flex flex-wrap gap-4">
 <div class="flex gap-1">
 <button class="p-2 hover:bg-white rounded-lg transition-colors text-blue-600 hover:text-blue-600"><feather type="bold" size="14"></feather></button>
 <button class="p-2 hover:bg-white rounded-lg transition-colors text-blue-600 hover:text-blue-600"><feather type="" size="14"></feather></button>
 <button class="p-2 hover:bg-white rounded-lg transition-colors text-blue-600 hover:text-blue-600"><feather type="underline" size="14"></feather></button>
 </div>
 <div class="w-px h-6 bg-blue-200"></div>
 <div class="flex gap-1">
 <button class="p-2 hover:bg-white rounded-lg transition-colors text-blue-600 hover:text-blue-600"><feather type="list" size="14"></feather></button>
 <button class="p-2 hover:bg-white rounded-lg transition-colors text-blue-600 hover:text-blue-600"><feather type="align-left" size="14"></feather></button>
 <button class="p-2 hover:bg-white rounded-lg transition-colors text-blue-600 hover:text-blue-600"><feather type="align-center" size="14"></feather></button>
 </div>
 <div class="w-px h-6 bg-blue-200"></div>
 <div class="flex gap-1">
 <button class="p-2 hover:bg-white rounded-lg transition-colors text-blue-600 hover:text-blue-600"><feather type="image" size="14"></feather></button>
 <button class="p-2 hover:bg-white rounded-lg transition-colors text-blue-600 hover:text-blue-600"><feather type="link" size="14"></feather></button>
 <button class="p-2 hover:bg-white rounded-lg transition-colors text-blue-600 hover:text-blue-600"><feather type="code" size="14"></feather></button>
 </div>
 </div>
 <textarea rows="6" class="w-full px-5 py-3 text-sm focus:outline-none text-blue-950 font-semibold bg-white placeholder:text-indigo-300" placeholder="Write detailed course description here..."></textarea>
 </div>
 </div>

 <!-- Part 4: Pricing & Dates -->
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Actual Price (in ₹) <span class="text-rose-500">*</span>
 </label>
 <div class="relative">
 <span class="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 font-bold">₹</span>
 <input type="text" placeholder="Actual Price" class="w-full h-11 pl-8 pr-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Selling Price (in ₹) <span class="text-rose-500">*</span>
 </label>
 <div class="relative">
 <span class="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 font-bold">₹</span>
 <input type="text" placeholder="Selling Price" class="w-full h-11 pl-8 pr-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Sequence <span class="text-rose-500">*</span>
 </label>
 <input type="number" value="0" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>

 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Start Date <span class="text-rose-500">*</span>
 </label>
 <div class="relative">
 <input type="text" placeholder="yyyy-mm-dd" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 <feather type="calendar" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Expire / Disable Date <span class="text-rose-500">*</span>
 </label>
 <div class="relative">
 <input type="text" placeholder="yyyy-mm-dd" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 <feather type="calendar" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Validity <span class="text-indigo-400">(Days)</span>
 </label>
 <div class="relative">
 <input type="text" placeholder="Course Validity in days" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 <feather type="clock" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>
 </div>
 </div>

 <!-- Part 5: Videos & Images -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Suggested Courses</label>
 <div class="relative">
 <input type="text" placeholder="Search courses..." class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 <feather type="search" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Introduction Video</label>
 <div class="relative">
 <select class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold appearance-none cursor-pointer">
 <option value="">Select One</option>
 </select>
 <feather type="video" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"></feather>
 </div>
 </div>
 </div>

 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Course Image</label>
 <div class="group relative flex items-center justify-center w-full aspect-[21/9] rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-white hover:border-blue-600 transition-all cursor-pointer overflow-hidden backdrop-blur-sm">
 <div class="flex flex-col items-center gap-2 pointer-events-none">
 <div class="p-4 rounded-2xl bg-white border border-blue-100 text-blue-600 shadow-sm group-hover:shadow-md transition-all">
 <feather type="upload-cloud" size="32"></feather>
 </div>
 <p class="text-xs font-black text-blue-700 uppercase tracking-widest mt-2">Upload Course Thumbnail</p>
 <p class="text-[10px] text-indigo-400 font-bold">Recommended size: 1280x720 (16:9)</p>
 </div>
 <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" />
 </div>
 </div>

 <!-- Part 6: Checkboxes -->
 <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 py-6 border-y border-blue-100">
 <label v-for="tag in ['Published', 'Featured', 'Trending', 'Popular', 'Free', 'Is Live Course?', 'Is Test Only?']" :key="tag" class="flex flex-col items-center gap-3 cursor-pointer group">
 <div class="relative w-5 h-5">
 <input type="checkbox" class="peer absolute inset-0 opacity-0 cursor-pointer z-10" />
 <div class="absolute inset-0 bg-blue-100 border-2 border-blue-200 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
 <feather type="check" size="12" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-all"></feather>
 </div>
 <span class="text-[9px] font-black text-blue-500 uppercase tracking-tighter text-center group-hover:text-blue-600 transition-all leading-tight">{{ tag }}</span>
 </label>
 </div>

 <!-- Part 7: SEO Meta -->
 <div class="space-y-6 pt-2">
 <div class="flex items-center gap-3 mb-2">
 <div class="h-px bg-blue-100 flex-1"></div>
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">SEO Optimization</span>
 <div class="h-px bg-blue-100 flex-1"></div>
 </div>
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Meta Title</label>
 <input type="text" placeholder="Focus Keyword Title" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Meta Keywords</label>
 <input type="text" placeholder="comma, separated, keywords" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Meta Description</label>
 <textarea rows="3" placeholder="Enter meta description for search engines..." class="w-full px-5 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold"></textarea>
 </div>
 </div>

 <!-- Part 8: Submission Buttons -->
 <div class="flex flex-col sm:flex-row items-center gap-4 pt-8">
 <button class="w-fit px-8 mx-auto sm:mx-0 sm:flex-1 py-3 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transform hover:-translate-y-1 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2">
 <feather type="save" size="16"></feather>
 Save Course
 </button>
 <button class="w-fit mx-auto sm:mx-0 px-6 py-3 rounded-2xl bg-white border-2 border-blue-100 text-blue-600 text-xs font-black uppercase tracking-[0.2em] hover:bg-rose-50 hover:border-rose-100 hover:text-rose-600 transition-all active:scale-95 flex items-center justify-center gap-2">
 <feather type="refresh-cw" size="16"></feather>
 Reset
 </button>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'AddCourse',
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
 }
}
</script>

<style scoped>
/* Glassmorphism effects */
.glass-card {
 box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}

/* Custom checkbox animation */
input[type="checkbox"]:checked + div {
 animation: check-pop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes check-pop {
 0% { transform: scale(0.8); }
 50% { transform: scale(1.1); }
 100% { transform: scale(1); }
}

/* Custom file upload focus */
input[type="file"]:focus + div {
 border-color: #2563eb;
 background-color: white;
}
</style>
