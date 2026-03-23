<template>
 <div class="py-32 px-6 bg-white min-h-[80vh]">
 <div class="max-w-7xl mx-auto space-y-20">
 
 <!-- Page Header -->
 <div class="text-left space-y-6 animate-slide-up">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em]">Collaboration Space</h2>
 <h1 class="text-7xl font-black text-blue-950 tracking-tighter uppercase">Discussion Forum</h1>
 <p class="text-blue-700 font-medium max-w-2xl text-lg">Connect with global scholars, share technical payloads, and solve architectural challenges in real-time.</p>
 </div>

 <!-- Forum Grid -->
 <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
 <div v-for="i in 3" :key="i" class="p-10 rounded-[50px] bg-blue-50 border border-blue-100 space-y-8 group hover:border-indigo-200 transition-all">
 <div class="w-14 h-11 rounded-2xl bg-white shadow-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
 <feather type="message-square" size="24"></feather>
 </div>
 <div class="space-y-4 text-left">
 <h3 class="text-2xl font-black text-blue-950 uppercase">General Architecture #0{{i}}</h3>
 <p class="text-blue-500 text-xs font-bold leading-relaxed uppercase tracking-widest">Active threads discussing the latest Spring 2026 deployment patterns and distributed caching strategies.</p>
 </div>
 <button class="w-fit px-8 mx-auto sm:mx-0 py-3 rounded-2xl bg-white border border-blue-200 text-blue-950 text-[10px] font-black uppercase tracking-widest hover:bg-blue-950 hover:text-white transition-all">Enter Discussion</button>
 </div>
 </div>

 <!-- Unauthorized / Redirect Notice (Should not be visible due to guard) -->
 <div v-if="!isAuthorized" class="p-20 rounded-[60px] bg-amber-50 border-2 border-dashed border-amber-200 text-center space-y-6">
 <feather type="lock" size="48" class="text-amber-600 mx-auto"></feather>
 <h4 class="text-2xl font-black text-amber-900 uppercase">Access Restricted</h4>
 <p class="text-sm font-bold text-amber-700 uppercase tracking-widest">Redirecting to Scholar Authorization Terminal...</p>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons/dist/feather';

export default {
 name: 'DiscussionForum',
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
 isAuthorized: !!localStorage.getItem('token')
 }
 }
}
</script>
