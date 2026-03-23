<template>
 <div class="py-32 px-6 pointer-events-auto min-h-[80vh]">
 <div class="max-w-4xl mx-auto space-y-24">
 
 <!-- Page Header -->
 <div class="space-y-6 text-left animate-slide-up">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em]">The Institution</h2>
 <h1 class="text-7xl font-black text-blue-950 tracking-tighter uppercase relative inline-block">
 About Us
 <div class="absolute -bottom-4 left-0 w-32 h-2 bg-indigo-600 rounded-full"></div>
 </h1>
 </div>

 <!-- Sections Grid -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
 <div class="p-12 rounded-[50px] bg-blue-50 border border-blue-100 space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
 <div class="w-14 h-11 rounded-2xl bg-white shadow-lg flex items-center justify-center text-indigo-600">
 <feather type="shield" size="24"></feather>
 </div>
 <div class="space-y-4">
 <h3 class="text-3xl font-black text-blue-950 uppercase">Our Vision</h3>
 <p class="text-blue-700 font-medium leading-relaxed">
 To democratize elite-level technical education through disruptive digital architecture and high-fidelity mentorship, creating a global ecosystem of industry-ready engineering talent.
 </p>
 </div>
 </div>

 <div class="p-12 rounded-[50px] bg-blue-50 border border-blue-100 space-y-8 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
 <div class="w-14 h-11 rounded-2xl bg-white shadow-lg flex items-center justify-center text-violet-600">
 <feather type="target" size="24"></feather>
 </div>
 <div class="space-y-4">
 <h3 class="text-3xl font-black text-blue-950 uppercase">Our Mission</h3>
 <p class="text-blue-700 font-medium leading-relaxed">
 Deliver enterprise-grade curriculum through low-latency interactive streaming, native-expert linguistics, and AI-enhanced behavior analytics to maximize individual academic potential.
 </p>
 </div>
 </div>

 <div class="md:col-span-2 p-12 rounded-[60px] bg-indigo-600 text-white space-y-10 relative overflow-hidden shadow-2xl shadow-indigo-600/20 animate-in fade-in zoom-in duration-700 delay-500">
 <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
 <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
 <div class="space-y-6">
 <h3 class="text-5xl font-black uppercase tracking-tighter">Academic Excellence <br/> Since 2020</h3>
 <p class="text-indigo-100 font-medium max-w-xl text-lg">
 Jspark.ai started as a small digital laboratory and has evolved into a global LMS leader, serving thousands of students across multiple tech hubs and linguistic zones.
 </p>
 </div>
 <div class="flex items-center gap-10">
 <div class="text-center">
 <p class="text-5xl font-black">140+</p>
 <p class="text-[10px] uppercase font-black tracking-widest opacity-60">Global Hubs</p>
 </div>
 <div class="text-center border-l border-white/20 pl-10">
 <p class="text-5xl font-black">99.9%</p>
 <p class="text-[10px] uppercase font-black tracking-widest opacity-60">Success Rate</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons/dist/feather';

export default {
 name: 'AboutUs',
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
 }
}
</script>
