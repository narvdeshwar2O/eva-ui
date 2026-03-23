<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Settings</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">Zoom Setting</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Zoom Setting</h2>
 </div>
 </div>
 </div>

 <!-- ZOOM CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md border border-blue-200/60 p-8">
 <div class="relative z-10 text-left space-y-6">
 
 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center border-b border-blue-100 pb-4">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">API Key <span class="text-rose-500">*</span></label>
 <input type="text" v-model="zoom.apiKey" class="w-full h-11 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all" />
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center border-b border-blue-100 pb-4">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Secret Key <span class="text-rose-500">*</span></label>
 <input type="text" v-model="zoom.apiSecret" class="w-full h-11 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all" />
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center border-b border-blue-100 pb-4">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Meeting Join Approval</label>
 <select v-model="zoom.approval" class="w-full h-11 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all cursor-pointer">
 <option>Automatically</option>
 <option>Manually</option>
 </select>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center border-b border-blue-100 pb-4">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Audio Option</label>
 <select v-model="zoom.audio" class="w-full h-11 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all cursor-pointer">
 <option>Both</option>
 <option>Telephony</option>
 <option>VoIP</option>
 </select>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center border-b border-blue-100 pb-4">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Auto Recording</label>
 <select v-model="zoom.recording" class="w-full h-11 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all cursor-pointer">
 <option>None</option>
 <option>Local</option>
 <option>Cloud</option>
 </select>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center border-b border-blue-100 pb-4">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Timezone</label>
 <select v-model="zoom.timezone" class="w-full h-11 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all cursor-pointer">
 <option>Asia/Kolkata</option>
 <option>UTC</option>
 </select>
 </div>

 <div v-for="toggle in toggles" :key="toggle.key" class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center border-b border-blue-100 pb-4">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">{{ toggle.label }}</label>
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="zoom[toggle.key]" class="sr-only peer">
 <div class="w-10 h-5 rounded-full peer-focus:outline-none transition-all flex items-center shadow-inner relative bg-blue-100 peer-checked:bg-blue-600">
 <div class="after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all shadow-sm peer-checked:after:translate-x-5"></div>
 </div>
 </label>
 </div>

 <div class="flex items-center justify-end gap-3 pt-6">
 <button class="px-6 py-3.5 rounded-2xl bg-rose-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all">Cancel</button>
 <button @click="handleUpdate" class="px-6 py-3.5 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">Update</button>
 </div>

 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ZoomSetting',
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
 zoom: {
 apiKey: 'X7FLP1XuQUq5le9d3ZIOFg',
 apiSecret: 'Rgs9fbFP3vOkcaA7icZoXLMPJxgO',
 approval: 'Automatically',
 audio: 'Both',
 recording: 'None',
 timezone: 'Asia/Kolkata',
 joinBeforeHost: true,
 hostVideo: true,
 participantVideo: true,
 muteUponEntry: true,
 waitingRoom: true
 },
 toggles: [
 { key: 'joinBeforeHost', label: 'Join Before Host' },
 { key: 'hostVideo', label: 'Host Video' },
 { key: 'participantVideo', label: 'Participant Video' },
 { key: 'muteUponEntry', label: 'Participant Mic Mute' },
 { key: 'waitingRoom', label: 'Waiting Room' }
 ]
 }
 },
 methods: {
 handleUpdate() {
 alert('Zoom settings updated successfully!');
 }
 }
}
</script>

<style scoped>
.glass-card { border-radius: 2rem; }
</style>
