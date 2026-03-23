<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('navigate', 'list_notifications')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Notifications</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">Create</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Send Notification</h2>
 </div>
 </div>
 <button @click="$emit('navigate', 'list_notifications')" class="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xl shadow-blue-500/10 hover:bg-blue-600 hover:text-white transition-all">
 <feather type="list" size="18"></feather>
 <span class="text-[11px] font-black uppercase tracking-[0.1em]">Show all Notifications</span>
 </button>
 </div>

 <!-- CREATE FORM -->
 <div class="glass-card bg-white/80 backdrop-blur-md border border-blue-200/60 p-10">
 <div class="text-left space-y-8">
 
 <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
 <!-- Course Selection -->
 <div class="space-y-2">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1">Select Course <span class="text-rose-500">*</span></label>
 <div class="relative">
 <select v-model="form.course" class="w-full h-12 px-5 appearance-none rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all cursor-pointer">
 <option value="all">All Students</option>
 <option v-for="c in courses" :key="c" :value="c">{{ c }}</option>
 </select>
 <feather type="chevron-down" size="16" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"></feather>
 </div>
 </div>

 <!-- Schedule -->
 <div class="space-y-2">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1">Select Schedule</label>
 <div class="relative">
 <input type="datetime-local" v-model="form.schedule" class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all" />
 <div class="absolute right-12 top-1/2 -translate-y-1/2 h-6 border-r border-blue-200"></div>
 <feather type="calendar" size="16" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"></feather>
 </div>
 </div>
 </div>

 <!-- Title -->
 <div class="space-y-2">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1">Notification Title <span class="text-rose-500">*</span></label>
 <input type="text" v-model="form.title" placeholder="Enter alert title..." class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all" />
 </div>

 <!-- Image Upload -->
 <div class="space-y-2">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1">Select Image</label>
 <div class="p-1 rounded-2xl bg-blue-50 border border-blue-200">
 <input type="file" class="w-full text-xs text-blue-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-white file:text-blue-600 hover:file:bg-blue-600 hover:file:text-white transition-all cursor-pointer" />
 </div>
 </div>

 <!-- Message (Wysiwyg Mock) -->
 <div class="space-y-2">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1">Notification Message <span class="text-rose-500">*</span></label>
 <div class="rounded-3xl border border-blue-200 overflow-hidden bg-white">
 <div class="bg-blue-50/50 border-b border-blue-200 px-4 py-2 flex items-center gap-4 text-blue-500">
 <feather type="bold" size="14"></feather>
 <feather type="" size="14"></feather>
 <feather type="underline" size="14"></feather>
 <div class="h-4 border-r border-indigo-300"></div>
 <feather type="list" size="14"></feather>
 <feather type="link" size="14"></feather>
 <feather type="image" size="14"></feather>
 </div>
 <textarea v-model="form.message" class="w-full h-64 p-6 text-sm font-semibold outline-none resize-none placeholder:text-indigo-300" placeholder="Type your detailed message here..."></textarea>
 </div>
 </div>

 <!-- Actions -->
 <div class="flex items-center justify-end gap-3 pt-6">
 <button @click="$emit('navigate', 'list_notifications')" class="px-6 py-3.5 rounded-2xl bg-blue-100 text-blue-500 text-[11px] font-black uppercase tracking-widest hover:bg-blue-200 transition-all">Cancel</button>
 <button @click="handleSend" class="px-6 py-3.5 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all group">
 <feather type="send" size="16" class="inline-block mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></feather>
 Send Notification
 </button>
 </div>

 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'CreateNotification',
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
 courses: ['English Language', 'Mathematics', 'Science & Tech', 'History'],
 form: {
 course: 'all',
 title: '',
 schedule: '',
 message: ''
 }
 }
 },
 methods: {
 handleSend() {
 if (!this.form.title || !this.form.message) {
 alert('Please fill in required fields!');
 return;
 }
 alert('Notification sent successfully!');
 this.$emit('navigate', 'list_notifications');
 }
 }
}
</script>

<style scoped>
.glass-card { border-radius: 2.5rem; }
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
 opacity: 0;
 width: 100%;
 height: 100%;
 position: absolute;
 top: 0;
 left: 0;
 cursor: pointer;
}
</style>
