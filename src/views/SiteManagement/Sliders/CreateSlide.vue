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
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Sliders</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">{{ record ? 'Edit Slide' : 'Create Slide' }}</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">{{ record ? 'Edit Slide' : 'Create Slide' }}</h2>
 </div>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest border border-blue-100 shadow-sm hover:bg-blue-100 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="list" size="14"></feather>
 View Slides
 </button>
 </div>

 <!-- MAIN FORM CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-8 relative z-10 text-left">
 <form @submit.prevent="handleSave" class="space-y-10">
 
 <!-- Basic Info -->
 <div class="space-y-6">
 <!-- Name -->
 <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Name</label>
 <div class="lg:col-span-3">
 <input 
 v-model="formData.name"
 type="text" 
 placeholder="Name" 
 class="w-full h-12 px-6 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm"
 required
 />
 </div>
 </div>

 <!-- BG Image -->
 <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em] pt-4">BG Image</label>
 <div class="lg:col-span-3 space-y-2">
 <div class="relative group h-12">
 <input type="file" @change="handleFileChange" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
 <div class="absolute inset-0 w-full h-full px-5 py-3 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold text-indigo-400 overflow-hidden flex items-center justify-between group-hover:border-blue-600 transition-all">
 <span>{{ fileName || 'Choose file' }}</span>
 <feather type="upload" size="16"></feather>
 </div>
 </div>
 <p class="text-[10px] text-indigo-400 font-medium pl-1">
 Note: Please upload .jpg or .png in <span class="text-blue-600 font-bold">1920x800</span> resolution for best result. Use darker or Overlayed images for better result.
 </p>
 </div>
 </div>

 <!-- Overlay Toggle -->
 <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Overlay</label>
 <div class="lg:col-span-3 space-y-2">
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="formData.overlay" class="sr-only peer">
 <div class="w-11 h-6 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
 </label>
 <p class="text-[10px] text-indigo-400 font-medium">If you turn it on. A black overlay will be displayed on your image. It will be helpful when BG Image is not darker or does not have Overlay</p>
 </div>
 </div>

 <!-- Web or App Toggle -->
 <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Web or App</label>
 <div class="lg:col-span-3 space-y-2">
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="formData.onlyApp" class="sr-only peer">
 <div class="w-11 h-6 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
 <span class="ml-3 text-[10px] font-black text-blue-600 uppercase tracking-widest">{{ formData.onlyApp ? 'App Only' : 'Web & App' }}</span>
 </label>
 <p class="text-[10px] text-indigo-400 font-medium">If you turn it on. That means this slider is only for app.</p>
 </div>
 </div>
 </div>

 <!-- Text Content -->
 <div class="space-y-6 pt-10 border-t border-blue-50">
 <!-- Hero Text -->
 <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Hero Text</label>
 <div class="lg:col-span-3">
 <input v-model="formData.heroText" type="text" placeholder="Hero Text" class="w-full h-12 px-6 rounded-2xl bg-white border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm" />
 </div>
 </div>

 <!-- Sub Text -->
 <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Sub Text</label>
 <div class="lg:col-span-3">
 <input v-model="formData.subText" type="text" placeholder="Sub Text" class="w-full h-12 px-6 rounded-2xl bg-white border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm" />
 </div>
 </div>

 <!-- Widget -->
 <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Widget</label>
 <div class="lg:col-span-3">
 <select v-model="formData.widget" class="w-full h-12 px-6 rounded-2xl bg-white border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm cursor-pointer">
 <option value="">Select Widget</option>
 <option value="search">Search Bar</option>
 <option value="newsletter">Newsletter</option>
 </select>
 </div>
 </div>

 <!-- Buttons -->
 <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em] pt-4">Buttons</label>
 <div class="lg:col-span-3 space-y-4">
 <button type="button" class="px-6 py-3.5 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2">
 <feather type="plus-circle" size="14"></feather>
 Add Button
 </button>
 <p class="text-[10px] text-indigo-400 font-medium">Note: Maximum 4 buttons can be added. Please add label and link for the button for redirecting action when button is clicked.</p>
 </div>
 </div>
 </div>

 <!-- Bottom Actions -->
 <div class="flex items-center justify-end gap-4 pt-10 border-t border-blue-50">
 <button type="button" @click="$emit('back')" class="px-6 py-3 rounded-2xl bg-rose-50 text-rose-600 text-[11px] font-black uppercase tracking-widest border border-rose-100 hover:bg-rose-100 transition-all shadow-sm">
 Cancel
 </button>
 <button type="submit" class="px-6 py-3 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all">
 {{ record ? 'Update' : 'Create' }}
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
 <p class="text-[13px]">Slider {{ record ? 'updated' : 'created' }} successfully!</p>
 </div>
 </div>
 </div>
 </transition>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'CreateSlide',
 props: {
 record: { type: Object, default: null }
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
 name: '',
 overlay: false,
 onlyApp: false,
 heroText: '',
 subText: '',
 widget: ''
 },
 fileName: '',
 showSuccess: false
 }
 },
 mounted() {
 if (this.record) {
 this.formData = {
 name: this.record.name,
 overlay: true,
 onlyApp: this.record.webOrApp === 'App',
 heroText: 'Welcome to our platform',
 subText: 'Excellence in every lesson',
 widget: ''
 }
 }
 },
 methods: {
 handleFileChange(e) {
 const file = e.target.files[0];
 if (file) this.fileName = file.name;
 },
 handleSave() {
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
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
