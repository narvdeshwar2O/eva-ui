<template>
 <div class="space-y-6 max-w-5xl mx-auto">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors">Subjects</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950">{{ subject ? 'Edit' : 'Create' }} Subject</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">{{ subject ? 'Edit' : 'Create' }} Subject</h2>
 </div>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="list" size="14"></feather>
 View Subjects
 </button>
 </div>

 <!-- Form Card -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="glass-glow"></div>
 
 <div class="p-8 relative z-10">
 <form @submit.prevent="handleSubmit" class="space-y-8">
 <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 <!-- Category -->
 <div class="space-y-2 text-left">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Categories <span class="text-blue-500 font-bold">*</span>
 </label>
 <select 
 v-model="formData.category" 
 class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all appearance-none cursor-pointer"
 required
 >
 <option value="">Please select</option>
 <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
 </select>
 </div>

 <!-- Name -->
 <div class="space-y-2 text-left">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Name <span class="text-blue-500 font-bold">*</span>
 </label>
 <input 
 type="text" 
 v-model="formData.name" 
 placeholder="Name" 
 class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
 required
 />
 </div>

 <!-- Sequence -->
 <div class="space-y-2 text-left">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1">
 Sequence
 </label>
 <input 
 type="number" 
 v-model="formData.sequence" 
 class="w-full h-11 px-4 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
 />
 </div>
 </div>

 <!-- Submit Button -->
 <div class="pt-6 border-t border-blue-50 text-left">
 <button 
 type="submit"
 class="px-6 py-3 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 {{ subject ? 'Update' : 'Save' }}
 </button>
 </div>
 </form>
 </div>
 </div>

 <!-- Success Notification (Simulated) -->
 <div 
 v-if="showSuccess" 
 class="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 z-50 font-bold"
 >
 <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
 <feather type="check" size="16"></feather>
 </div>
 <span>Subject {{ subject ? 'updated' : 'created' }} successfully!</span>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'CreateSubject',
 props: {
 subject: {
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
 category: '',
 name: '',
 sequence: 0
 },
 categories: ['Tech e-books (library)', 'Language', 'Computer Science', 'Mathematics'],
 showSuccess: false
 }
 },
 mounted() {
 if (this.subject) {
 this.formData = {
 category: this.subject.category,
 name: this.subject.name,
 sequence: this.subject.sequence
 };
 }
 },
 methods: {
 handleSubmit() {
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
