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
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Blog</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">{{ record ? 'Edit Blog' : 'Create Blog' }}</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">{{ record ? 'Edit Blog' : 'Create Blog' }}</h2>
 </div>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest border border-blue-100 hover:bg-blue-100 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="list" size="14"></feather>
 View Blogs
 </button>
 </div>

 <!-- MAIN FORM CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 
 <div class="p-8 relative z-10 text-left">
 <form @submit.prevent="handleSave" class="space-y-8">
 
 <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
 <!-- Title -->
 <div class="space-y-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Title <span class="text-rose-500">*</span></label>
 <input 
 v-model="formData.title"
 type="text" 
 placeholder="Title" 
 class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm"
 required
 />
 </div>

 <!-- Category -->
 <div class="space-y-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Category <span class="text-rose-500">*</span></label>
 <select 
 v-model="formData.category"
 class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm cursor-pointer"
 required
 >
 <option value="">Please select</option>
 <option value="education">Education</option>
 <option value="technology">Technology</option>
 <option value="news">News</option>
 </select>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
 <!-- Slug -->
 <div class="space-y-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Slug</label>
 <input 
 v-model="formData.slug"
 type="text" 
 placeholder="Input slug or it will be generated automatically" 
 class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm"
 />
 </div>

 <!-- Featured Image -->
 <div class="space-y-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Featured Image (max file size 10MB)</label>
 <div class="relative group h-12">
 <input 
 type="file" 
 @change="handleFileChange"
 class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
 />
 <div class="absolute inset-0 w-full h-full px-5 py-3 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold text-indigo-400 overflow-hidden flex items-center justify-between group-hover:border-blue-600 transition-all">
 <span class="truncate">{{ fileName || 'Choose file' }}</span>
 <feather type="upload" size="16 "></feather>
 </div>
 </div>
 </div>
 </div>

 <!-- Content (Rich Text Mock) -->
 <div class="space-y-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Content <span class="text-rose-500">*</span></label>
 <div class="rounded-2xl border border-blue-200 bg-white overflow-hidden shadow-sm">
 <!-- Toolbar Mock -->
 <div class="bg-blue-50 border-b border-blue-100 p-2 flex flex-wrap gap-1">
 <button type="button" v-for="icon in ['bold', '', 'underline', 'list', 'image', 'link', 'video', 'code', 'help-circle']" :key="icon" class="p-2 hover:bg-white rounded-lg text-blue-500">
 <feather :type="icon" size="14"></feather>
 </button>
 <div class="w-px h-6 bg-blue-200 mx-1 self-center"></div>
 <select class="bg-transparent text-[10px] font-black uppercase text-blue-500 outline-none cursor-pointer px-2">
 <option>Styles</option>
 </select>
 <select class="bg-transparent text-[10px] font-black uppercase text-blue-500 outline-none cursor-pointer px-2">
 <option>Format</option>
 </select>
 </div>
 <textarea 
 v-model="formData.content"
 placeholder="Enter your content here..." 
 class="w-full h-80 p-6 text-sm focus:outline-none resize-none font-medium text-blue-700"
 required
 ></textarea>
 </div>
 </div>

 <!-- Tags -->
 <div class="space-y-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Tags</label>
 <input 
 v-model="formData.tags"
 type="text" 
 placeholder="Add tags here" 
 class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm"
 />
 <p class="text-[9px] font-bold text-indigo-400 uppercase tracking-widest pl-1">Separate tags with commas</p>
 </div>

 <!-- SEO Meta Section -->
 <div class="bg-blue-50/30 rounded-3xl p-8 space-y-8 border border-blue-100/30">
 <div class="space-y-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Meta Title</label>
 <input 
 v-model="formData.metaTitle"
 type="text" 
 placeholder="Meta Title" 
 class="w-full h-12 px-5 rounded-2xl bg-white border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm"
 />
 </div>

 <div class="space-y-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Meta Description</label>
 <textarea 
 v-model="formData.metaDescription"
 placeholder="Meta Description" 
 class="w-full h-32 p-5 rounded-2xl bg-white border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm resize-none"
 ></textarea>
 </div>

 <div class="space-y-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Meta Keywords</label>
 <textarea 
 v-model="formData.metaKeywords"
 placeholder="Meta Keywords" 
 class="w-full h-32 p-5 rounded-2xl bg-white border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm resize-none"
 ></textarea>
 </div>
 </div>

 <!-- Form Actions -->
 <div class="flex items-center justify-center pt-8 border-t border-blue-100 gap-4">
 <button 
 type="submit"
 :disabled="loading"
 class="group relative flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300 outline-none overflow-hidden"
 >
 <feather v-if="!loading" :type="record ? 'refresh-cw' : 'check'" size="16"></feather>
 <feather v-else type="loader" size="16" class="animate-spin"></feather>
 <span class="text-[11px] font-black uppercase tracking-[0.2em]">{{ loading ? 'Processing...' : (record ? 'Update Blog' : 'Publish') }}</span>
 </button>
 <button 
 type="button"
 @click="clearForm"
 class="px-6 py-3 rounded-2xl bg-blue-100 text-blue-600 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-200 transition-all"
 >
 Clear
 </button>
 </div>
 </form>
 </div>
 </div>

 <!-- SUCCESS TOAST -->
 <transition name="fade-slide">
 <div v-if="showSuccess" class="fixed bottom-10 right-10 z-[100]">
 <div class="flex items-center gap-4 bg-emerald-600 text-white px-6 py-3 rounded-3xl shadow-2xl border border-emerald-500/20 backdrop-blur-md">
 <feather type="check-circle" size="22"></feather>
 <div class="text-left font-bold">
 <p class="text-[13px]">Blog {{ record ? 'updated' : 'published' }} successfully!</p>
 </div>
 </div>
 </div>
 </transition>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'CreateBlog',
 props: {
 record: {
 type: Object,
 default: null
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
 title: '',
 category: '',
 slug: '',
 content: '',
 tags: '',
 metaTitle: '',
 metaDescription: '',
 metaKeywords: ''
 },
 fileName: '',
 loading: false,
 showSuccess: false
 }
 },
 mounted() {
 if (this.record) {
 this.formData = {
 title: this.record.title,
 category: this.record.category.toLowerCase(),
 slug: this.record.title.toLowerCase().replace(/ /g, '-'),
 content: 'Detailed content for ' + this.record.title,
 tags: 'education, blog, news',
 metaTitle: this.record.title,
 metaDescription: 'Description for ' + this.record.title,
 metaKeywords: this.record.category.toLowerCase()
 };
 }
 },
 methods: {
 handleFileChange(e) {
 const file = e.target.files[0];
 if (file) {
 this.fileName = file.name;
 }
 },
 handleSave() {
 this.loading = true;
 setTimeout(() => {
 this.loading = false;
 this.showSuccess = true;
 setTimeout(() => {
 this.showSuccess = false;
 this.$emit('back');
 }, 2000);
 }, 1000);
 },
 clearForm() {
 this.formData = {
 title: '',
 category: '',
 slug: '',
 content: '',
 tags: '',
 metaTitle: '',
 metaDescription: '',
 metaKeywords: ''
 };
 this.fileName = '';
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 1.5rem; }
.glass-glow {
 position: absolute;
 top: -50%;
 left: -50%;
 width: 200%;
 height: 200%;
 background: radial-gradient(circle at 10% 10%, rgba(30, 64, 175, 0.03) 0%, transparent 50%);
 pointer-events: none;
}
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s ease; }
.fade-slide-enter { opacity: 0; transform: translateY(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(20px); }
</style>
