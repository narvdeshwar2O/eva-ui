<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('navigate', 'list_course')" class="hover:text-blue-600 cursor-pointer transition-colors">Courses</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Extend Validity</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase">{{ record ? 'Edit Validity' : 'Create Validity' }}</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">{{ record ? 'Edit Validity' : 'Extend Validity' }}</h2>
 </div>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-950 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-black hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="users" size="14"></feather>
 View User Courses
 </button>
 </div>

 <!-- MAIN FORM CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 
 <div class="p-8 relative z-10 text-left">
 <form @submit.prevent="handleSave" class="space-y-8">
 <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <!-- Users Selection -->
 <div class="space-y-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em] flex items-center gap-2">
 Users <span class="text-blue-500 font-bold">*</span>
 </label>
 <div class="relative group">
 <select 
 v-model="formData.userId" 
 class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all appearance-none cursor-pointer shadow-sm group-hover:shadow-md"
 required
 >
 <option value="">Please Select</option>
 <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
 </select>
 <feather type="chevron-down" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none group-hover:text-blue-600 transition-colors"></feather>
 </div>
 </div>

 <!-- Course Selection -->
 <div class="space-y-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em] flex items-center gap-2">
 Course <span class="text-blue-500 font-bold">*</span>
 </label>
 <div class="relative group">
 <select 
 v-model="formData.courseId" 
 class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all appearance-none cursor-pointer shadow-sm group-hover:shadow-md"
 required
 >
 <option value="">Please Select</option>
 <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.title }}</option>
 </select>
 <feather type="chevron-down" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none group-hover:text-blue-600 transition-colors"></feather>
 </div>
 </div>

 <!-- Validity Date Selection -->
 <div class="space-y-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em] flex items-center gap-2">
 Course Validity Till Date(Y-m-d) <span class="text-blue-500 font-bold">*</span>
 </label>
 <div class="relative group">
 <input 
 type="date" 
 v-model="formData.validTill" 
 class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm group-hover:shadow-md cursor-pointer"
 required
 />
 <feather type="calendar" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none group-hover:text-blue-600 transition-colors"></feather>
 </div>
 </div>
 </div>

 <!-- SAVE/UPDATE BUTTON -->
 <div class="pt-6 border-t border-blue-50">
 <button 
 type="submit"
 :disabled="loading"
 class="group relative flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 outline-none overflow-hidden"
 >
 <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
 <feather v-if="!loading" :type="record ? 'refresh-cw' : 'save'" size="16" :class="loading ? 'animate-spin' : ''"></feather>
 <feather v-else type="loader" size="16" class="animate-spin"></feather>
 <span class="text-[11px] font-black uppercase tracking-[0.2em]">{{ loading ? (record ? 'Updating...' : 'Saving...') : (record ? 'Update' : 'Save') }}</span>
 </button>
 </div>
 </form>
 </div>
 </div>

 <!-- SUCCESS TOAST -->
 <transition name="fade-slide">
 <div v-if="showSuccess" class="fixed bottom-10 right-10 z-[100]">
 <div class="flex items-center gap-4 bg-emerald-600 text-white px-6 py-3 rounded-3xl shadow-[0_20px_50px_-12px_rgba(16,185,129,0.3)] border border-emerald-500/20 backdrop-blur-md">
 <div class="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
 <feather type="check-circle" size="22"></feather>
 </div>
 <div>
 <p class="text-xs font-black uppercase tracking-widest leading-none mb-1">Success</p>
 <p class="text-[13px] font-bold opacity-90">Course validity {{ record ? 'updated' : 'extended' }} successfully!</p>
 </div>
 <button @click="showSuccess = false" class="ml-4 p-2 hover:bg-white/10 rounded-xl transition-all">
 <feather type="x" size="18"></feather>
 </button>
 </div>
 </div>
 </transition>

 <!-- FOOTER -->
 <div class="flex flex-col md:flex-row items-center justify-between py-10 px-4 border-t border-blue-200/50 text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] gap-4 mt-12">
 <p>Copyright © 2026 <span class="text-blue-600 underline decoration-blue-200 underline-offset-4">Evoclasses</span> All Rights Reserved.</p>
 <div class="flex items-center gap-2">
 <span>Powered By</span>
 <span class="text-blue-950 bg-blue-100 px-2 py-1 rounded-md">Evoclasses</span>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'CreateExtendValidity',
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
 userId: '',
 courseId: '',
 validTill: ''
 },
 users: [
 { id: 1, name: 'Ashish Kumar' },
 { id: 2, name: 'John Doe' },
 { id: 3, name: 'Jane Smith' }
 ],
 courses: [
 { id: 1, title: 'Python Learning' },
 { id: 2, title: 'Java Masterclass' },
 { id: 3, title: 'Advanced Vue.js' }
 ],
 loading: false,
 showSuccess: false
 }
 },
 mounted() {
 if (this.record) {
 // Find IDs from names/emails in dummy data or just set placeholders
 this.formData = {
 userId: 1, // Placeholder
 courseId: 1, // Placeholder
 validTill: this.record.validity
 };
 }
 },
 methods: {
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
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.05); }
.glass-glow {
 position: absolute;
 top: -50%;
 left: -50%;
 width: 200%;
 height: 200%;
 background: radial-gradient(circle at 10% 10%, rgba(30, 64, 175, 0.03) 0%, transparent 50%);
 pointer-events: none;
}
.glass-card-edge {
 position: absolute;
 inset: 0;
 border-radius: 1.5rem;
 border: 1px solid rgba(255, 255, 255, 0.2);
 pointer-events: none;
}

.fade-slide-enter-active, .fade-slide-leave-active {
 transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.fade-slide-enter {
 opacity: 0;
 transform: translateX(100px);
}
.fade-slide-leave-to {
 opacity: 0;
 transform: translateY(20px);
}

input[type="date"]::-webkit-calendar-picker-indicator {
 background: transparent;
 bottom: 0;
 color: transparent;
 cursor: pointer;
 height: auto;
 left: 0;
 position: absolute;
 right: 0;
 top: 0;
 width: auto;
}
</style>
