<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Access</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">User History</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">Unlock Course</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Unlock Courses</h2>
 <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Manual Access</span>
 </div>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="eye" size="14"></feather>
 View User Courses
 </button>
 </div>
 </div>

 <!-- MAIN FORM CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-8 relative z-10 text-left">
 <form @submit.prevent="handleSave" class="space-y-8">
 <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
 
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Users</label>
 <div class="relative">
 <select v-model="formData.user" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-600 outline-none appearance-none cursor-pointer focus:border-blue-600 transition-all shadow-sm">
 <option value="">{{ user ? `${user.email}, ${user.mobile}` : 'Select User' }}</option>
 <!-- Additional users would be populated here -->
 </select>
 <feather type="chevron-down" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"></feather>
 </div>
 </div>

 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Course</label>
 <div class="relative">
 <select v-model="formData.course" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-600 outline-none appearance-none cursor-pointer focus:border-blue-600 transition-all shadow-sm">
 <option value="">Please select</option>
 <option value="English Language">English Language</option>
 <option value="Mathematics Level 2">Mathematics Level 2</option>
 </select>
 <feather type="chevron-down" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"></feather>
 </div>
 </div>

 <div class="space-y-2">
 <label class="block text-[10px] font-black text-blue-900 uppercase tracking-widest">Course Validity Till Date(Y-m-d)</label>
 <label class="inline-flex items-center cursor-pointer mt-3">
 <input type="checkbox" v-model="formData.customValidity" class="w-4 h-4 rounded border-indigo-300 text-blue-600 focus:ring-blue-600">
 <span class="ml-2 text-sm text-blue-600 font-medium">Enable Custom Date</span>
 </label>
 <input 
 v-if="formData.customValidity" 
 type="date" 
 v-model="formData.validityDate" 
 class="w-full mt-2 h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-600 outline-none focus:border-blue-600 transition-all shadow-sm"
 >
 </div>

 </div>

 <!-- Form Actions -->
 <div class="pt-6 border-t border-blue-100 flex items-center justify-start gap-4">
 <button 
 type="submit"
 class="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-black uppercase text-[11px] tracking-widest shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all duration-300"
 >
 <feather type="save" size="14"></feather>
 Save
 </button>
 </div>
 </form>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'UnlockCourse',
 props: {
 user: { type: Object, default: null }
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
 user: '',
 course: '',
 customValidity: false,
 validityDate: ''
 }
 }
 },
 mounted() {
 // If a user prop is passed we might want an initial value or similar
 },
 methods: {
 handleSave() {
 // simulate save
 alert("Changes Saved successfully!");
 this.$emit('back'); // Navigate back to the history/list
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
