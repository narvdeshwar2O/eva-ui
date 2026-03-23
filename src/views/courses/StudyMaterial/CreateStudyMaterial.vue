<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors">Study Material</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950">{{ material ? 'Edit Study Material' : 'Create Study Material' }}</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">{{ material ? 'Edit Study Material' : 'Create Study Material' }}</h2>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="list" size="14"></feather>
 View Study Material
 </button>
 </div>
 </div>

 <!-- CREATE FORM CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 
 <div class="p-6 relative z-10">
 <form @submit.prevent="handleSave" class="space-y-6">
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <!-- Course Selection -->
 <div class="space-y-1.5 text-left">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Course <span class="text-blue-500 font-bold">*</span>
 </label>
 <select v-model="formData.course" class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all">
 <option value="">Select Course</option>
 <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.title }}</option>
 </select>
 </div>

 <!-- Title -->
 <div class="space-y-1.5 text-left">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Title <span class="text-blue-500 font-bold">*</span>
 </label>
 <input type="text" v-model="formData.title" placeholder="Title" class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all" />
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <!-- Slug -->
 <div class="space-y-1.5 text-left">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Slug
 </label>
 <input type="text" v-model="formData.slug" placeholder="Input slug or it will be generated automatically" class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all" />
 </div>

 <!-- Image Upload -->
 <div class="space-y-1.5 text-left">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Study Material Image <span class="text-[9px] font-normal text-indigo-400 normal-case">(max file size 5MB)</span>
 </label>
 <input type="file" @change="handleImageUpload" class="w-full h-11 px-4 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-500 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
 </div>
 </div>

 <!-- Full Text (Rich editor mock) -->
 <div class="space-y-1.5 text-left">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Full Text
 </label>
 <div class="rounded-2xl border border-blue-200 overflow-hidden bg-white shadow-sm">
 <div class="flex items-center flex-wrap gap-1 p-2 bg-blue-50 border-b border-blue-100">
 <button type="button" v-for="icon in ['bold', '', 'list', 'align-left', 'align-center', 'link', 'image', 'code']" :key="icon" class="p-2 hover:bg-blue-200 rounded-lg text-blue-600 transition-all">
 <feather :type="icon" size="14"></feather>
 </button>
 <div class="h-4 w-px bg-blue-200 mx-1"></div>
 <select class="bg-transparent text-[10px] font-bold outline-none border-none cursor-pointer p-1">
 <option>Source</option>
 </select>
 </div>
 <textarea v-model="formData.description" rows="6" class="w-full p-6 text-sm outline-none focus:bg-blue-50/30 transition-all resize-none font-medium text-blue-700" placeholder="Study material details..."></textarea>
 </div>
 </div>

 <!-- Add PDF -->
 <div class="space-y-1.5 text-left">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Add PDF <span class="text-blue-500 font-bold">*</span>
 </label>
 <input type="file" @change="handleFileUpload" accept=".pdf" class="w-full h-11 px-4 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-500 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
 </div>

 <!-- Toggles -->
 <div class="flex flex-wrap items-center gap-6 py-3 px-2">
 <label v-for="toggle in ['Published', 'Featured', 'Trending', 'Popular', 'Free']" :key="toggle" class="flex items-center gap-2 cursor-pointer group">
 <div class="relative w-4 h-4">
 <input type="checkbox" v-model="formData.toggles[toggle.toLowerCase()]" class="peer absolute inset-0 opacity-0 cursor-pointer z-10" />
 <div class="absolute inset-0 bg-white border-2 border-blue-200 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all group-hover:border-blue-200"></div>
 <feather type="check" size="10" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-all"></feather>
 </div>
 <span class="text-[11px] font-bold text-blue-700 uppercase tracking-widest">{{ toggle }}</span>
 </label>
 </div>

 <div class="pt-6 border-t border-blue-50 text-left">
 <button 
 type="submit"
 class="px-6 py-3 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 {{ material ? 'Update' : 'Save' }}
 </button>
 </div>
 </form>
 </div>
 </div>

 <!-- Success Message Popover -->
 <div v-if="showSuccess" class="fixed bottom-10 right-10 z-[100] animate-in slide-in-from-right duration-500">
 <div class="flex items-center gap-4 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl shadow-emerald-500/40">
 <feather type="check-circle" size="24"></feather>
 <div>
 <p class="text-sm font-black uppercase tracking-widest">Success</p>
 <p class="text-[12px] font-bold opacity-90">Study Material {{ material ? 'updated' : 'created' }} successfully</p>
 </div>
 <button @click="showSuccess = false" class="ml-4 p-1 hover:bg-emerald-500 rounded-lg transition-all">
 <feather type="x" size="16"></feather>
 </button>
 </div>
 </div>

 <div class="text-center py-6">
 <p class="text-[10px] text-indigo-400 font-medium">Copyright © 2026 Admin Panel All Rights Reserved. <span class="ml-4">Powered By Evoclasses</span></p>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'CreateStudyMaterial',
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
 props: ['material'],
 data() {
 return {
 courses: [
 { id: 1, title: 'Python Learning' },
 { id: 2, title: 'Java Masterclass' },
 { id: 3, title: 'Advanced Vue.js' }
 ],
 formData: {
 course: '',
 title: '',
 slug: '',
 image: null,
 description: '',
 attachment: null,
 toggles: {
 published: false,
 featured: false,
 trending: false,
 popular: false,
 free: false
 }
 },
 showSuccess: false
 }
 },
 mounted() {
 if (this.material) this.populateForm(this.material);
 },
 watch: {
 material: {
 immediate: true,
 handler(newVal) {
 if (newVal) this.populateForm(newVal);
 }
 }
 },
 methods: {
 populateForm(data) {
 this.formData = {
 course: data.course_id || '',
 title: data.title || '',
 slug: data.slug || '',
 image: null,
 description: data.description || '',
 attachment: null,
 toggles: {
 published: true,
 featured: false,
 trending: false,
 popular: false,
 free: false
 }
 };
 },
 handleImageUpload(e) {
 const file = e.target.files[0];
 if (file && file.size > 5 * 1024 * 1024) {
 alert('Image max size is 5MB');
 e.target.value = '';
 return;
 }
 this.formData.image = file;
 },
 handleFileUpload(e) {
 const file = e.target.files[0];
 if (file && file.type !== 'application/pdf') {
 alert('File must be a PDF');
 e.target.value = '';
 return;
 }
 this.formData.attachment = file;
 },
 handleSave() {
 if (!this.formData.course || !this.formData.title) {
 alert('Please fill required fields');
 return;
 }
 this.showSuccess = true;
 setTimeout(() => {
 this.showSuccess = false;
 this.$emit('back');
 }, 2000);
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
 background: radial-gradient(circle at 10% 10%, rgba(30, 64, 175, 0.03) 0%, transparent 50%);
 pointer-events: none;
}
</style>
