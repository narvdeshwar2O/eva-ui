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
 <span class="text-blue-950">Edit Course</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Edit Course</h2>
 </div>
 <button
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="list" size="14"></feather>
 View Courses
 </button>
 </div>

 <!-- Form Layout matching User Screenshot -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>

 <div class="p-6 space-y-8 relative z-10">
 <!-- Teachers -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
 <div class="lg:col-span-10 space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Teachers <span class="text-rose-500">*</span>
 </label>
 <div class="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-blue-50 border border-blue-200 min-h-[44px]">
 <div class="flex items-center gap-1.5 px-3 py-1 bg-white border border-blue-200 rounded-lg text-[10px] font-bold text-blue-700 shadow-sm">
 <feather type="x" size="10" class="text-indigo-400 hover:text-rose-500 cursor-pointer"></feather>
 Dummy Teacher
 </div>
 <input type="text" placeholder="Select Teachers" class="flex-1 min-w-[150px] bg-transparent border-none focus:outline-none text-sm font-semibold h-7" />
 </div>
 </div>
 <div class="lg:col-span-2">
 <button @click="$emit('add-teacher')" class="w-fit px-8 mx-auto sm:mx-0 h-11 rounded-xl border-2 border-blue-100 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm">
 Add Teachers
 </button>
 </div>
 </div>

 <!-- Category -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
 <div class="lg:col-span-10 space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Category <span class="text-rose-500">*</span>
 </label>
 <select v-model="formData.category" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold cursor-pointer">
 <option value="Tech e-books (library)">Tech e-books (library)</option>
 </select>
 </div>
 <div class="lg:col-span-2">
 <button @click="$emit('add-category')" class="w-fit px-8 mx-auto sm:mx-0 h-11 rounded-xl border-2 border-blue-100 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm">
 Add Categories
 </button>
 </div>
 </div>

 <!-- Academic Year -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
 <div class="lg:col-span-10 space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Academic Year</label>
 <select v-model="formData.academicYear" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold cursor-pointer">
 <option value="">Select Year</option>
 </select>
 </div>
 <div class="lg:col-span-2">
 <button @click="$emit('add-academic-year')" class="w-fit px-8 mx-auto sm:mx-0 h-11 rounded-xl border-2 border-blue-100 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm">
 Add Academic Year
 </button>
 </div>
 </div>

 <!-- Select Class -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
 <div class="lg:col-span-10 space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Select Class:</label>
 <select v-model="formData.class" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold cursor-pointer">
 <option value="">Select Class</option>
 </select>
 </div>
 <div class="lg:col-span-2">
 <button @click="$emit('add-class')" class="w-fit px-8 mx-auto sm:mx-0 h-11 rounded-xl border-2 border-blue-100 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm">
 Add Class
 </button>
 </div>
 </div>

 <!-- Title and URL -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Title <span class="text-rose-500">*</span>
 </label>
 <input type="text" v-model="formData.title" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">SEO Friendly URL</label>
 <input type="text" v-model="formData.slug" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 </div>

 <!-- Feature Rows -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Test Series</label>
 <select v-model="formData.testSeries" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold cursor-pointer">
 <option value="">Select TestSeries</option>
 </select>
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Course Features</label>
 <input type="text" v-model="formData.features" placeholder="Separate keywords with a comma or enter key" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 </div>

 <!-- Description -->
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Description</label>
 <textarea v-model="formData.description" rows="4" class="w-full px-5 py-3 rounded-xl border border-blue-200 text-sm focus:outline-none focus:border-blue-600 text-blue-950 font-semibold bg-blue-50/50" placeholder="Description"></textarea>
 </div>

 <!-- Pricing & Sequence -->
 <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Actual Price (in ₹) <span class="text-rose-500">*</span>
 </label>
 <input type="text" v-model="formData.actualPrice" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Selling Price (in ₹) <span class="text-rose-500">*</span>
 </label>
 <input type="text" v-model="formData.sellingPrice" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Course Image</label>
 <input type="file" class="w-full h-11 px-4 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-500 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
 </div>
 </div>

 <!-- Dates & Validity -->
 <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Start Date (yyyy-mm-dd) <span class="text-rose-500">*</span>
 </label>
 <input type="text" v-model="formData.startDate" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Expire / Disable Course Date (yyyy-mm-dd) <span class="text-rose-500">*</span>
 </label>
 <input type="text" v-model="formData.expireDate" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Sequence <span class="text-rose-500">*</span>
 </label>
 <input type="number" v-model="formData.sequence" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Course Validity in days</label>
 <input type="text" v-model="formData.validity" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Suggested Courses</label>
 <input type="text" class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold" />
 </div>
 </div>

 <!-- Video and Instructions -->
 <div class="space-y-4">
 <div class="space-y-1.5">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Introduction Video</label>
 <select class="w-full h-11 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-blue-950 font-semibold cursor-pointer">
 <option value="">Select One</option>
 </select>
 </div>
 <div class="text-[10px] text-blue-500 font-bold space-y-1 leading-relaxed">
 <p>Youtube : Go to Youtube -> Go to video you want to display -> click on share button below video. Copy that links and paste in above text box</p>
 <p>Vimeo : Go to Vimeo -> Go to video you want to display -> click on share button and copy paste video url here</p>
 <p>Upload : Upload mp4 file in file input</p>
 <p>Embed : Copy / Paste embed code in above text box</p>
 </div>
 </div>

 <!-- Checkboxes -->
 <div class="flex flex-wrap gap-x-6 gap-y-4 py-6 border-y border-blue-100">
 <label v-for="tag in ['Published', 'Featured', 'Trending', 'Popular', 'Free', 'Is Live Course?', 'Is Test Only?']" :key="tag" class="flex items-center gap-2 cursor-pointer group">
 <div class="relative w-4 h-4">
 <input type="checkbox" :checked="tag === 'Published'" class="peer absolute inset-0 opacity-0 cursor-pointer z-10" />
 <div class="absolute inset-0 bg-white border-2 border-blue-200 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
 <feather type="check" size="10" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-all"></feather>
 </div>
 <span class="text-[11px] font-black text-blue-600 uppercase tracking-tighter group-hover:text-blue-600 transition-all">{{ tag }}</span>
 </label>
 </div>

 <div class="flex items-center pt-4">
 <button
 @click="$emit('back')"
 class="px-6 py-3 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 Save
 </button>
 </div>
 </div>
 </div>
 <div class="text-center py-6">
 <p class="text-[10px] text-indigo-400 font-medium">Copyright © 2026 Evaclasses All Rights Reserved. <span class="ml-4">Powered By Evodlasses</span></p>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'EditCourse',
 props: {
 course: {
 type: Object,
 default: () => ({})
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
 },
 data() {
 return {
 formData: {
 title: this.course.title || 'Python Learning',
 slug: this.course.slug || 'python-learning',
 category: this.course.category_name || 'Tech e-books (library)',
 academicYear: '',
 class: '',
 testSeries: '',
 features: '',
 description: 'Description',
 actualPrice: this.course.price || '10000.00',
 sellingPrice: this.course.selling_price || '7999.00',
 sequence: 1,
 startDate: '2023-03-27',
 expireDate: '2023-12-16',
 validity: '365'
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
